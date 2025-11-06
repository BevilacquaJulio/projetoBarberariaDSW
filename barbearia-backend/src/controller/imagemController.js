import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { inserirImagem, listarImagens as listarImagensRepo, atualizarImagemByFilename, atualizarImagemById, registrarImagensExistentes } from '../repository/imagemRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ImagemController {
    // Endpoint para listar todas as imagens
    async listarImagens(req, res) {
        try {
            const rows = await listarImagensRepo();
            res.json({ imagens: rows });
        } catch (error) {
            console.error('Erro ao listar imagens:', error);
            res.status(500).json({ message: 'Erro ao listar imagens' });
        }
    }

    // Endpoint para carregar uma imagem
    async getImagem(req, res) {
        try {
            const { filename } = req.params;
            const imagePath = path.join(__dirname, '..', 'uploads', filename);

            if (!fs.existsSync(imagePath)) {
                console.error(`Imagem não encontrada: ${imagePath}`);
                return res.status(404).json({ message: 'Imagem não encontrada' });
            }

            // Determina o Content-Type baseado na extensão
            const ext = path.extname(filename).toLowerCase();
            const contentTypeMap = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.webp': 'image/webp'
            };
            const contentType = contentTypeMap[ext] || 'image/png';

            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 ano
            
            // Usa path absoluto para sendFile
            const absolutePath = path.resolve(imagePath);
            res.sendFile(absolutePath);
        } catch (error) {
            console.error('Erro ao carregar imagem:', error);
            res.status(500).json({ message: 'Erro ao carregar imagem' });
        }
    }

    // Endpoint para fazer upload de uma imagem
    async uploadImagem(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
            }

            const filename = req.file.filename;

            // opcional: metadados enviados no form
            const titulo = req.body.titulo || null;
            const descricao = req.body.descricao || null;
            const preco = req.body.preco ? parseFloat(req.body.preco) : null;
            const servicoId = req.body.servicoId ? Number(req.body.servicoId) : null;

            try {
                await inserirImagem({ filename, servico_id: servicoId, titulo, descricao, preco });
            } catch (err) {
                console.error('Erro ao inserir metadados da imagem:', err);
                // não falha o upload se a inserção de metadados falhar; apenas loga
            }

            res.status(201).json({ 
                message: 'Imagem enviada com sucesso',
                filename: filename,
                url: `/api/imagens/${filename}`
            });
        } catch (error) {
            console.error('Erro no upload da imagem:', error);
            res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
        }
    }

    // Endpoint para atualizar metadados da imagem (admin)
    async atualizarImagem(req, res) {
        const user = req.user;
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { id } = req.params;
        const imageId = Number(id);
        if (!imageId || Number.isNaN(imageId)) {
            return res.status(400).json({ error: 'ID da imagem inválido' });
        }

        const { titulo, descricao, preco, servicoId } = req.body;
        const dados = {};
        if (titulo !== undefined) dados.titulo = titulo;
        if (descricao !== undefined) dados.descricao = descricao;
        if (preco !== undefined && preco !== '') dados.preco = preco;
        if (servicoId !== undefined && servicoId !== '') dados.servico_id = servicoId;

        try {
            const affected = await atualizarImagemById(imageId, dados);
            if (affected > 0) {
                return res.json({ ok: true, updated: affected });
            }
            return res.status(404).json({ error: 'Imagem não encontrada' });
        } catch (err) {
            console.error('Erro ao atualizar imagem:', err);
            return res.status(500).json({ error: 'Erro interno' });
        }
    }

    // Endpoint para registrar imagens já existentes na pasta uploads/ (admin)
    async registrarImagensExistentes(req, res) {
        const user = req.user;
        if (!user || (user.role !== 'admin' && user.role !== 'administrador')) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        try {
            const { imagens } = req.body;
            
            if (!Array.isArray(imagens) || imagens.length === 0) {
                return res.status(400).json({ error: 'Array de imagens é obrigatório' });
            }

            // Valida cada imagem
            for (const img of imagens) {
                if (!img.filename) {
                    return res.status(400).json({ error: 'Campo filename é obrigatório para cada imagem' });
                }
                
                // Verifica se o arquivo existe na pasta uploads/
                const imagePath = path.join(__dirname, '..', 'uploads', img.filename);
                if (!fs.existsSync(imagePath)) {
                    return res.status(400).json({ 
                        error: `Imagem ${img.filename} não encontrada na pasta uploads/` 
                    });
                }
            }

            const results = await registrarImagensExistentes(imagens);
            
            const sucessos = results.filter(r => r.success).length;
            const falhas = results.filter(r => !r.success).length;

            res.json({
                message: `Processamento concluído: ${sucessos} sucesso(s), ${falhas} falha(s)`,
                total: imagens.length,
                sucessos,
                falhas,
                resultados: results
            });
        } catch (error) {
            console.error('Erro ao registrar imagens existentes:', error);
            res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
        }
    }

    // Endpoint para listar arquivos da pasta uploads/ (admin)
    async listarArquivosUploads(req, res) {
        const user = req.user;
        if (!user || (user.role !== 'admin' && user.role !== 'administrador')) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        try {
            const uploadsDir = path.join(__dirname, '..', 'uploads');
            const arquivos = fs.readdirSync(uploadsDir)
                .filter(file => {
                    const filePath = path.join(uploadsDir, file);
                    return fs.statSync(filePath).isFile() && 
                           /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
                })
                .map(file => ({
                    filename: file,
                    path: path.join(uploadsDir, file),
                    size: fs.statSync(path.join(uploadsDir, file)).size
                }));

            res.json({ arquivos, total: arquivos.length });
        } catch (error) {
            console.error('Erro ao listar arquivos:', error);
            res.status(500).json({ error: 'Erro ao listar arquivos' });
        }
    }
}

export default new ImagemController();
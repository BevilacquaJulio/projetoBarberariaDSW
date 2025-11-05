import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { inserirImagem, listarImagens as listarImagensRepo, atualizarImagemByFilename, atualizarImagemById } from '../repository/imagemRepository.js';

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
                return res.status(404).json({ message: 'Imagem não encontrada' });
            }

            res.setHeader('Content-Type', 'image/*');
            res.sendFile(imagePath);
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
}

export default new ImagemController();
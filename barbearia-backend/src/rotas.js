import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import usuarioController from './controller/usuarioController.js';
import servicoController from './controller/servicoController.js';
import agendamentoController from './controller/agendamentoController.js';
import barbeiroController from './controller/barbeiroController.js';
import imagemController from './controller/imagemController.js';
import { getAuthentication } from './utils/jwt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export function adicionarRotas(api) {
    api.use(usuarioController);
    api.use(servicoController);
    api.use(agendamentoController);
    api.use(barbeiroController);

    api.get('/api/imagens', imagemController.listarImagens);
    api.post('/api/imagens/upload', upload.single('imagem'), imagemController.uploadImagem);
    api.get('/api/imagens/:filename', imagemController.getImagem);
    const autenticadorAdmin = getAuthentication((u) => u.role === 'admin' || u.role === 'administrador');
    api.patch('/api/imagens/:id', autenticadorAdmin, imagemController.atualizarImagem);
    api.post('/api/imagens/registrar-existentes', autenticadorAdmin, imagemController.registrarImagensExistentes);
    api.get('/api/imagens/arquivos-uploads', autenticadorAdmin, imagemController.listarArquivosUploads);
}

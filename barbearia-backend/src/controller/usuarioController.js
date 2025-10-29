import { Router } from "express"
import * as repo from '../repository/usuarioRepository.js'
import { generateToken, getAuthentication } from '../utils/jwt.js'

const endpoints = Router()
const autenticador = getAuthentication()

endpoints.post('/usuario', async (req, resp) => {
  try {
    let novoCliente = req.body
    
    if (!novoCliente.nome || !novoCliente.telefone) {
      return resp.status(400).send({ 
        erro: 'Campos obrigatórios: nome, telefone' 
      })
    }

    const telefoneExiste = await repo.verificarTelefoneExistente(novoCliente.telefone)
    if (telefoneExiste) {
      return resp.status(400).send({ 
        erro: 'Telefone já cadastrado' 
      })
    }
    
    let id = await repo.criarConta(novoCliente)
    
    resp.status(201).send({ 
      mensagem: 'Cliente criado com sucesso',
      novoId: id 
    })
    
  } catch (error) {
    console.error('Erro:', error)
    resp.status(500).send({ 
      erro: 'Erro interno do servidor', 
      detalhes: error.message 
    })
  }
})

endpoints.post('/usuario/login', async (req, resp) => {
  try {
    let { email, senha } = req.body

    if (!email || !senha) {
      return resp.status(400).send({ 
        erro: 'Email e senha são obrigatórios' 
      })
    }

    let credenciais = await repo.validarCredenciais(email, senha)
    
    if (!credenciais) {
      return resp.status(401).send({ 
        erro: 'Credenciais inválidas' 
      })
    }
    
    let token = generateToken(credenciais)
    
    resp.send({
      token: token,
      usuario: {
        id: credenciais.id,
        nome: credenciais.nome,
        email: credenciais.email,
        role: credenciais.role
      }
    })
    
  } catch (error) {
    console.error('Erro:', error)
    resp.status(500).send({ 
      erro: 'Erro interno do servidor' 
    })
  }
})

endpoints.get('/usuario/perfil', autenticador, async (req, resp) => {
  try {
    let usuarioId = req.user.id
    let usuario = await repo.buscarUsuarioPorId(usuarioId)
    
    if (!usuario) {
      return resp.status(404).send({ 
        erro: 'Usuário não encontrado' 
      })
    }
    
    resp.send(usuario)
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao buscar perfil' 
    })
  }
})

endpoints.get('/usuarios', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }
    
    let usuarios = await repo.listarUsuarios()
    resp.send({ usuarios })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar usuários' 
    })
  }
})

export default endpoints


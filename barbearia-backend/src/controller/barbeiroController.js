import { Router } from "express"
import { getAuthentication } from '../utils/jwt.js'
import * as repo from "../repository/barbeiroRepository.js"

const endpoints = Router()
const autenticador = getAuthentication()

endpoints.post('/barbeiro', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem cadastrar barbeiros' 
      })
    }

    let barbeiro = req.body
    
    if (!barbeiro.nome) {
      return resp.status(400).send({ 
        erro: 'Campo obrigatório: nome' 
      })
    }

    let id = await repo.inserirBarbeiro(barbeiro)

    resp.status(201).send({
      mensagem: 'Barbeiro cadastrado com sucesso',
      id: id
    })
    
  } catch (error) {
    console.error('Erro:', error)
    resp.status(500).send({ 
      erro: 'Erro interno do servidor', 
      detalhes: error.message 
    })
  }
})

endpoints.get('/barbeiros', async (req, resp) => {
  try {
    let barbeiros = await repo.listarBarbeiros()

    resp.send({
      barbeiros: barbeiros
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar barbeiros' 
    })
  }
})

endpoints.get('/barbeiros/todos', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    let barbeiros = await repo.listarTodosBarbeiros()
    resp.send({ barbeiros })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar barbeiros' 
    })
  }
})

endpoints.get('/barbeiro/:id', async (req, resp) => {
  try {
    let id = req.params.id
    let barbeiro = await repo.buscarBarbeiro(id)

    if (!barbeiro) {
      return resp.status(404).send({ 
        erro: "Barbeiro não encontrado" 
      })
    }

    resp.send(barbeiro)
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao buscar barbeiro' 
    })
  }
})

endpoints.put('/barbeiro/:id', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem alterar barbeiros' 
      })
    }

    let barbeiro = req.body
    let id = Number(req.params.id)

    if (!barbeiro.nome) {
      return resp.status(400).send({ 
        erro: 'Campo obrigatório: nome' 
      })
    }

    const linhasAfetadas = await repo.alterarBarbeiro(id, barbeiro)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({ 
        erro: "Barbeiro não encontrado" 
      })
    }

    resp.send({
      mensagem: 'Barbeiro atualizado com sucesso',
      idAlterado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao atualizar barbeiro' 
    })
  }
})

endpoints.delete('/barbeiro/:id', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem deletar barbeiros' 
      })
    }

    let id = req.params.id
    let linhasAfetadas = await repo.deletarBarbeiro(id)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({
        erro: "Barbeiro não encontrado"
      })
    }

    resp.send({
      mensagem: 'Barbeiro deletado com sucesso',
      barbeiroIdDeletado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao deletar barbeiro' 
    })
  }
})

export default endpoints


import { Router } from "express"
import { getAuthentication } from '../utils/jwt.js'
import * as repo from "../repository/servicoRepository.js"

const endpoints = Router()
const autenticador = getAuthentication()

endpoints.post('/servico', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem cadastrar serviços' 
      })
    }

    let servico = req.body
    
    if (!servico.nome || !servico.preco || !servico.duracao) {
      return resp.status(400).send({ 
        erro: 'Campos obrigatórios: nome, preco, duracao' 
      })
    }

    let id = await repo.inserirServico(servico)

    resp.status(201).send({
      mensagem: 'Serviço cadastrado com sucesso',
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

endpoints.get('/servicos', async (req, resp) => {
  try {
    // Usa lista com imagem principal se disponível
    let servicos = await repo.listarServicosComImagem()

    resp.send({ servicos })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar serviços' 
    })
  }
})

endpoints.get('/servicos/todos', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    let servicos = await repo.listarTodosServicos()
    resp.send({ servicos })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar serviços' 
    })
  }
})

endpoints.get('/servico/:id', async (req, resp) => {
  try {
    let id = req.params.id
    let servico = await repo.buscarServico(id)

    if (!servico) {
      return resp.status(404).send({ 
        erro: "Serviço não encontrado" 
      })
    }

    resp.send(servico)
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao buscar serviço' 
    })
  }
})

endpoints.put('/servico/:id', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem alterar serviços' 
      })
    }

    let servico = req.body
    let id = Number(req.params.id)

    if (!servico.nome || !servico.preco || !servico.duracao) {
      return resp.status(400).send({ 
        erro: 'Campos obrigatórios: nome, preco, duracao' 
      })
    }

    const linhasAfetadas = await repo.alterarServico(id, servico)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({ 
        erro: "Serviço não encontrado" 
      })
    }

    resp.send({
      mensagem: 'Serviço atualizado com sucesso',
      idAlterado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao atualizar serviço' 
    })
  }
})

endpoints.delete('/servico/:id', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Apenas administradores podem deletar serviços' 
      })
    }

    let id = req.params.id
    let linhasAfetadas = await repo.deletarServico(id)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({
        erro: "Serviço não encontrado"
      })
    }

    resp.send({
      mensagem: 'Serviço deletado com sucesso',
      servicoIdDeletado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao deletar serviço' 
    })
  }
})

export default endpoints


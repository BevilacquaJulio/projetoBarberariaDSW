import { Router } from "express"
import { getAuthentication } from '../utils/jwt.js'
import * as repo from "../repository/agendamentoRepository.js"
import * as barbeiroRepo from "../repository/barbeiroRepository.js"
import * as servicoRepo from "../repository/servicoRepository.js"

const endpoints = Router()
const autenticador = getAuthentication()

endpoints.post('/agendamento', autenticador, async (req, resp) => {
  try {
    let agendamento = req.body
    let usuarioId = req.user.id
    
    if (!agendamento.barbeiro_id || !agendamento.servico_id || !agendamento.data_hora) {
      return resp.status(400).send({ 
        erro: 'Campos obrigatórios: barbeiro_id, servico_id, data_hora' 
      })
    }

    const barbeiro = await barbeiroRepo.buscarBarbeiro(agendamento.barbeiro_id)
    if (!barbeiro || !barbeiro.ativo) {
      return resp.status(400).send({ 
        erro: 'Barbeiro não encontrado ou inativo' 
      })
    }

    const servico = await servicoRepo.buscarServico(agendamento.servico_id)
    if (!servico || !servico.ativo) {
      return resp.status(400).send({ 
        erro: 'Serviço não encontrado ou inativo' 
      })
    }

    const disponivel = await repo.verificarDisponibilidadeBarbeiro(
      agendamento.barbeiro_id,
      agendamento.data_hora,
      agendamento.servico_id
    )

    if (!disponivel) {
      return resp.status(400).send({ 
        erro: 'Barbeiro não está disponível neste horário' 
      })
    }

    agendamento.usuario_id = usuarioId

    let id = await repo.inserirAgendamento(agendamento)

    resp.status(201).send({
      mensagem: 'Agendamento criado com sucesso',
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

endpoints.get('/agendamentos', autenticador, async (req, resp) => {
  try {
    let usuarioId = req.user.id
    let agendamentos = await repo.listarAgendamentosPorUsuario(usuarioId)

    resp.send({
      agendamentos: agendamentos
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar agendamentos' 
    })
  }
})

endpoints.get('/agendamentos/todos', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    let agendamentos = await repo.listarTodosAgendamentos()
    resp.send({ agendamentos })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar agendamentos' 
    })
  }
})

endpoints.get('/agendamentos/data/:data', autenticador, async (req, resp) => {
  try {
    if (req.user.role !== 'admin') {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    let data = req.params.data
    let agendamentos = await repo.listarAgendamentosPorData(data)
    
    resp.send({ 
      data: data,
      agendamentos 
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao listar agendamentos' 
    })
  }
})

endpoints.get('/agendamento/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id
    let agendamento = await repo.buscarAgendamento(id)

    if (!agendamento) {
      return resp.status(404).send({ 
        erro: "Agendamento não encontrado" 
      })
    }

    if (req.user.role !== 'admin' && agendamento.usuario_id !== req.user.id) {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    resp.send(agendamento)
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao buscar agendamento' 
    })
  }
})

endpoints.put('/agendamento/:id/status', autenticador, async (req, resp) => {
  try {
    let id = Number(req.params.id)
    let { status } = req.body

    if (!status) {
      return resp.status(400).send({ 
        erro: 'Campo obrigatório: status' 
      })
    }

    const statusValidos = ['agendado', 'em_andamento', 'concluido', 'cancelado']
    if (!statusValidos.includes(status)) {
      return resp.status(400).send({ 
        erro: 'Status inválido' 
      })
    }

    const agendamento = await repo.buscarAgendamento(id)
    if (!agendamento) {
      return resp.status(404).send({ 
        erro: 'Agendamento não encontrado' 
      })
    }

    if (req.user.role !== 'admin' && agendamento.usuario_id !== req.user.id) {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    const linhasAfetadas = await repo.alterarStatusAgendamento(id, status)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({ 
        erro: "Agendamento não encontrado" 
      })
    }

    resp.send({
      mensagem: 'Status atualizado com sucesso',
      idAlterado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao atualizar status' 
    })
  }
})

endpoints.delete('/agendamento/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id

    const agendamento = await repo.buscarAgendamento(id)
    if (!agendamento) {
      return resp.status(404).send({ 
        erro: 'Agendamento não encontrado' 
      })
    }

    if (req.user.role !== 'admin' && agendamento.usuario_id !== req.user.id) {
      return resp.status(403).send({ 
        erro: 'Acesso negado' 
      })
    }

    let linhasAfetadas = await repo.deletarAgendamento(id)
    
    if (linhasAfetadas === 0) {
      return resp.status(404).send({
        erro: "Agendamento não encontrado"
      })
    }

    resp.send({
      mensagem: 'Agendamento deletado com sucesso',
      agendamentoIdDeletado: id
    })
    
  } catch (error) {
    resp.status(500).send({ 
      erro: 'Erro ao deletar agendamento' 
    })
  }
})

export default endpoints


import { connection } from './connection.js'

export async function inserirAgendamento(agendamento) {
  const dataHora = agendamento.data_hora || `${agendamento.data_agendamento} ${agendamento.hora_agendamento}`
  const [data, hora] = dataHora.split(' ')
  
  const comando = `
    INSERT INTO agendamentos (cliente_id, servico_id, data_agendamento, hora_agendamento, status, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    agendamento.cliente_id || agendamento.usuario_id,
    agendamento.servico_id,
    data,
    hora,
    agendamento.status || 'agendado',
    agendamento.observacoes || null
  ])
  return info.insertId
}

export async function listarAgendamentosPorUsuario(clienteId) {
  const comando = `
    SELECT 
      a.id,
      CONCAT(a.data_agendamento, ' ', a.hora_agendamento) as data_hora,
      a.data_agendamento,
      a.hora_agendamento,
      a.status,
      a.observacoes,
      a.created_at as criado_em,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao_minutos as servico_duracao
    FROM agendamentos a
    JOIN servicos s ON a.servico_id = s.id
    WHERE a.cliente_id = ?
    ORDER BY a.data_agendamento DESC, a.hora_agendamento DESC
  `
  const [registros] = await connection.query(comando, [clienteId])
  return registros
}

export async function listarTodosAgendamentos() {
  const comando = `
    SELECT 
      a.id,
      CONCAT(a.data_agendamento, ' ', a.hora_agendamento) as data_hora,
      a.data_agendamento,
      a.hora_agendamento,
      a.status,
      a.observacoes,
      a.created_at as criado_em,
      c.nome as usuario_nome,
      c.telefone as usuario_telefone,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao_minutos as servico_duracao
    FROM agendamentos a
    JOIN clientes c ON a.cliente_id = c.id
    JOIN servicos s ON a.servico_id = s.id
    ORDER BY a.data_agendamento DESC, a.hora_agendamento DESC
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarAgendamento(id) {
  const comando = `
    SELECT 
      a.*,
      CONCAT(a.data_agendamento, ' ', a.hora_agendamento) as data_hora,
      c.nome as usuario_nome,
      c.telefone as usuario_telefone,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao_minutos as servico_duracao
    FROM agendamentos a
    JOIN clientes c ON a.cliente_id = c.id
    JOIN servicos s ON a.servico_id = s.id
    WHERE a.id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function alterarStatusAgendamento(id, status) {
  const comando = `
    UPDATE agendamentos 
       SET status = ?
     WHERE id = ?
  `
  const [registros] = await connection.query(comando, [status, id])
  return registros.affectedRows
}

export async function deletarAgendamento(id) {
  const comando = `
    DELETE FROM agendamentos WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro.affectedRows
}

export async function verificarProprietarioAgendamento(id, clienteId) {
  const comando = `
    SELECT COUNT(*) as total FROM agendamentos 
     WHERE id = ? AND cliente_id = ?
  `
  const [registro] = await connection.query(comando, [id, clienteId])
  return registro[0].total > 0
}

export async function verificarDisponibilidadeHorario(dataAgendamento, horaAgendamento, servicoId, agendamentoId = null) {
  let comando = `
    SELECT COUNT(*) as total 
      FROM agendamentos a
      JOIN servicos s ON a.servico_id = s.id
     WHERE a.data_agendamento = ?
       AND a.status IN ('agendado', 'confirmado', 'em_andamento')
       AND (
         (TIME(a.hora_agendamento) <= TIME(?) AND 
          ADDTIME(a.hora_agendamento, SEC_TO_TIME(s.duracao_minutos * 60)) > TIME(?)) OR
         (TIME(a.hora_agendamento) < ADDTIME(?, SEC_TO_TIME((SELECT duracao_minutos FROM servicos WHERE id = ?) * 60)) AND 
          TIME(a.hora_agendamento) >= TIME(?))
       )
  `
  
  let params = [dataAgendamento, horaAgendamento, horaAgendamento, horaAgendamento, servicoId, horaAgendamento]
  
  if (agendamentoId) {
    comando += ` AND a.id != ?`
    params.push(agendamentoId)
  }
  
  const [registro] = await connection.query(comando, params)
  return registro[0].total === 0
}

export async function listarAgendamentosPorData(data) {
  const comando = `
    SELECT 
      a.id,
      CONCAT(a.data_agendamento, ' ', a.hora_agendamento) as data_hora,
      a.data_agendamento,
      a.hora_agendamento,
      a.status,
      c.nome as usuario_nome,
      s.nome as servico_nome,
      s.duracao_minutos as servico_duracao
    FROM agendamentos a
    JOIN clientes c ON a.cliente_id = c.id
    JOIN servicos s ON a.servico_id = s.id
    WHERE a.data_agendamento = ?
    ORDER BY a.hora_agendamento
  `
  const [registros] = await connection.query(comando, [data])
  return registros
}


import { connection } from './connection.js'

export async function inserirAgendamento(agendamento) {
  const comando = `
    INSERT INTO agendamentos (usuario_id, barbeiro_id, servico_id, data_hora, status, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    agendamento.usuario_id,
    agendamento.barbeiro_id,
    agendamento.servico_id,
    agendamento.data_hora,
    agendamento.status || 'agendado',
    agendamento.observacoes || null
  ])
  return info.insertId
}

export async function listarAgendamentosPorUsuario(usuarioId) {
  const comando = `
    SELECT 
      a.id,
      a.data_hora,
      a.status,
      a.observacoes,
      a.criado_em,
      b.nome as barbeiro_nome,
      b.foto_url as barbeiro_foto,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao as servico_duracao
    FROM agendamentos a
    JOIN barbeiro b ON a.barbeiro_id = b.id
    JOIN servico s ON a.servico_id = s.id
    WHERE a.usuario_id = ?
    ORDER BY a.data_hora DESC
  `
  const [registros] = await connection.query(comando, [usuarioId])
  return registros
}

export async function listarTodosAgendamentos() {
  const comando = `
    SELECT 
      a.id,
      a.data_hora,
      a.status,
      a.observacoes,
      a.criado_em,
      u.nome as usuario_nome,
      u.telefone as usuario_telefone,
      b.nome as barbeiro_nome,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao as servico_duracao
    FROM agendamentos a
    JOIN usuario u ON a.usuario_id = u.id
    JOIN barbeiro b ON a.barbeiro_id = b.id
    JOIN servico s ON a.servico_id = s.id
    ORDER BY a.data_hora DESC
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarAgendamento(id) {
  const comando = `
    SELECT 
      a.*,
      u.nome as usuario_nome,
      u.telefone as usuario_telefone,
      b.nome as barbeiro_nome,
      s.nome as servico_nome,
      s.preco as servico_preco,
      s.duracao as servico_duracao
    FROM agendamentos a
    JOIN usuario u ON a.usuario_id = u.id
    JOIN barbeiro b ON a.barbeiro_id = b.id
    JOIN servico s ON a.servico_id = s.id
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

export async function verificarProprietarioAgendamento(id, usuarioId) {
  const comando = `
    SELECT COUNT(*) as total FROM agendamentos 
     WHERE id = ? AND usuario_id = ?
  `
  const [registro] = await connection.query(comando, [id, usuarioId])
  return registro[0].total > 0
}

export async function verificarDisponibilidadeBarbeiro(barbeiroId, dataHora, servicoId, agendamentoId = null) {
  let comando = `
    SELECT COUNT(*) as total 
      FROM agendamentos a
      JOIN servico s ON a.servico_id = s.id
     WHERE a.barbeiro_id = ? 
       AND a.status IN ('agendado', 'em_andamento')
       AND (
         (a.data_hora <= ? AND DATE_ADD(a.data_hora, INTERVAL s.duracao MINUTE) > ?) OR
         (a.data_hora < DATE_ADD(?, INTERVAL (SELECT duracao FROM servico WHERE id = ?) MINUTE) AND a.data_hora >= ?)
       )
  `
  
  let params = [barbeiroId, dataHora, dataHora, dataHora, servicoId, dataHora]
  
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
      a.data_hora,
      a.status,
      u.nome as usuario_nome,
      b.nome as barbeiro_nome,
      s.nome as servico_nome,
      s.duracao as servico_duracao
    FROM agendamentos a
    JOIN usuario u ON a.usuario_id = u.id
    JOIN barbeiro b ON a.barbeiro_id = b.id
    JOIN servico s ON a.servico_id = s.id
    WHERE DATE(a.data_hora) = ?
    ORDER BY a.data_hora
  `
  const [registros] = await connection.query(comando, [data])
  return registros
}


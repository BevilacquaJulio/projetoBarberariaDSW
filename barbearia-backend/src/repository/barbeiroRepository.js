import { connection } from './connection.js'

export async function inserirBarbeiro(barbeiro) {
  const comando = `
    INSERT INTO barbeiro (nome, especialidade, foto_url, ativo)
    VALUES (?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    barbeiro.nome,
    barbeiro.especialidade || null,
    barbeiro.foto_url || null,
    barbeiro.ativo !== undefined ? barbeiro.ativo : true
  ])
  return info.insertId
}

export async function listarBarbeiros() {
  const comando = `
    SELECT * FROM barbeiro
     WHERE ativo = TRUE
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function listarTodosBarbeiros() {
  const comando = `
    SELECT * FROM barbeiro
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarBarbeiro(id) {
  const comando = `
    SELECT * FROM barbeiro
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function alterarBarbeiro(id, barbeiro) {
  const comando = `
    UPDATE barbeiro 
       SET nome = ?, 
           especialidade = ?,
           foto_url = ?,
           ativo = ?
     WHERE id = ?
  `
  const [registros] = await connection.query(comando, [
    barbeiro.nome,
    barbeiro.especialidade,
    barbeiro.foto_url,
    barbeiro.ativo,
    id
  ])
  return registros.affectedRows
}

export async function deletarBarbeiro(id) {
  const comando = `
    DELETE FROM barbeiro WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro.affectedRows
}

export async function verificarDisponibilidadeBarbeiro(barbeiroId, dataHora, duracao) {
  const comando = `
    SELECT COUNT(*) as total 
      FROM agendamento 
     WHERE barbeiro_id = ? 
       AND status IN ('agendado', 'em_andamento')
       AND (
         (data_hora <= ? AND DATE_ADD(data_hora, INTERVAL (SELECT duracao FROM servico WHERE id = servico_id) MINUTE) > ?) OR
         (data_hora < DATE_ADD(?, INTERVAL ? MINUTE) AND data_hora >= ?)
       )
  `
  const [registro] = await connection.query(comando, [
    barbeiroId,
    dataHora,
    dataHora,
    dataHora,
    duracao,
    dataHora
  ])
  return registro[0].total === 0
}


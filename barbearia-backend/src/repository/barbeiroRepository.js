import { connection } from './connection.js'

export async function inserirBarbeiro(barbeiro) {
  const comando = `
    INSERT INTO barbeiros (nome, especialidade, foto_url, telefone, email, ativo)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    barbeiro.nome,
    barbeiro.especialidade || null,
    barbeiro.foto_url || null,
    barbeiro.telefone || null,
    barbeiro.email || null,
    barbeiro.ativo !== undefined ? barbeiro.ativo : true
  ])
  return info.insertId
}

export async function listarBarbeiros() {
  const comando = `
    SELECT id, nome, especialidade, foto_url, telefone, email, ativo
      FROM barbeiros
     WHERE ativo = TRUE
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function listarTodosBarbeiros() {
  const comando = `
    SELECT id, nome, especialidade, foto_url, telefone, email, ativo
      FROM barbeiros
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarBarbeiro(id) {
  const comando = `
    SELECT id, nome, especialidade, foto_url, telefone, email, ativo
      FROM barbeiros
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function alterarBarbeiro(id, barbeiro) {
  const comando = `
    UPDATE barbeiros 
       SET nome = ?, 
           especialidade = ?,
           foto_url = ?,
           telefone = ?,
           email = ?,
           ativo = ?
     WHERE id = ?
  `
  const [registros] = await connection.query(comando, [
    barbeiro.nome,
    barbeiro.especialidade || null,
    barbeiro.foto_url || null,
    barbeiro.telefone || null,
    barbeiro.email || null,
    barbeiro.ativo !== undefined ? barbeiro.ativo : true,
    id
  ])
  return registros.affectedRows
}

export async function deletarBarbeiro(id) {
  const comando = `
    DELETE FROM barbeiros WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro.affectedRows
}


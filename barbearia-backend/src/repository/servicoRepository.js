import { connection } from './connection.js'

export async function inserirServico(servico) {
  const comando = `
    INSERT INTO servico (nome, descricao, preco, duracao, ativo)
    VALUES (?, ?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    servico.nome,
    servico.descricao || null,
    servico.preco,
    servico.duracao,
    servico.ativo !== undefined ? servico.ativo : true
  ])
  return info.insertId
}

export async function listarServicos() {
  const comando = `
    SELECT * FROM servico
     WHERE ativo = TRUE
     ORDER BY preco
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function listarTodosServicos() {
  const comando = `
    SELECT * FROM servico
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarServico(id) {
  const comando = `
    SELECT * FROM servico
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function alterarServico(id, servico) {
  const comando = `
    UPDATE servico 
       SET nome = ?, 
           descricao = ?,
           preco = ?,
           duracao = ?,
           ativo = ?
     WHERE id = ?
  `
  const [registros] = await connection.query(comando, [
    servico.nome,
    servico.descricao,
    servico.preco,
    servico.duracao,
    servico.ativo,
    id
  ])
  return registros.affectedRows
}

export async function deletarServico(id) {
  const comando = `
    DELETE FROM servico WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro.affectedRows
}


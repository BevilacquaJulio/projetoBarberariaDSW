import { connection } from './connection.js'

export async function inserirServico(servico) {
  const comando = `
    INSERT INTO servicos (nome, descricao, preco, duracao_minutos, ativo)
    VALUES (?, ?, ?, ?, ?)
  `
  const [info] = await connection.query(comando, [
    servico.nome,
    servico.descricao || null,
    servico.preco,
    servico.duracao_minutos || servico.duracao,
    servico.ativo !== undefined ? servico.ativo : true
  ])
  return info.insertId
}

export async function listarServicos() {
  const comando = `
    SELECT id, nome, descricao, preco, duracao_minutos as duracao, ativo
      FROM servicos
     WHERE ativo = TRUE
     ORDER BY id
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function listarServicosComImagem() {
  const comando = `
    SELECT s.id, s.nome, s.descricao, s.preco, s.duracao_minutos as duracao, s.ativo,
      (SELECT filename FROM imagens i WHERE i.servico_id = s.id ORDER BY i.criado_em DESC LIMIT 1) as imagem_filename,
      (SELECT titulo FROM imagens i WHERE i.servico_id = s.id ORDER BY i.criado_em DESC LIMIT 1) as imagem_titulo,
      (SELECT descricao FROM imagens i WHERE i.servico_id = s.id ORDER BY i.criado_em DESC LIMIT 1) as imagem_descricao,
      (SELECT preco FROM imagens i WHERE i.servico_id = s.id ORDER BY i.criado_em DESC LIMIT 1) as imagem_preco
      FROM servicos s
     WHERE s.ativo = TRUE
     ORDER BY s.id
  `;
  const [registros] = await connection.query(comando);
  return registros;
}

export async function listarTodosServicos() {
  const comando = `
    SELECT id, nome, descricao, preco, duracao_minutos as duracao, ativo
      FROM servicos
     ORDER BY nome
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function buscarServico(id) {
  const comando = `
    SELECT id, nome, descricao, preco, duracao_minutos as duracao, ativo
      FROM servicos
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function alterarServico(id, servico) {
  const comando = `
    UPDATE servicos 
       SET nome = ?, 
           descricao = ?,
           preco = ?,
           duracao_minutos = ?,
           ativo = ?
     WHERE id = ?
  `
  const [registros] = await connection.query(comando, [
    servico.nome,
    servico.descricao,
    servico.preco,
    servico.duracao_minutos || servico.duracao,
    servico.ativo,
    id
  ])
  return registros.affectedRows
}

export async function deletarServico(id) {
  const comando = `
    DELETE FROM servicos WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro.affectedRows
}


import { connection } from './connection.js';

async function inserirImagem({ filename, servico_id = null, titulo = null, descricao = null, preco = null }) {
  const sql = `INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em) VALUES (?, ?, ?, ?, ?, NOW())`;
  const [result] = await connection.execute(sql, [filename, servico_id, titulo, descricao, preco]);
  return result.insertId;
}

async function listarImagens(servicoId = null) {
  if (servicoId) {
    const sql = `SELECT id, filename, servico_id, titulo, descricao, preco FROM imagens WHERE servico_id = ? ORDER BY criado_em DESC`;
    const [rows] = await connection.execute(sql, [servicoId]);
    return rows;
  }
  const sql = `SELECT id, filename, servico_id, titulo, descricao, preco FROM imagens ORDER BY criado_em DESC`;
  const [rows] = await connection.execute(sql);
  return rows;
}

export { inserirImagem, listarImagens };

// Atualiza metadados da imagem identificada pelo filename
async function atualizarImagemByFilename(filename, { servico_id, titulo, descricao, preco }) {
  const fields = [];
  const params = [];
  if (servico_id !== undefined) { fields.push('servico_id = ?'); params.push(servico_id); }
  if (titulo !== undefined) { fields.push('titulo = ?'); params.push(titulo); }
  if (descricao !== undefined) { fields.push('descricao = ?'); params.push(descricao); }
  if (preco !== undefined) { fields.push('preco = ?'); params.push(preco); }

  if (fields.length === 0) {
    return 0; // nothing to update
  }

  const sql = `UPDATE imagens SET ${fields.join(', ')} WHERE filename = ?`;
  params.push(filename);
  const [result] = await connection.execute(sql, params);
  return result.affectedRows;
}

export { atualizarImagemByFilename };

// Atualiza metadados da imagem identificada pelo id
async function atualizarImagemById(id, { servico_id, titulo, descricao, preco }) {
  const fields = [];
  const params = [];
  if (servico_id !== undefined) { fields.push('servico_id = ?'); params.push(servico_id); }
  if (titulo !== undefined) { fields.push('titulo = ?'); params.push(titulo); }
  if (descricao !== undefined) { fields.push('descricao = ?'); params.push(descricao); }
  if (preco !== undefined) { fields.push('preco = ?'); params.push(preco); }

  if (fields.length === 0) {
    return 0; // nothing to update
  }

  const sql = `UPDATE imagens SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  const [result] = await connection.execute(sql, params);
  return result.affectedRows;
}

export { atualizarImagemById };

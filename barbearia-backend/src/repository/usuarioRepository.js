import { connection } from "./connection.js"

export async function validarCredenciais(email, senha) {
  const comando = `
    SELECT id,
           nome,
           email,
           role
      FROM usuario
     WHERE email = ?
       AND senha = MD5(?)
  `

  const [registros] = await connection.query(comando, [email, senha])
  return registros[0]
}

export async function criarConta(novoUsuario) {
  const comando = `
    INSERT INTO usuario (nome, email, senha, telefone, role)
               VALUES (?, ?, MD5(?), ?, ?)
  `

  const [info] = await connection.query(comando, [
    novoUsuario.nome,
    novoUsuario.email,
    novoUsuario.senha,
    novoUsuario.telefone || null,
    novoUsuario.role || 'cliente'
  ])
  return info.insertId
}

export async function buscarUsuarioPorId(id) {
  const comando = `
    SELECT id, nome, email, telefone, role, criado_em
      FROM usuario
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function listarUsuarios() {
  const comando = `
    SELECT id, nome, email, telefone, role, criado_em
      FROM usuario
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function verificarEmailExistente(email) {
  const comando = `
    SELECT COUNT(*) as total FROM usuario WHERE email = ?
  `
  const [registro] = await connection.query(comando, [email])
  return registro[0].total > 0
}


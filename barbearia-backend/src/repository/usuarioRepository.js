import { connection } from "./connection.js"

export async function validarCredenciais(email, senha) {
  const comando = `
    SELECT id,
           nome,
           email,
           tipo as role
      FROM usuarios
     WHERE email = ?
       AND senha = MD5(?)
  `

  const [registros] = await connection.query(comando, [email, senha])
  return registros[0]
}

export async function criarConta(novoCliente) {
  const comando = `
    INSERT INTO clientes (nome, telefone, email, endereco, data_nascimento)
               VALUES (?, ?, ?, ?, ?)
  `

  const [info] = await connection.query(comando, [
    novoCliente.nome,
    novoCliente.telefone || null,
    novoCliente.email || null,
    novoCliente.endereco || null,
    novoCliente.data_nascimento || null
  ])
  return info.insertId
}

export async function buscarUsuarioPorId(id) {
  const comando = `
    SELECT id, nome, telefone, email, endereco, ativo, created_at
      FROM clientes
     WHERE id = ?
  `
  const [registro] = await connection.query(comando, [id])
  return registro[0]
}

export async function listarUsuarios() {
  const comando = `
    SELECT id, nome, telefone, email, endereco, ativo, created_at
      FROM clientes
  `
  const [registros] = await connection.query(comando)
  return registros
}

export async function verificarEmailExistente(email) {
  const comando = `
    SELECT COUNT(*) as total FROM clientes WHERE email = ?
  `
  const [registro] = await connection.query(comando, [email])
  return registro[0].total > 0
}

export async function verificarTelefoneExistente(telefone) {
  const comando = `
    SELECT COUNT(*) as total FROM clientes WHERE telefone = ?
  `
  const [registro] = await connection.query(comando, [telefone])
  return registro[0].total > 0
}


-- Active: 1757595345521@@localhost@3306@gv_banco
-- ✅ Script de Correção - Admin com MD5
-- Execute este script no MySQL para corrigir o problema de autenticação

USE gv_banco;

-- 1. Remover admin antigo (com senha bcrypt)
DELETE FROM usuarios WHERE email = 'admin@gv.com';

-- 2. Criar admin com senha em MD5
-- Email: admin@gv.com
-- Senha: admin123 (será convertida para MD5 automaticamente)
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Guilherme Vasconcelos', 'admin@gv.com', MD5('admin123'), 'administrador');

-- 3. Verificar se a criação funcionou
SELECT 
  id, 
  nome, 
  email, 
  tipo,
  senha as 'Hash MD5 da Senha',
  CASE 
    WHEN senha = MD5('admin123') THEN '✓ Senha correta!' 
    ELSE '✗ Senha incorreta' 
  END as 'Status'
FROM usuarios 
WHERE email = 'admin@gv.com';

-- 4. Resultado esperado:
-- Hash MD5 da Senha: 0192023a7bbd73250516f069df18b500
-- Status: ✓ Senha correta!

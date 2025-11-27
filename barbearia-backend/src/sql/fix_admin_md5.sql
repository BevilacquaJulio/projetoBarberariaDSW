USE gv_banco;

DELETE FROM usuarios WHERE email = 'admin@gv.com';

INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Guilherme Vasconcelos', 'admin@gv.com', MD5('admin123'), 'administrador');

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

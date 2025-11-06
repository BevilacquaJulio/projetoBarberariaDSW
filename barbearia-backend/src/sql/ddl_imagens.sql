-- Active: 1760110745587@@127.0.0.1@3306@gv_banco
-- DDL para tabela imagens
-- Execute este script no seu banco (gv_banco)
USE gv_banco;
CREATE TABLE IF NOT EXISTS imagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  servico_id INT DEFAULT NULL,
  titulo VARCHAR(255),
  descricao TEXT,
  preco DECIMAL(10,2),
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (filename),
  INDEX (servico_id)
);

ALTER TABLE imagens ADD COLUMN servico_id INT DEFAULT NULL;
CREATE INDEX idx_imagens_servico_id ON imagens(servico_id);
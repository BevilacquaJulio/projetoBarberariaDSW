-- DDL para tabela barbeiros
USE gv_banco;

-- Tabela de barbeiros
CREATE TABLE IF NOT EXISTS barbeiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100),
    foto_url VARCHAR(255),
    telefone VARCHAR(15),
    email VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir alguns barbeiros de exemplo
INSERT INTO barbeiros (nome, especialidade, telefone, email, ativo) VALUES 
('João Silva', 'Cortes Masculinos', '(11) 99999-1111', 'joao@barbearia.com', TRUE),
('Maria Santos', 'Cortes Femininos e Coloração', '(11) 99999-2222', 'maria@barbearia.com', TRUE),
('Pedro Costa', 'Cortes e Barba', '(11) 99999-3333', 'pedro@barbearia.com', TRUE);


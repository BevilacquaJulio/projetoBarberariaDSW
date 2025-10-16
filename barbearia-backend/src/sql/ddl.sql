-- Active: 1760110745587@@127.0.0.1@3306@barbearia_db
CREATE DATABASE IF NOT EXISTS barbearia_db;
USE barbearia_db;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'cliente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE barbeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    especialidade VARCHAR(255),
    foto_url VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    duracao INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    barbeiro_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'agendado',
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_agendamento_usuario 
        FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_agendamento_barbeiro 
        FOREIGN KEY (barbeiro_id) REFERENCES barbeiro(id),
    CONSTRAINT fk_agendamento_servico 
        FOREIGN KEY (servico_id) REFERENCES servico(id)
);

INSERT INTO barbeiro (nome, especialidade, foto_url) VALUES
('Carlos Silva', 'Cortes clássicos e degradê', 'https://i.pravatar.cc/150?img=12'),
('Rafael Santos', 'Barba e bigode', 'https://i.pravatar.cc/150?img=13'),
('Bruno Costa', 'Cortes modernos', 'https://i.pravatar.cc/150?img=14');

INSERT INTO servico (nome, descricao, preco, duracao) VALUES
('Corte de Cabelo', 'Corte masculino tradicional ou moderno', 45.00, 30),
('Barba', 'Aparar e modelar barba', 35.00, 20),
('Corte + Barba', 'Combo completo', 70.00, 50),
('Degradê', 'Corte degradê profissional', 55.00, 40),
('Sobrancelha', 'Design de sobrancelha masculina', 20.00, 15);


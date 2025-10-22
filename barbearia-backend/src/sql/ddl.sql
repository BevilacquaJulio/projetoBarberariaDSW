-- Script SQL para criação do banco de dados Stillus Gama
-- Sistema de gestão de salão de cabeleireira

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS gv_banco;
USE gv_banco;

-- Tabela de usuário administrador (apenas administrador)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador') NOT NULL DEFAULT 'administrador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100),
    endereco VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de serviços oferecidos
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao_minutos INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    observacoes TEXT,
    status ENUM('agendado', 'confirmado', 'em_andamento', 'concluido', 'cancelado') DEFAULT 'agendado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE,
    INDEX idx_data_hora (data_agendamento, hora_agendamento),
    INDEX idx_status (status),
    INDEX idx_cliente (cliente_id)
);

-- Inserir usuário administrador padrão
-- Senha: admin123 (hash gerado com bcrypt)
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Administrador', 'admin@gv.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador');

-- Inserir alguns serviços de exemplo
INSERT INTO servicos (nome, descricao, preco, duracao_minutos, ativo) VALUES 
('Corte Feminino', 'Corte de cabelo feminino com lavagem e secagem', 114.99, 60, TRUE),
('Coloração', 'Coloração completa do cabelo', 279.99, 120, TRUE),
('Luzes', 'Luzes em todo o cabelo', 449.99, 240, TRUE),
('Hidratação', 'Tratamento hidratante para cabelos', 169.99, 60, TRUE),
('Escova', 'Penteado para eventos', 269.99, 120, TRUE),
('Maquiagem', 'Maquiagem para eventos', 299.99, 120, TRUE)

-- Inserir alguns clientes de exemplo
INSERT INTO clientes (nome, telefone, email, data_nascimento, observacoes) VALUES 
('Maria Silva', '(11) 99999-1111', 'maria@email.com', '1985-03-15', 'Cliente preferencial, gosta de cortes curtos'),
('João Santos', '(11) 99999-2222', 'joao@email.com', '1990-07-22', 'Prefere horários da manhã'),
('Ana Costa', '(11) 99999-3333', 'ana@email.com', '1992-11-08', 'Alérgica a produtos com amônia'),
('Carlos Oliveira', '(11) 99999-4444', 'carlos@email.com', '1988-05-30', 'Cliente novo, ainda conhecendo os serviços'),
('Fernanda Lima', '(11) 99999-5555', 'fernanda@email.com', '1995-09-12', 'Gosta de experimentar novos cortes');

-- Inserir alguns agendamentos de exemplo
INSERT INTO agendamentos (cliente_id, servico_id, data_agendamento, hora_agendamento, observacoes, status) VALUES 
(1, 1, '2024-01-15', '09:00:00', 'Corte de manutenção', 'agendado'),
(2, 2, '2024-01-15', '10:30:00', 'Primeira vez no salão', 'confirmado'),
(3, 3, '2024-01-15', '14:00:00', 'Coloração loiro platinado', 'agendado'),
(4, 4, '2024-01-16', '09:30:00', 'Hidratação profunda', 'agendado'),
(5, 5, '2024-01-16', '11:00:00', 'Escova para evento', 'confirmado');

-- Criar índices adicionais para melhor performance
CREATE INDEX idx_clientes_telefone ON clientes(telefone);
CREATE INDEX idx_clientes_nome ON clientes(nome);
CREATE INDEX idx_servicos_ativo ON servicos(ativo);
CREATE INDEX idx_agendamentos_data ON agendamentos(data_agendamento);

-- Criar view para relatórios de agendamentos
CREATE VIEW vw_agendamentos_completos AS
SELECT 
    a.id,
    a.data_agendamento,
    a.hora_agendamento,
    a.status,
    a.observacoes,
    c.nome as cliente_nome,
    c.telefone as cliente_telefone,
    c.email as cliente_email,
    s.nome as servico_nome,
    s.preco as servico_preco,
    s.duracao_minutos,
    a.created_at,
    a.updated_at
FROM agendamentos a
LEFT JOIN clientes c ON a.cliente_id = c.id
LEFT JOIN servicos s ON a.servico_id = s.id;

-- Criar view para relatórios financeiros
CREATE VIEW vw_faturamento_diario AS
SELECT 
    DATE(a.data_agendamento) as data,
    COUNT(*) as total_agendamentos,
    SUM(s.preco) as faturamento_total,
    COUNT(CASE WHEN a.status = 'concluido' THEN 1 END) as agendamentos_concluidos,
    SUM(CASE WHEN a.status = 'concluido' THEN s.preco ELSE 0 END) as faturamento_realizado
FROM agendamentos a
LEFT JOIN servicos s ON a.servico_id = s.id
GROUP BY DATE(a.data_agendamento)
ORDER BY data DESC;

-- Mostrar informações do banco criado
SELECT 'Banco de dados Stillus Gama criado com sucesso!' as status;
SELECT COUNT(*) as total_usuarios FROM usuarios;
SELECT COUNT(*) as total_clientes FROM clientes;
SELECT COUNT(*) as total_servicos FROM servicos;
SELECT COUNT(*) as total_agendamentos FROM agendamentos;

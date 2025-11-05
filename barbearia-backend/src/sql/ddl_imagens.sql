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
-- Opcional: adicionar chave estrangeira se desejar
-- ALTER TABLE imagens ADD CONSTRAINT fk_imagem_servico FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE SET NULL;
USE gv_banco;
SELECT id, nome FROM servicos WHERE nome LIKE '%Corte Feminino%' OR nome LIKE '%Corte%';

USE gv_banco;
SELECT id, filename, servico_id, titulo, descricao, preco, criado_em
FROM imagens
WHERE filename = '5.png';

USE gv_banco;
UPDATE imagens
SET servico_id = 1
WHERE filename = '5.png';

USE gv_banco;
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
VALUES ('5.png', 1, 'Corte Feminino', 'Imagem do corte feminino', 114.99, NOW());
SELECT id, filename, servico_id, titulo, descricao, preco FROM imagens WHERE filename = '3.png';
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
VALUES ('3.png', 3, 'Luzes e Mechas', 'Luzes e mechas - resultado profissional', 449.99, NOW());

USE gv_banco;

-- Verificações (opcionais)
SELECT id, nome FROM servicos WHERE id IN (1,2,3,4,5,6);
SELECT id, filename, servico_id, titulo, descricao, preco FROM imagens WHERE filename IN ('3.png','5.png','7.png','8.png','9.png','10.png');

-- 3.png -> servico_id = 3 (Luzes)
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '3.png', 3, 'Luzes e Mechas', 'Luzes e mechas - resultado profissional', 449.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '3.png');

UPDATE imagens
SET servico_id = 3,
    titulo = 'Luzes e Mechas',
    descricao = 'Luzes e mechas - resultado profissional',
    preco = 449.99
WHERE filename = '3.png';


INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '5.png', 1, 'Corte Feminino', 'Corte Feminino', 114.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '5.png');

UPDATE imagens
SET servico_id = 1,
    titulo = 'Corte Feminino',
    descricao = 'Corte Feminino - R$ 114.99',
    preco = 114.99
WHERE filename = '5.png';

-- 10.png -> servico_id = 2 (Coloração) — (kept for completeness)
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '10.png', 2, 'Coloração e Tonalização', 'Coloração e tonalização profissional', 279.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '10.png');

UPDATE imagens
SET servico_id = 2,
    titulo = 'Coloração e Tonalização',
    descricao = 'Coloração e tonalização profissional',
    preco = 279.99
WHERE filename = '10.png';

-- 8.png -> servico_id = 4 (Hidratação / Tratamento)
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '8.png', 4, 'Tratamento e Hidratação', 'Tratamento intensivo e hidratação profissional', 169.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '8.png');

UPDATE imagens
SET servico_id = 4,
    titulo = 'Tratamento e Hidratação',
    descricao = 'Tratamento intensivo e hidratação profissional',
    preco = 169.99
WHERE filename = '8.png';

-- 9.png -> servico_id = 5 (Escova / Penteados para eventos)
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '9.png', 5, 'Penteados para eventos', 'Penteados e escovas para ocasiões especiais', 269.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '9.png');

UPDATE imagens
SET servico_id = 5,
    titulo = 'Penteados para eventos',
    descricao = 'Penteados e escovas para ocasiões especiais',
    preco = 269.99
WHERE filename = '9.png';

-- 7.png -> servico_id = 6 (Maquiagem)
INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
SELECT '7.png', 6, 'Maquiagem', 'Maquiagem profissional para eventos', 299.99, NOW()
WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '7.png');

UPDATE imagens
SET servico_id = 6,
    titulo = 'Maquiagem',
    USE gv_banco;

    -- Cria a tabela de imagens (se não existir)
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

    -- Garante índice para servico_id (se já não existir)
    CREATE INDEX IF NOT EXISTS idx_imagens_servico_id ON imagens(servico_id);

    -- Seed/associações de imagens aos serviços
    -- Para cada imagem: insere caso não exista e atualiza metadados/associação

    -- 3.png -> servico_id = 3 (Luzes)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '3.png', 3, 'Luzes e Mechas', 'Luzes e mechas - resultado profissional', 449.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '3.png');

    UPDATE imagens
    SET servico_id = 3,
        titulo = 'Luzes e Mechas',
        descricao = 'Luzes e mechas - resultado profissional',
        preco = 449.99
    WHERE filename = '3.png';

    -- 5.png -> servico_id = 1 (Corte Feminino)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '5.png', 1, 'Corte Feminino', 'Corte Feminino', 114.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '5.png');

    UPDATE imagens
    SET servico_id = 1,
        titulo = 'Corte Feminino',
        descricao = 'Corte Feminino',
        preco = 114.99
    WHERE filename = '5.png';

    -- 10.png -> servico_id = 2 (Coloração)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '10.png', 2, 'Coloração e Tonalização', 'Coloração e tonalização profissional', 279.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '10.png');

    UPDATE imagens
    SET servico_id = 2,
        titulo = 'Coloração e Tonalização',
        descricao = 'Coloração e tonalização profissional',
        preco = 279.99
    WHERE filename = '10.png';

    -- 8.png -> servico_id = 4 (Tratamento e Hidratação)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '8.png', 4, 'Tratamento e Hidratação', 'Tratamento intensivo e hidratação profissional', 169.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '8.png');

    UPDATE imagens
    SET servico_id = 4,
        titulo = 'Tratamento e Hidratação',
        descricao = 'Tratamento intensivo e hidratação profissional',
        preco = 169.99
    WHERE filename = '8.png';

    -- 9.png -> servico_id = 5 (Penteados / Escova)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '9.png', 5, 'Penteados para eventos', 'Penteados e escovas para ocasiões especiais', 269.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '9.png');

    UPDATE imagens
    SET servico_id = 5,
        titulo = 'Penteados para eventos',
        descricao = 'Penteados e escovas para ocasiões especiais',
        preco = 269.99
    WHERE filename = '9.png';

    -- 7.png -> servico_id = 6 (Maquiagem)
    INSERT INTO imagens (filename, servico_id, titulo, descricao, preco, criado_em)
    SELECT '7.png', 6, 'Maquiagem', 'Maquiagem profissional para eventos', 299.99, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM imagens WHERE filename = '7.png');

    UPDATE imagens
    SET servico_id = 6,
        titulo = 'Maquiagem',
        descricao = 'Maquiagem profissional para eventos',
        preco = 299.99
    WHERE filename = '7.png';

    -- Verificação final
    SELECT id, filename, servico_id, titulo, descricao, preco FROM imagens WHERE filename IN ('3.png','5.png','7.png','8.png','9.png','10.png');
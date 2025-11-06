# Documentação Completa - Sistema de Agendamentos (Stillus Gama)

Este documento reúne e consolida todas as informações dos arquivos do projeto: `README.md`, `ANALISE-PROJETO.md`, `GUIA-RAPIDO.md`, `CHECKLIST-INSTALACAO.md` e `MUDANCAS-REALIZADAS.md`.

## 📌 Visão Geral

- Projeto: Sistema de agendamentos para salão de beleza (adaptado para o banco `gv_banco`).
- Backend: Node.js + Express (ES Modules)
- Frontend: Angular 17 (standalone components)
- Banco: MySQL (script em `barbearia-backend/src/sql/ddl.sql`)

## Estrutura do Repositório

```
projetoBarberariaDSW/
├── DOCUMENTACAO-COMPLETA.md   <-- (este arquivo)
├── README.md
├── ANALISE-PROJETO.md
├── GUIA-RAPIDO.md
├── CHECKLIST-INSTALACAO.md
├── MUDANCAS-REALIZADAS.md
├── barbearia-backend/
│   ├── package.json
│   ├── .env (criar)            # contém PORT, MYSQL_*, JWT_SECRET
│   └── src/
│       ├── app.js
│       ├── rotas.js
│       ├── controller/
│       ├── repository/
│       └── sql/ddl.sql
└── barbearia-frontend/
    ├── package.json
    └── src/
        └── app/ (Angular 17)
```

## Resumo da Análise do Projeto

- Projeto completo e funcional (frontend Angular 17 + backend Node/Express).
- Autenticação via JWT; senhas em MD5 (padrão do curso).
- Arquitetura backend: Controller/Repository, variáveis sensíveis em `.env`, CORS habilitado.
- Frontend com componentes standalone, lazy loading e AuthGuard/AuthInterceptor.

### Endpoints importantes

- Públicos:
  - POST `/usuario` - cadastrar
  - POST `/usuario/login` - login
  - GET `/barbeiros` - listar barbeiros
  - GET `/servicos` - listar serviços
- Protegidos (token `x-access-token`):
  - GET `/usuario/perfil`
  - POST `/agendamento`
  - GET `/agendamentos`
  - PUT `/agendamento/:id/status`
  - DELETE `/agendamento/:id`
- Admin (roles/tipo): listagem e CRUD de barbeiros/serviços/usuários

## Mudanças realizadas (resumo)

A versão atual do backend foi adaptada para um DDL diferente (nomes e colunas alteradas). Principais pontos:

- Banco padrão agora: `gv_banco`.
- Tabelas: `usuarios`, `clientes`, `servicos`, `agendamentos` (pluralizado conforme DDL).
- Campos renomeados/alterados: `duracao_minutos`, `data_agendamento` + `hora_agendamento`, `cliente_id` etc.
- Removido o conceito de `barbeiro` em algumas adaptações (depende do DDL). O backend mantém retrocompatibilidade para o frontend convertendo `usuario_id` → `cliente_id` e `data_hora` → `data_agendamento`+`hora_agendamento` quando necessário.

Consulte `MUDANCAS-REALIZADAS.md` para detalhes completos e SQL pré-populado.

## Checklist de Instalação (resumo executável)

Pré-requisitos:

- Node.js v18+ (recomendado)
- MySQL v8+
- Angular CLI (para desenvolvimento frontend)

Passos rápidos (backend):

```powershell
cd barbearia-backend
npm install
# Criar .env na raiz do backend com as variáveis abaixo
```

Exemplo `.env` (ajuste senha):

```
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=1234
MYSQL_DATABASE=gv_banco
JWT_SECRET=chave_secreta_gv_2024
```

Criar o banco de dados e tabelas (no MySQL):

```powershell
# a partir do sistema (Windows PowerShell):
mysql -u root -p < "barbearia-backend/src/sql/ddl.sql"
```

Iniciar backend:

```powershell
npm start
# Mensagem esperada: "--> API Barbearia subiu na porta 3000 <--"
```

Passos rápidos (frontend):

```powershell
cd barbearia-frontend
npm install -g @angular/cli   # opcional, se você quiser usar `ng`
npm install
npm start
# Acesse http://localhost:4200
```

## Guia rápido (fluxos principais)

- Cadastro → POST `/usuario`
- Login → POST `/usuario/login` → armazena JWT em `localStorage`
- Criar agendamento → GET serviços e barbeiros → POST `/agendamento` com token
- Listar agendamentos → GET `/agendamentos` (protegido)

Admin padrão (dados para teste)

```
Email: admin@gv.com
Senha: admin123
Tipo/tipo: administrador
```

Criação via SQL (exemplo):

```sql
INSERT INTO usuario (nome, email, senha, role)
VALUES ('Admin', 'admin@barbearia.com', MD5('admin123'), 'admin');
```

## Banco de Dados - notas rápidas

- Script DDL: `barbearia-backend/src/sql/ddl.sql` (executar antes de iniciar)
- O DDL contém dados iniciais: serviços, clientes e admin padrão (ver `MUDANCAS-REALIZADAS.md`).

## Troubleshooting comum

- Backend não inicia: verifique MySQL, arquivo `.env`, e se a porta 3000 está livre.
- Frontend não compila: confirme Angular CLI e dependências (`npm install`).
- Token inválido: limpe `localStorage` e faça login novamente; verifique se `JWT_SECRET` é o mesmo no `.env`.

## Verificações pós-início

- Backend: ao iniciar, confirme logs de conexão com BD e que a API subiu.
- Frontend: abra `http://localhost:4200` e veja se a aplicação carrega (tema preto/dourado).
- Teste funcionalidades: cadastro, login, novo agendamento, listagem e cancelamento.

## Testes rápidos recomendados

1. Cadastro e Login de usuário comum
2. Login como admin e acessar rotas administrativas
3. Criar um agendamento e verificar listagem
4. Cancelar um agendamento e verificar status

## Notas de compatibilidade e observações

- O backend implementa adaptações para manter compatibilidade com o frontend original: aceita campos antigos e os converte internamente.
- Algumas versões do projeto removeram a tabela `barbeiro`; ver `MUDANCAS-REALIZADAS.md` para como isso foi tratado.

## Próximos passos sugeridos

- Se quiser migrar senhas MD5 para bcrypt: adicionar job de migração e exigir reset de senha.
- Adicionar testes automatizados (unit/integration) para controllers e repositories.
- Incluir instruções de deploy (Docker / CI) se for publicar em produção.

---

## Referências internas

- Arquivos originais consolidados neste documento:
  - `README.md`
  - `ANALISE-PROJETO.md`
  - `GUIA-RAPIDO.md`
  - `CHECKLIST-INSTALACAO.md`
  - `MUDANCAS-REALIZADAS.md`

---

Documento gerado automaticamente a partir dos arquivos do projeto. Ajuste detalhes de configuração (ex.: senha do banco) antes de rodar em sua máquina.

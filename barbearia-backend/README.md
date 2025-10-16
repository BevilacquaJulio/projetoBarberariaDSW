# 🔧 Backend - Barbearia Premium

API REST completa para sistema de agendamentos de barbearia.

## 🚀 Tecnologias

- Node.js + Express
- MySQL2 (com Promises)
- JWT (jsonwebtoken)
- dotenv (variáveis de ambiente)
- CORS
- Nodemon (desenvolvimento)

## 📋 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Configurar variáveis no .env
# PORT=3000
# MYSQL_HOST=localhost
# MYSQL_USER=root
# MYSQL_PASSWORD=sua_senha
# MYSQL_DATABASE=barbearia_db
# JWT_SECRET=chave_secreta

# Criar banco de dados
mysql -u root -p < src/sql/ddl.sql

# Iniciar servidor
npm start
```

## 📁 Estrutura

```
src/
├── app.js                    # Servidor Express
├── rotas.js                  # Registro de rotas
├── utils/
│   └── jwt.js                # JWT (geração, validação, middleware)
├── repository/
│   ├── connection.js         # Conexão MySQL
│   ├── usuarioRepository.js  # Queries de usuário
│   ├── barbeiroRepository.js # Queries de barbeiro
│   ├── servicoRepository.js  # Queries de serviço
│   └── agendamentoRepository.js # Queries de agendamento
├── controller/
│   ├── usuarioController.js  # Rotas de usuário
│   ├── barbeiroController.js # Rotas de barbeiro
│   ├── servicoController.js  # Rotas de serviço
│   └── agendamentoController.js # Rotas de agendamento
└── sql/
    └── ddl.sql               # Script do banco
```

## 🔐 Autenticação JWT

### Gerar Token (após login)
```javascript
import { generateToken } from './utils/jwt.js'
let token = generateToken({ id: 1, nome: 'João', role: 'cliente' })
```

### Proteger Rota
```javascript
import { getAuthentication } from './utils/jwt.js'
const autenticador = getAuthentication()

endpoints.get('/rota-protegida', autenticador, async (req, resp) => {
  let usuarioId = req.user.id  // Dados do token
  let nome = req.user.nome
})
```

### Usar Token no Cliente
```
Headers:
  x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

OU

Query String:
  /rota?x-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📡 Endpoints

### Usuário
- `POST /usuario` - Cadastrar (público)
- `POST /usuario/login` - Login (público)
- `GET /usuario/perfil` - Perfil logado (protegido)
- `GET /usuarios` - Listar todos (admin)

### Barbeiro
- `GET /barbeiros` - Listar ativos (público)
- `GET /barbeiro/:id` - Buscar um (público)
- `POST /barbeiro` - Cadastrar (admin)
- `PUT /barbeiro/:id` - Alterar (admin)
- `DELETE /barbeiro/:id` - Deletar (admin)

### Serviço
- `GET /servicos` - Listar ativos (público)
- `GET /servico/:id` - Buscar um (público)
- `POST /servico` - Cadastrar (admin)
- `PUT /servico/:id` - Alterar (admin)
- `DELETE /servico/:id` - Deletar (admin)

### Agendamento
- `POST /agendamento` - Criar (protegido)
- `GET /agendamentos` - Listar meus (protegido)
- `GET /agendamento/:id` - Buscar um (protegido)
- `PUT /agendamento/:id/status` - Alterar status (protegido)
- `DELETE /agendamento/:id` - Deletar (protegido)
- `GET /agendamentos/todos` - Listar todos (admin)
- `GET /agendamentos/data/:data` - Por data (admin)

## 🧪 Testando com Postman/Insomnia

### 1. Cadastrar Usuário
```
POST http://localhost:3000/usuario
Body (JSON):
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "telefone": "(11) 99999-9999"
}
```

### 2. Login
```
POST http://localhost:3000/usuario/login
Body (JSON):
{
  "email": "joao@email.com",
  "senha": "123456"
}

Resposta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "role": "cliente"
  }
}
```

### 3. Criar Agendamento
```
POST http://localhost:3000/agendamento
Headers:
  x-access-token: [TOKEN_DO_LOGIN]
Body (JSON):
{
  "barbeiro_id": 1,
  "servico_id": 1,
  "data_hora": "2024-12-20 14:30:00",
  "observacoes": "Prefiro corte mais baixo nas laterais"
}
```

## 🔒 Validações Implementadas

### Agendamento
- ✅ Verifica se barbeiro existe e está ativo
- ✅ Verifica se serviço existe e está ativo
- ✅ Verifica disponibilidade do barbeiro no horário
- ✅ Valida conflitos de horário
- ✅ Valida propriedade (usuário só altera/deleta seus agendamentos)

### Usuário
- ✅ Email único
- ✅ Campos obrigatórios
- ✅ Senha hashada com MD5

### Try-Catch
- ✅ Todas as rotas têm tratamento de erro
- ✅ Mensagens de erro consistentes
- ✅ Status HTTP corretos

## 🗄️ Banco de Dados

### Tabelas
- `usuario` - Dados dos usuários
- `barbeiro` - Barbeiros disponíveis
- `servico` - Serviços oferecidos
- `agendamento` - Agendamentos realizados

### Relacionamentos
- Agendamento → Usuário (FK)
- Agendamento → Barbeiro (FK)
- Agendamento → Serviço (FK)

### Dados Iniciais
O script DDL já insere:
- 3 barbeiros
- 5 serviços

## 🎯 Padrão de Código

### Repository
- Funções exportadas individualmente
- Queries SQL preparadas (?)
- Retorna `insertId` ou `affectedRows`

### Controller
- Import desestruturado do repository
- Try-catch em todas as rotas
- Validação de campos
- Verificação de existência
- Respostas JSON padronizadas

### Nomenclatura
- Rotas: `/inserir-X`, `/listar-X`, `/alterar-X/:id`
- Funções: `inserirX`, `listarX`, `alterarX`, `deletarX`
- Variáveis: camelCase

## 🚨 Erros Comuns

### Conexão MySQL
```
Error: connect ECONNREFUSED
→ MySQL não está rodando
→ Verifique credenciais no .env
```

### JWT Token
```
Authentication Error: JWT must be provided
→ Token não enviado ou inválido
→ Verifique header x-access-token
```

### Horário Conflitante
```
{ erro: "Barbeiro não está disponível neste horário" }
→ Já existe agendamento nesse período
→ Escolha outro horário
```

## 📦 Dependências

```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "mysql2": "^3.15.2",
  "nodemon": "^3.1.10",
  "jsonwebtoken": "^9.0.2"
}
```

## 🔄 Scripts

```json
{
  "start": "nodemon src/app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 💡 Dicas

1. **Sempre use .env** - Nunca exponha credenciais
2. **Teste isoladamente** - Use Postman antes de integrar com frontend
3. **Valide tudo** - Campos obrigatórios, tipos, existência
4. **Try-catch sempre** - Evita crashes da API
5. **Status HTTP corretos** - 200, 201, 400, 401, 403, 404, 500

---

**Backend desenvolvido seguindo padrão Controller/Repository do curso DSW** 🚀


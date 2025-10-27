# 💈 Sistema de Barbearia Premium

Sistema completo de agendamentos para barbearia com backend em Node.js e frontend em Angular. Tema escuro sofisticado com paleta preto e dourado.

Link Figma: https://www.figma.com/design/2rgLlbNZfLD9eZ3I1W9rth/LP---Site-para-vendas-de-mov%C3%A9is--Community-?node-id=4-116&t=7d8Ip3nkebp6jmrS-1

##🏦 **Modelagem De Dados**

Modelo que representa a estrutura do projeto e seu banco de dados

https://drive.google.com/file/d/13yRAYCOJ1JwzzosXUJ-v2a-CXSfEpQQJ/view

## 🎨 Design

- **Tema:** Modo escuro (preto e dourado)
- **Paleta de cores:**
  - Preto primário: `#0a0a0a`
  - Preto secundário: `#1a1a1a`
  - Dourado primário: `#d4af37`
  - Dourado secundário: `#f4d03f`
- **Fontes:** 
  - Playfair Display (títulos)
  - Poppins (texto)

## 🚀 Tecnologias

### Backend
- Node.js + Express
- MySQL
- JWT para autenticação
- Arquitetura Controller/Repository

### Frontend
- Angular 17 (standalone components)
- SCSS
- RxJS
- HttpClient

## 📋 Funcionalidades

### Autenticação
- ✅ Cadastro de usuários
- ✅ Login com JWT
- ✅ Proteção de rotas
- ✅ Interceptor HTTP automático

### Gestão de Agendamentos
- ✅ Criar novo agendamento
- ✅ Listar agendamentos do usuário
- ✅ Cancelar agendamento
- ✅ Deletar agendamento
- ✅ Verificação de disponibilidade de barbeiro

### Catálogo
- ✅ Lista de serviços com preços
- ✅ Lista de barbeiros com especialidades
- ✅ Informações detalhadas

### Dashboard
- ✅ Visão geral dos agendamentos
- ✅ Estatísticas
- ✅ Próximos agendamentos

## 🛠️ Setup do Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### 1. Configurar Banco de Dados

```bash
# Entre no MySQL
mysql -u root -p

# Execute o script SQL
source barbearia-backend/src/sql/ddl.sql
```

### 2. Backend (Node.js)

```bash
# Entre na pasta do backend
cd barbearia-backend

# Instale as dependências
npm install

# Crie o arquivo .env (copie do .env.example)
cp .env.example .env

# Edite o .env com suas credenciais do MySQL
# PORT=3000
# MYSQL_HOST=localhost
# MYSQL_USER=root
# MYSQL_PASSWORD=sua_senha
# MYSQL_DATABASE=barbearia_db
# JWT_SECRET=chave_secreta_barbearia_123

# Inicie o servidor
npm start
```

O backend estará rodando em `http://localhost:3000`

### 3. Frontend (Angular)

```bash
# Entre na pasta do frontend
cd barbearia-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

O frontend estará rodando em `http://localhost:4200`

## 📁 Estrutura do Projeto

### Backend
```
barbearia-backend/
├── src/
│   ├── app.js                    # Servidor Express
│   ├── rotas.js                  # Registro de rotas
│   ├── utils/
│   │   └── jwt.js                # Funções JWT
│   ├── repository/
│   │   ├── connection.js         # Conexão MySQL
│   │   ├── usuarioRepository.js
│   │   ├── barbeiroRepository.js
│   │   ├── servicoRepository.js
│   │   └── agendamentoRepository.js
│   ├── controller/
│   │   ├── usuarioController.js
│   │   ├── barbeiroController.js
│   │   ├── servicoController.js
│   │   └── agendamentoController.js
│   └── sql/
│       └── ddl.sql               # Script banco de dados
├── package.json
└── .env
```

### Frontend
```
barbearia-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/           # Proteção de rotas
│   │   │   ├── interceptors/     # HTTP interceptors
│   │   │   └── services/         # Serviços API
│   │   ├── pages/                # Páginas
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── cadastro/
│   │   │   ├── dashboard/
│   │   │   ├── agendamentos/
│   │   │   └── novo-agendamento/
│   │   └── shared/
│   │       └── components/       # Componentes reutilizáveis
│   ├── environments/             # Configurações
│   └── styles.scss               # Estilos globais
├── angular.json
└── package.json
```

## 🔐 API Endpoints

### Públicos
- `POST /usuario` - Cadastrar usuário
- `POST /usuario/login` - Login
- `GET /barbeiros` - Listar barbeiros ativos
- `GET /servicos` - Listar serviços ativos

### Protegidos (requer token)
- `GET /usuario/perfil` - Perfil do usuário logado
- `POST /agendamento` - Criar agendamento
- `GET /agendamentos` - Listar agendamentos do usuário
- `GET /agendamento/:id` - Buscar agendamento específico
- `PUT /agendamento/:id/status` - Alterar status
- `DELETE /agendamento/:id` - Deletar agendamento

### Admin apenas
- `GET /usuarios` - Listar todos usuários
- `POST /barbeiro` - Cadastrar barbeiro
- `PUT /barbeiro/:id` - Alterar barbeiro
- `DELETE /barbeiro/:id` - Deletar barbeiro
- `POST /servico` - Cadastrar serviço
- `PUT /servico/:id` - Alterar serviço
- `DELETE /servico/:id` - Deletar serviço

## 🧪 Testando a Aplicação

### 1. Cadastrar Usuário
1. Acesse `http://localhost:4200/cadastro`
2. Preencha: nome, email, senha
3. Clique em "Cadastrar"

### 2. Fazer Login
1. Acesse `http://localhost:4200/login`
2. Use email e senha cadastrados
3. Será redirecionado ao dashboard

### 3. Criar Agendamento
1. No dashboard, clique em "Novo Agendamento"
2. Selecione serviço, barbeiro, data e hora
3. Confirme o agendamento

### 4. Gerenciar Agendamentos
1. Acesse "Meus Agendamentos"
2. Veja todos seus agendamentos
3. Cancele ou delete conforme necessário

## 📝 Dados de Teste

O banco vem com dados pré-cadastrados:

### Barbeiros
- Carlos Silva (Cortes clássicos)
- Rafael Santos (Barba e bigode)
- Bruno Costa (Cortes modernos)

### Serviços
- Corte de Cabelo - R$ 45,00 (30min)
- Barba - R$ 35,00 (20min)
- Corte + Barba - R$ 70,00 (50min)
- Degradê - R$ 55,00 (40min)
- Sobrancelha - R$ 20,00 (15min)

### Criar usuário Admin
```sql
INSERT INTO usuario (nome, email, senha, role)
VALUES ('Admin', 'admin@barbearia.com', MD5('admin123'), 'admin');
```

## 🎯 Fluxo de Autenticação

1. **Usuário se cadastra** → Dados salvos no banco com senha em MD5
2. **Usuário faz login** → API retorna token JWT + dados do usuário
3. **Token armazenado** → LocalStorage do navegador
4. **Requisições protegidas** → Interceptor adiciona header `x-access-token`
5. **Backend valida** → JWT middleware verifica token
6. **Acesso liberado** → Dados do usuário disponíveis em `req.user`

## 🔒 Segurança

- ✅ Senhas hashadas com MD5 (conforme padrão do professor)
- ✅ JWT para autenticação stateless
- ✅ Proteção de rotas no frontend (AuthGuard)
- ✅ Proteção de rotas no backend (JWT middleware)
- ✅ Validação de propriedade de agendamentos
- ✅ CORS habilitado
- ✅ Variáveis sensíveis em .env

## 🚨 Troubleshooting

### Backend não conecta ao MySQL
- Verifique se o MySQL está rodando
- Confira credenciais no `.env`
- Teste conexão: `mysql -u root -p`

### Frontend não se comunica com backend
- Verifique se backend está em `localhost:3000`
- Confira `src/environments/environment.ts`
- Veja console do navegador para erros

### Erro de CORS
- Certifique-se que CORS está habilitado no backend
- Verifique `app.use(cors())` em `app.js`

### Token inválido
- Limpe localStorage: `localStorage.clear()`
- Faça login novamente
- Verifique se `JWT_SECRET` é o mesmo no backend

## 📦 Build para Produção

### Backend
```bash
# Já está pronto para produção
# Configure variáveis de ambiente no servidor
```

### Frontend
```bash
cd barbearia-frontend
npm run build

# Arquivos gerados em: dist/barbearia-frontend
# Faça deploy em servidor web (nginx, apache, etc)
```

## 👨‍💻 Desenvolvimento

### Padrões de Código
- Backend segue padrão Controller/Repository
- Código limpo sem comentários desnecessários
- Try-catch em todas as rotas
- Validações de campos obrigatórios
- Status HTTP corretos

### Commits
- Use mensagens descritivas
- Formate código antes de commitar
- Teste localmente antes de push

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido seguindo os padrões de projeto do curso DSW.

---

**Barbearia Premium** - Estilo, tradição e tecnologia em perfeita harmonia! ✂️✨


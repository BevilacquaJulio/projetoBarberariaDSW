# 💇‍♂️ Sistema GV Cabeleireiro - Guilherme Vasconcelos

> Sistema completo de agendamentos para salão de cabeleireiro desenvolvido com **Node.js + Express** no backend e **Angular 17** no frontend.

![Status](https://img.shields.io/badge/Status-Ativo-success)
![Node](https://img.shields.io/badge/Node.js-20.x-green)
![Angular](https://img.shields.io/badge/Angular-17-red)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-Academic-blue)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Demo](#-demo)
- [Tecnologias](#-tecnologias)
- [Design e Paleta de Cores](#-design-e-paleta-de-cores)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Screenshots](#-screenshots)
- [Contribuição](#-contribuição)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **Sistema GV Cabeleireiro** (Guilherme Vasconcelos) é uma aplicação web full-stack para gestão de agendamentos de salão de cabeleireiro. Desenvolvido como projeto acadêmico para a disciplina de **Desenvolvimento de Software para Web (DSW)**, o sistema oferece uma solução completa para gerenciamento de clientes, serviços e agendamentos.

### ✨ Principais Características

- 🔐 **Autenticação JWT** - Sistema seguro de login com tokens
- 👥 **Gestão de Clientes** - Cadastro e gerenciamento completo
- 💇‍♂️ **Catálogo de Serviços** - Cortes, coloração, hidratação, escova, maquiagem
- 📅 **Sistema de Agendamentos** - Agendamento online com validação de horários
- 📊 **Dashboard Administrativo** - Estatísticas e relatórios em tempo real
- 🎨 **Design Moderno** - Interface com gradientes vibrantes roxo e azul
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em mobile e desktop
- 🚀 **API RESTful** - Backend robusto com Node.js + Express
- 🔄 **SPA (Single Page Application)** - Frontend com Angular 17

---

## 🎬 Demo

### Capturas de Tela
Confira a seção [Screenshots](#-screenshots) para visualizar a interface do sistema.

### Recursos do Sistema
- Sistema de login para administradores
- Cadastro simplificado de clientes (apenas nome e telefone)
- Agendamentos com data, hora e observações
- Gerenciamento de status dos agendamentos
- Relatórios e estatísticas

---

## 🚀 Tecnologias

### Backend

<div align="center">

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | 20.x | Runtime JavaScript |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | 5.1.0 | Framework web minimalista |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) | 8.0 | Banco de dados relacional |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | 9.0.2 | Autenticação com tokens |

</div>

**Outras dependências:** CORS, dotenv, MySQL2, Nodemon

### Frontend

<div align="center">

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white) | 17.3.0 | Framework SPA |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | 5.2.2 | JavaScript tipado |
| ![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white) | 7.8.0 | Programação reativa |
| ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white) | - | Pré-processador CSS |

</div>

**Features Angular:** Standalone Components, Guards, Interceptors, Lazy Loading

---

## 🎨 Design e Paleta de Cores

O sistema utiliza um tema moderno e vibrante com gradientes de **roxo e azul**, inspirado em interfaces contemporâneas.

### Paleta Principal

```scss
/* Roxo (Primary) */
--primary-purple: #7c3aed;      /* Roxo vibrante principal */
--secondary-purple: #a78bfa;    /* Roxo claro secundário */
--dark-purple: #5b21b6;         /* Roxo escuro para hover */
--hover-purple: #6d28d9;        /* Roxo médio para interações */

/* Azul (Complementar) */
--primary-blue: #3b82f6;        /* Azul vibrante principal */
--secondary-blue: #60a5fa;      /* Azul claro secundário */
--dark-blue: #1e40af;           /* Azul escuro para hover */

/* Neutros */
--primary-black: #0a0a0a;       /* Preto profundo */
--secondary-black: #1a1a1a;     /* Preto suave */
--dark-grey: #2a2a2a;           /* Cinza escuro */
--medium-grey: #3a3a3a;         /* Cinza médio */
--light-grey: #505050;          /* Cinza claro */

/* Textos */
--text-white: #ffffff;          /* Texto branco */
--text-grey: #9ca3af;           /* Texto cinza */
--text-dark: #1f2937;           /* Texto escuro */
--light-bg: #f9fafb;            /* Fundo claro */

/* Estados */
--success: #10b981;             /* Verde - sucesso */
--danger: #ef4444;              /* Vermelho - erro */
--warning: #f59e0b;             /* Laranja - alerta */
```

### Gradientes Característicos

```scss
/* Botão Primary */
linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)

/* Scrollbar */
linear-gradient(180deg, #7c3aed, #3b82f6)

/* Divisores */
linear-gradient(90deg, #7c3aed, #3b82f6)
```

### Tipografia

- **Títulos:** Playfair Display (serif elegante)
- **Corpo de Texto:** Poppins (sans-serif moderna)

### Componentes de UI

- **Botões Primary:** Gradiente roxo → azul com hover elevado
- **Botões Secondary:** Borda roxa com fill no hover
- **Cards:** Fundo branco com shadow sutil e hover roxo
- **Inputs:** Borda roxa no foco com glow
- **Badges:** Cores de status (verde, vermelho, laranja)
- **Scrollbar:** Gradiente roxo → azul customizado

### Efeitos Visuais

- **Hover em Cards:** Elevação + shadow roxa + borda roxa
- **Focus em Inputs:** Border roxa + glow box-shadow
- **Botões:** Transform translateY(-2px) + shadow
- **Transições:** `all 0.3s ease` em todos elementos interativos

### Responsividade

- **Breakpoint:** `768px` (mobile-first)
- **Grid System:** CSS Grid com `repeat(auto-fit, minmax())`
- **Mobile:** Padding reduzido + botões full-width

---

## ⚡ Funcionalidades

### 👥 Para Clientes

- ✅ Cadastro simplificado (nome + telefone)
- ✅ Visualizar catálogo de serviços com preços
- ✅ Fazer agendamentos online
- ✅ Escolher data e horário
- ✅ Adicionar observações personalizadas
- ✅ Ver histórico de agendamentos
- ✅ Cancelar agendamentos

### 👨‍💼 Para Administradores

- ✅ Login seguro com JWT
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gerenciar serviços (criar, editar, desativar)
- ✅ Visualizar todos os agendamentos
- ✅ Filtrar agendamentos por data
- ✅ Alterar status dos agendamentos
- ✅ Gerenciar clientes
- ✅ Relatórios financeiros

### 🔧 Recursos Técnicos

- ✅ Autenticação JWT stateless
- ✅ Interceptor HTTP automático
- ✅ Guards de proteção de rotas
- ✅ Validação de conflitos de horário
- ✅ API RESTful completa
- ✅ Tratamento robusto de erros
- ✅ Arquitetura MVC (Controller/Repository)
- ✅ Standalone Components (Angular 17)
- ✅ Design com gradientes roxo e azul

---

## 📦 Instalação Completa

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MySQL](https://www.mysql.com/) (v8.0 ou superior)
- [Angular CLI](https://angular.io/cli) (v17 ou superior)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/BevilacquaJulio/projetoBarberariaDSW.git
cd projetoBarberariaDSW
```

### Passo 2: Configurar o Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script DDL
source barbearia-backend/src/sql/ddl.sql

# Ou no Windows PowerShell:
Get-Content barbearia-backend/src/sql/ddl.sql | mysql -u root -p
```

### Passo 3: Configurar Backend

```bash
# Entre na pasta do backend
cd barbearia-backend

# Instale as dependências
npm install

# Crie o arquivo .env
# No Windows PowerShell:
New-Item -Path .env -ItemType File
```

Configure o arquivo `.env` com suas credenciais:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=gv_banco
JWT_SECRET=sua_chave_secreta_forte
NODE_ENV=development
```

> ⚠️ **IMPORTANTE:** Nunca commite o arquivo `.env` no Git! Ele já está no `.gitignore`.

### Passo 4: Configurar Frontend

```bash
# Entre na pasta do frontend
cd ../barbearia-frontend

# Instale as dependências
npm install
```

### Passo 5: Iniciar os Servidores

**Terminal 1 - Backend:**
```bash
cd barbearia-backend
npm start
```
Backend rodará em: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd barbearia-frontend
npm start
```
Frontend rodará em: `http://localhost:4200`

### Passo 6: Acessar o Sistema

Abra seu navegador e acesse:
```
http://localhost:4200
```

---

## ⚙️ Configuração

### Variáveis de Ambiente (Backend)

Crie o arquivo `barbearia-backend/.env`:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha_segura
MYSQL_DATABASE=gv_banco
JWT_SECRET=sua_chave_jwt_super_secreta_aqui
NODE_ENV=development
```

> 🔒 **Segurança:** Use senhas fortes e chaves JWT únicas. Nunca exponha essas informações publicamente.

### Configuração de Ambiente (Frontend)

O frontend já vem configurado para desenvolvimento local. Se necessário, edite:

**Desenvolvimento:** `barbearia-frontend/src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**Produção:** `barbearia-frontend/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com'
};
```

---

## 📡 API Endpoints

### 🔓 Endpoints Públicos

#### Usuários
```http
POST /usuario
Body: { nome, telefone, email, data_nascimento }
Descrição: Cadastrar novo cliente
```

```http
POST /usuario/login
Body: { email, senha }
Descrição: Login de administrador
Retorna: { token, usuario: { id, nome, email, tipo } }
```

#### Serviços
```http
GET /servicos
Descrição: Listar todos os serviços ativos
Retorna: Array de serviços
```

```http
GET /servico/:id
Descrição: Buscar serviço por ID
```

---

### 🔐 Endpoints Protegidos (Requer Token)

> **Header obrigatório:** `x-access-token: seu_jwt_token`

#### Perfil
```http
GET /usuario/perfil
Descrição: Dados do usuário logado
Retorna: { id, nome, email, telefone, tipo }
```

#### Agendamentos
```http
POST /agendamento
Body: { servico_id, data_hora, observacoes }
Descrição: Criar novo agendamento
```

```http
GET /agendamentos
Descrição: Listar agendamentos do usuário logado
```

```http
GET /agendamento/:id
Descrição: Buscar agendamento específico
```

```http
PUT /agendamento/:id/status
Body: { status }
Descrição: Alterar status do agendamento
Status válidos: agendado, confirmado, em_andamento, concluido, cancelado
```

```http
DELETE /agendamento/:id
Descrição: Deletar agendamento
```

---

### 👑 Endpoints Admin (Requer Token + tipo=administrador)

#### Usuários
```http
GET /usuarios
Descrição: Listar todos os clientes
```

#### Serviços
```http
POST /servico
Body: { nome, descricao, preco, duracao_minutos }
Descrição: Criar novo serviço
```

```http
PUT /servico/:id
Body: { nome, descricao, preco, duracao_minutos, ativo }
Descrição: Atualizar serviço
```

```http
DELETE /servico/:id
Descrição: Deletar serviço
```

#### Agendamentos
```http
GET /agendamentos/todos
Descrição: Listar TODOS os agendamentos do sistema
```

```http
GET /agendamentos/data/:data
Descrição: Listar agendamentos de uma data específica
Formato data: YYYY-MM-DD
```

---

## 📁 Estrutura de Pastas

```
barbeariaProjeto/
│
├── barbearia-backend/              # 🔧 Servidor Node.js
│   ├── src/
│   │   ├── app.js                  # Servidor Express principal
│   │   ├── rotas.js                # Definição de rotas
│   │   │
│   │   ├── controller/             # Controladores (lógica de negócio)
│   │   │   ├── usuarioController.js
│   │   │   ├── servicoController.js
│   │   │   └── agendamentoController.js
│   │   │
│   │   ├── repository/             # Camada de acesso ao banco
│   │   │   ├── connection.js
│   │   │   ├── usuarioRepository.js
│   │   │   ├── servicoRepository.js
│   │   │   └── agendamentoRepository.js
│   │   │
│   │   ├── utils/                  # Utilitários
│   │   │   └── jwt.js              # Geração/validação JWT
│   │   │
│   │   └── sql/
│   │       └── ddl.sql             # Script do banco de dados
│   │
│   ├── .env                        # Variáveis de ambiente (não versionado)
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── barbearia-frontend/             # 🎨 Aplicação Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/               # Módulos principais
    │   │   │   ├── guards/
    │   │   │   │   └── auth.guard.ts          # Proteção de rotas
    │   │   │   ├── interceptors/
    │   │   │   │   └── auth.interceptor.ts    # Adiciona token
    │   │   │   └── services/                  # Serviços de API
    │   │   │       ├── auth.service.ts
    │   │   │       ├── servico.service.ts
    │   │   │       └── agendamento.service.ts
    │   │   │
    │   │   ├── pages/              # Páginas da aplicação
    │   │   │   ├── home/
    │   │   │   ├── login/
    │   │   │   ├── cadastro/
    │   │   │   ├── dashboard/
    │   │   │   ├── agendamentos/
    │   │   │   └── novo-agendamento/
    │   │   │
    │   │   ├── shared/             # Componentes compartilhados
    │   │   │   └── components/
    │   │   │       └── navbar/
    │   │   │
    │   │   ├── app.component.ts    # Componente raiz
    │   │   └── app.routes.ts       # Rotas do Angular
    │   │
    │   ├── environments/           # Configurações de ambiente
    │   │   ├── environment.ts
    │   │   └── environment.prod.ts
    │   │
    │   ├── assets/                 # Recursos estáticos
    │   │   └── img/
    │   │
    │   ├── styles.scss             # Estilos globais
    │   ├── index.html              # HTML principal
    │   └── main.ts                 # Bootstrap da aplicação
    │
    ├── angular.json                # Configuração do Angular
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

---

## ⚡ Funcionalidades

### Para Clientes

- ✅ Cadastro simplificado (sem senha, apenas telefone)
- ✅ Visualizar catálogo de serviços
- ✅ Fazer agendamentos online
- ✅ Ver histórico de agendamentos
- ✅ Cancelar agendamentos
- ✅ Adicionar observações aos agendamentos

### Para Administradores

- ✅ Login seguro com JWT
- ✅ Dashboard com estatísticas
- ✅ Gerenciar serviços (CRUD completo)
- ✅ Visualizar todos os agendamentos
- ✅ Filtrar agendamentos por data
- ✅ Alterar status dos agendamentos
- ✅ Gerenciar clientes
- ✅ Relatórios financeiros (via views SQL)

### Recursos Técnicos

- ✅ Autenticação JWT stateless
- ✅ Interceptor HTTP automático (adiciona token)
- ✅ Guards de rota (proteção de páginas)
- ✅ Validação de horários (evita conflitos)
- ✅ Responsivo (mobile-first)
- ✅ Design moderno (gradientes roxo e azul)
- ✅ Lazy loading de rotas
- ✅ Standalone components (Angular 17)
- ✅ TypeScript strict mode
- ✅ Tratamento de erros robusto

---

## �️ Estrutura do Banco de Dados

### Banco: `gv_banco`

#### Diagrama de Relacionamentos

```
┌─────────────┐         ┌──────────────────┐         ┌──────────────┐
│   clientes  │         │   agendamentos   │         │   servicos   │
├─────────────┤         ├──────────────────┤         ├──────────────┤
│ id (PK)     │────┐    │ id (PK)          │    ┌────│ id (PK)      │
│ nome        │    └───>│ cliente_id (FK)  │    │    │ nome         │
│ telefone *  │         │ servico_id (FK)  │<───┘    │ descricao    │
│ email       │         │ data_agendamento │         │ preco        │
│ ativo       │         │ hora_agendamento │         │ duracao_min  │
└─────────────┘         │ status           │         │ ativo        │
                        │ observacoes      │         └──────────────┘
                        └──────────────────┘

       ┌───────────────┐
       │   usuarios    │
       ├───────────────┤
       │ id (PK)       │
       │ nome          │
       │ email *       │
       │ senha (hash)  │
       │ tipo (admin)  │
       └───────────────┘
```

#### Tabelas

**1. usuarios** - Administradores do sistema
```sql
id, nome, email (UNIQUE), senha, tipo ('administrador')
```

**2. clientes** - Clientes do salão  
```sql
id, nome, telefone (UNIQUE, obrigatório), email, endereco, data_nascimento, ativo
```

**3. servicos** - Serviços oferecidos
```sql
id, nome, descricao, preco, duracao_minutos, ativo
```

**4. agendamentos** - Agendamentos realizados
```sql
id, cliente_id (FK), servico_id (FK), data_agendamento, hora_agendamento, status, observacoes
```

#### Status dos Agendamentos

- `agendado` - Agendamento criado
- `confirmado` - Confirmado pelo salão
- `em_andamento` - Serviço em execução
- `concluido` - Serviço finalizado
- `cancelado` - Agendamento cancelado

#### Views SQL

- **vw_agendamentos_completos** - Join completo de agendamentos com dados de cliente e serviço
- **vw_faturamento_diario** - Relatório financeiro agregado por dia

---

## �🖼️ Screenshots

### Página Inicial
```
┌─────────────────────────────────────────┐
│  🏠 GV CABELEIREIRO                    │
│     Guilherme Vasconcelos              │
│  ─────────────────────────────────────  │
│                                         │
│  ✨ Estilo e Qualidade em Cada Corte  │
│                                         │
│  [Agendar Horário]  [Ver Serviços]    │
│                                         │
└─────────────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────────────┐
│  📊 Dashboard                           │
│  ─────────────────────────────────────  │
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │ 5       │  │ 2       │  │ 12      ││
│  │Próximos │  │Concluídos│ │Total    ││
│  └─────────┘  └─────────┘  └─────────┘│
│                                         │
│  [Novo Agendamento]  [Ver Todos]       │
│                                         │
└─────────────────────────────────────────┘
```

### Lista de Agendamentos
```
┌─────────────────────────────────────────┐
│  📋 Meus Agendamentos                   │
│  ─────────────────────────────────────  │
│                                         │
│  📅 15/01/2025 - 09:00                 │
│  💇‍♀️ Corte Feminino - R$ 114,99        │
│  📊 Status: Agendado                    │
│  [Cancelar] [Deletar]                   │
│  ─────────────────────────────────────  │
│  📅 16/01/2025 - 10:30                 │
│  🎨 Coloração - R$ 279,99              │
│  📊 Status: Confirmado                  │
│  [Cancelar] [Deletar]                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## � Dados de Exemplo

O script DDL (`barbearia-backend/src/sql/ddl.sql`) cria o banco com dados iniciais:

### Serviços Pré-Cadastrados
- **Corte Feminino** - 60 minutos
- **Coloração** - 120 minutos
- **Luzes** - 240 minutos
- **Hidratação** - 60 minutos
- **Escova** - 120 minutos
- **Maquiagem** - 120 minutos

### Estrutura Criada
- 1 usuário administrador
- 5 clientes de exemplo
- 6 serviços disponíveis
- 5 agendamentos de teste
- 2 views SQL para relatórios

> 💡 **Nota:** As credenciais de acesso são geradas no banco. Consulte o arquivo `ddl.sql` para mais detalhes.

---

## 💻 Desenvolvimento

### Backend

#### Rodar em modo desenvolvimento
```bash
cd barbearia-backend
npm start  # Nodemon com auto-reload
```

#### Testar endpoints (Postman/Insomnia)
```bash
# Exemplo: Login
POST http://localhost:3000/usuario/login
Content-Type: application/json

{
  "email": "admin@gv.com",
  "senha": "admin123"
}
```

#### Estrutura de um Controller
```javascript
import * as repository from '../repository/meuRepository.js';

export async function listar(req, res) {
  try {
    const dados = await repository.listar();
    res.status(200).json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
```

#### Estrutura de um Repository
```javascript
import { con } from './connection.js';

export async function listar() {
  const comando = `SELECT * FROM tabela WHERE ativo = true`;
  const [linhas] = await con.query(comando);
  return linhas;
}
```

---

### Frontend

#### Rodar em modo desenvolvimento
```bash
cd barbearia-frontend
npm start  # ng serve
# Acesse: http://localhost:4200
```

#### Criar novo componente
```bash
ng generate component pages/minha-pagina --standalone
```

#### Criar novo service
```bash
ng generate service core/services/meu-service
```

#### Build para produção
```bash
ng build --configuration production
# Arquivos gerados em: dist/barbearia-frontend/
```

#### Estrutura de um Service
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeuService {
  private apiUrl = `${environment.apiUrl}/recurso`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
```

---

## � Troubleshooting

### Problemas Comuns

**❌ Erro: "Cannot connect to MySQL"**
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Teste: `mysql -u root -p`

**❌ Erro: "JWT must be provided"**
- Certifique-se de enviar o header `x-access-token`
- Verifique se o token não expirou
- Faça login novamente

**❌ Erro: "CORS policy blocked"**
- Verifique se o backend está rodando
- Confirme CORS habilitado no `app.js`
- Confira a URL da API no `environment.ts`

**❌ Frontend não consome API**
- Verifique `apiUrl` no `environment.ts`
- Backend deve estar na porta 3000
- Abra Console do navegador (F12)

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- **Backend:** Padrão MVC (Controller/Repository)
- **Frontend:** Angular Style Guide + Standalone Components
- **Commits:** Conventional Commits
- **Branches:** feature/, bugfix/, hotfix/

---

## �‍💻 Autor

**Julio Bevilacqua**
- GitHub: [@BevilacquaJulio](https://github.com/BevilacquaJulio)
- Projeto: [projetoBarberariaDSW](https://github.com/BevilacquaJulio/projetoBarberariaDSW)

---

## 📝 Licença

Este projeto foi desenvolvido como projeto acadêmico para a disciplina de **Desenvolvimento de Software para Web (DSW)**.

© 2024/2025 - Projeto Acadêmico

---

## 📚 Documentação Adicional

### Arquivos do Projeto
- `barbearia-backend/ESTRUTURA-BANCO.md` - Detalhes completos do banco de dados
- `barbearia-backend/README.md` - Documentação técnica do backend
- `barbearia-frontend/README.md` - Documentação técnica do frontend

### Recursos Externos
- [Node.js Documentation](https://nodejs.org/)
- [Express.js Guide](https://expressjs.com/)
- [Angular Documentation](https://angular.io/)
- [MySQL Reference](https://dev.mysql.com/doc/)
- [JWT Introduction](https://jwt.io/)

---

<div align="center">

### 💇‍♂️ Sistema GV Cabeleireiro
**Guilherme Vasconcelos**

✨ *Estilo e Qualidade em Cada Corte* ✨

---

Desenvolvido com 💛 por [Julio Bevilacqua](https://github.com/BevilacquaJulio)

**Projeto Acadêmico - DSW 2024/2025**

</div>

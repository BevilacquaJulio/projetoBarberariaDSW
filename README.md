# 🎨 Frontend - Barbearia Premium

Interface moderna em Angular com tema claro e gradientes roxo/azul.

## 🚀 Tecnologias

- Angular 17 (standalone components)
- TypeScript
- SCSS
- RxJS
- HttpClient
- Router Guards
- HTTP Interceptors

## 📋 Instalação

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
# ou
ng serve
```

Acesse `http://localhost:4200`

## 📁 Estrutura

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Protege rotas privadas
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts    # Adiciona token nas requisições
│   │   └── services/
│   │       ├── auth.service.ts        # Autenticação
│   │       ├── barbeiro.service.ts    # API barbeiros
│   │       ├── servico.service.ts     # API serviços
│   │       └── agendamento.service.ts # API agendamentos
│   ├── pages/
│   │   ├── home/                      # Página inicial
│   │   ├── login/                     # Login
│   │   ├── cadastro/                  # Cadastro
│   │   ├── dashboard/                 # Dashboard do usuário
│   │   ├── agendamentos/              # Lista agendamentos
│   │   └── novo-agendamento/          # Criar agendamento
│   ├── shared/
│   │   └── components/
│   │       └── navbar/                # Menu de navegação
│   ├── app.component.ts               # Componente raiz
│   └── app.routes.ts                  # Rotas da aplicação
├── environments/
│   ├── environment.ts                 # Config desenvolvimento
│   └── environment.prod.ts            # Config produção
├── styles.scss                        # Estilos globais
└── index.html                         # HTML principal
```

## 🎨 Tema e Cores

### Paleta Principal
```scss
--primary-purple: #7c3aed     // Roxo principal
--secondary-purple: #a78bfa   // Roxo secundário
--dark-purple: #5b21b6        // Roxo escuro
--hover-purple: #6d28d9       // Roxo hover

--primary-blue: #3b82f6      // Azul principal
--secondary-blue: #60a5fa     // Azul secundário
--dark-blue: #1e40af         // Azul escuro
```

### Fundos e Textos
```scss
--light-bg: #f9fafb          // Fundo claro
--text-white: #ffffff        // Texto branco
--text-grey: #9ca3af         // Texto cinza
--text-dark: #1f2937         // Texto escuro
```

### Elementos UI
```scss
--success: #10b981           // Verde sucesso
--danger: #ef4444            // Vermelho erro
--warning: #f59e0b           // Amarelo alerta
```

### Gradientes Utilizados
- Botões: `linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)`
- Scrollbar: `linear-gradient(180deg, #7c3aed, #3b82f6)`

### Fontes
- **Playfair Display**: Títulos (serif elegante)
- **Poppins**: Texto geral (sans-serif moderna)

## 🔐 Autenticação

### AuthService

```typescript
// Login
authService.login(email, senha).subscribe(response => {
  // Token e usuário salvos automaticamente
  // Redireciona para dashboard
})

// Logout
authService.logout()  // Limpa localStorage e redireciona

// Verificar autenticação
authService.isAuthenticated()  // true/false

// Obter usuário logado
authService.getUsuario()  // { id, nome, email, role }

// Verificar admin
authService.isAdmin()  // true/false
```

### AuthGuard

Protege rotas automaticamente:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]  // Só acessa se autenticado
}
```

### AuthInterceptor

Adiciona token automaticamente em todas requisições:

```typescript
// Interceptor pega token do localStorage
// Adiciona header: x-access-token: [TOKEN]
// Você não precisa fazer nada!
```

## 📡 Services (API)

### BarbeiroService
```typescript
listar(): Observable<{ barbeiros: Barbeiro[] }>
buscar(id: number): Observable<Barbeiro>
```

### ServicoService
```typescript
listar(): Observable<{ servicos: Servico[] }>
buscar(id: number): Observable<Servico>
```

### AgendamentoService
```typescript
criar(agendamento: Agendamento): Observable<any>
listarMeus(): Observable<{ agendamentos: Agendamento[] }>
buscar(id: number): Observable<Agendamento>
alterarStatus(id: number, status: string): Observable<any>
deletar(id: number): Observable<any>
```

## 🧩 Componentes

### Home
- Hero section
- Lista de serviços
- Lista de barbeiros
- CTA para agendamento

### Login
- Formulário email/senha
- Validações
- Mensagens de erro
- Redirecionamento pós-login

### Cadastro
- Formulário completo
- Validação de senhas
- Verificação de email duplicado
- Mensagem de sucesso

### Dashboard
- Cards com estatísticas
- Próximos agendamentos
- Ações rápidas

### Agendamentos
- Lista completa
- Badges de status
- Cancelar/Deletar
- Filtros por status

### NovoAgendamento
- Seleção de serviço
- Seleção de barbeiro
- Data e hora
- Resumo do agendamento
- Validação de disponibilidade

### Navbar
- Logo
- Links principais
- Menu responsivo
- Logout
- Condicional (autenticado/não autenticado)

## 🎯 Rotas

```typescript
/home              → Página inicial (público)
/login             → Login (público)
/cadastro          → Cadastro (público)
/dashboard         → Dashboard (protegido)
/agendamentos      → Meus agendamentos (protegido)
/novo-agendamento  → Criar agendamento (protegido)
```

## 📱 Responsivo

Breakpoint: `768px`

### Mobile
- Menu hamburger
- Cards em coluna
- Botões full-width
- Fontes reduzidas

### Desktop
- Menu horizontal
- Grid 2-3 colunas
- Botões inline
- Fontes normais

## 🎨 Classes Utilitárias

### Layout
```html
<div class="container">      <!-- Max-width 1200px -->
<div class="grid grid-2">    <!-- Grid 2 colunas -->
<div class="grid grid-3">    <!-- Grid 3 colunas -->
```

### Espaçamento
```html
<div class="mt-1">  <!-- margin-top: 10px -->
<div class="mt-2">  <!-- margin-top: 20px -->
<div class="mt-3">  <!-- margin-top: 30px -->
<div class="mb-1">  <!-- margin-bottom: 10px -->
```

### Botões
```html
<button class="btn btn-primary">    <!-- Gradiente roxo/azul -->
<button class="btn btn-secondary">  <!-- Borda roxa -->
<button class="btn btn-danger">     <!-- Vermelho -->
```

### Cards
```html
<div class="card">  <!-- Card padrão com hover -->
```

### Alertas
```html
<div class="alert alert-success">  <!-- Verde -->
<div class="alert alert-danger">   <!-- Vermelho -->
<div class="alert alert-warning">  <!-- Amarelo -->
```

### Formulários
```html
<div class="form-group">
  <label>Nome</label>
  <input type="text" class="form-control">
</div>
```

## 🔄 Fluxo de Dados

### 1. Componente chama Service
```typescript
this.servicoService.listar().subscribe({
  next: (response) => {
    this.servicos = response.servicos
  },
  error: (err) => console.error(err)
})
```

### 2. Service faz requisição HTTP
```typescript
return this.http.get<{ servicos: Servico[] }>(`${apiUrl}/servicos`)
```

### 3. Interceptor adiciona token
```typescript
// Automático! Pega do localStorage
```

### 4. Backend responde
```json
{
  "servicos": [
    { "id": 1, "nome": "Corte", "preco": 45.00 }
  ]
}
```

### 5. Componente renderiza
```html
@for (servico of servicos; track servico.id) {
  <div>{{ servico.nome }}</div>
}
```

## 🚨 Tratamento de Erros

### No Component
```typescript
this.service.criar(dados).subscribe({
  next: (response) => {
    this.sucesso = 'Criado com sucesso!'
  },
  error: (err) => {
    this.erro = err.error?.erro || 'Erro ao criar'
  }
})
```

### No Template
```html
@if (erro) {
  <div class="alert alert-danger">
    {{ erro }}
  </div>
}

@if (sucesso) {
  <div class="alert alert-success">
    {{ sucesso }}
  </div>
}
```

## 🎯 Boas Práticas

1. **Standalone Components** - Todos são standalone
2. **Lazy Loading** - Páginas carregadas sob demanda
3. **TypeScript Strict** - Tipos rigorosos
4. **RxJS** - Observables para async
5. **SCSS** - Variáveis CSS e nesting
6. **Responsivo** - Mobile-first
7. **Acessibilidade** - Labels, alt text
8. **Performance** - Track by em loops

## 🧪 Desenvolvimento

### Comandos úteis
```bash
ng serve              # Dev server
ng build              # Build produção
ng test               # Testes unitários
ng generate component # Novo componente
```

### Criar novo componente
```bash
ng generate component pages/minha-pagina --standalone
```

### Criar novo service
```bash
ng generate service core/services/meu-service
```

## 📦 Build para Produção

```bash
# Build otimizado
ng build --configuration production

# Arquivos gerados em: dist/barbearia-frontend/
# Fazer deploy em servidor web (nginx, apache, vercel, etc)
```

### Configurar servidor web
```nginx
# nginx.conf
server {
  listen 80;
  root /var/www/barbearia/dist/barbearia-frontend;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## 🎨 Customização

### Mudar cores
Edite `src/styles.scss`:
```scss
:root {
  --primary-purple: #YOUR_COLOR;
  --primary-blue: #YOUR_COLOR;
}
```

### Mudar fontes
Edite `src/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=SUA_FONTE&display=swap">
```

### Mudar logo
Substitua texto no navbar:
```html
<h1>✂️ SEU NOME</h1>
```

## 💡 Dicas

1. **Interceptor é automático** - Não precisa adicionar token manualmente
2. **Guards protegem rotas** - Configure no app.routes.ts
3. **Services são singleton** - Uma instância para toda app
4. **Use observables** - Não esqueça subscribe()
5. **Track by em loops** - Performance em listas grandes

---

**Frontend desenvolvido com Angular 17 e standalone components** ✨


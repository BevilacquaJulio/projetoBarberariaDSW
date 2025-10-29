# ✅ CHECKLIST DE INSTALAÇÃO - Barbearia

Use este checklist para garantir que tudo está funcionando!

---

## 📋 **PRÉ-REQUISITOS**

- [ ] Node.js instalado (v18+) → `node --version`
- [ ] MySQL instalado (v8+) → `mysql --version`
- [ ] Git instalado (opcional)

---

## 🔧 **BACKEND - barbearia-backend**

### Instalação
- [ ] Entrei na pasta: `cd barbearia-backend`
- [ ] Instalei dependências: `npm install`
- [ ] Criei arquivo `.env` na raiz do backend
- [ ] Copiei as configurações do .env:
```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_aqui
MYSQL_DATABASE=barbearia_db
JWT_SECRET=chave_secreta_barbearia_123
```

### Banco de Dados
- [ ] MySQL está rodando
- [ ] Abri MySQL: `mysql -u root -p`
- [ ] Executei o script: `source src/sql/ddl.sql`
  - OU copiei e colei o conteúdo no MySQL Workbench
- [ ] Banco `barbearia_db` foi criado
- [ ] Tabelas criadas: `usuario`, `barbeiro`, `servico`, `agendamento`
- [ ] Dados inseridos: 3 barbeiros, 5 serviços

### Iniciar Backend
- [ ] Rodei: `npm start`
- [ ] Vi mensagem: **"--> API Barbearia subiu na porta 3000 <--"**
- [ ] Vi mensagem: **"--> Conexão com BD estabelecida"**
- [ ] Backend está rodando sem erros
- [ ] Deixei o terminal aberto

---

## 🎨 **FRONTEND - barbearia-frontend**

### Instalação
- [ ] **NOVO TERMINAL** aberto (não fechei o backend!)
- [ ] Entrei na pasta: `cd barbearia-frontend`
- [ ] Instalei Angular CLI: `npm install -g @angular/cli`
  - Testei: `ng version`
- [ ] Instalei dependências: `npm install`

### Iniciar Frontend
- [ ] Rodei: `npm start`
- [ ] Vi mensagem: **"✔ Browser application bundle generation complete."**
- [ ] Vi mensagem: **"Angular Live Development Server is listening on localhost:4200"**
- [ ] Frontend compilou sem erros
- [ ] Deixei o terminal aberto

---

## 🌐 **TESTE NO NAVEGADOR**

### Acesso Inicial
- [ ] Abri navegador
- [ ] Acessei: `http://localhost:4200`
- [ ] Página carregou (fundo preto/dourado)
- [ ] Vi o logo: **"✂️ Barbearia Premium"**
- [ ] Menu está aparecendo

### Teste de Cadastro
- [ ] Cliquei em **"Cadastre-se"**
- [ ] Preenchi:
  - Nome: João Silva
  - Email: joao@email.com
  - Telefone: (11) 99999-9999
  - Senha: 123456
  - Confirmar: 123456
- [ ] Cliquei em **"Cadastrar"**
- [ ] Vi mensagem de sucesso
- [ ] Fui redirecionado para `/login`

### Teste de Login
- [ ] Preenchi:
  - Email: joao@email.com
  - Senha: 123456
- [ ] Cliquei em **"Entrar"**
- [ ] Fui redirecionado para `/dashboard`
- [ ] Vi meu nome: **"Bem-vindo, João Silva!"**

### Teste de Dashboard
- [ ] Vi 3 cards de estatísticas:
  - Agendamentos Próximos: 0
  - Serviços Concluídos: 0
  - Total de Agendamentos: 0
- [ ] Vi botões:
  - "➕ Novo Agendamento"
  - "📋 Ver Todos os Agendamentos"

### Teste de Página Home
- [ ] Voltei para Home
- [ ] Vi seção "Nossos Serviços" com 5 serviços:
  - Corte de Cabelo - R$ 45,00
  - Barba - R$ 35,00
  - Corte + Barba - R$ 70,00
  - Degradê - R$ 55,00
  - Sobrancelha - R$ 20,00
- [ ] Vi seção "Nossa Equipe" com 3 barbeiros:
  - Carlos Silva
  - Rafael Santos
  - Bruno Costa

### Teste de Agendamento
- [ ] Cliquei em **"Novo Agendamento"**
- [ ] Selecionei:
  - Serviço: Corte de Cabelo
  - Barbeiro: Carlos Silva
  - Data: Hoje ou amanhã
  - Hora: 14:30
- [ ] Vi resumo do agendamento aparecer
- [ ] Cliquei em **"Confirmar Agendamento"**
- [ ] Vi mensagem de sucesso
- [ ] Fui redirecionado para `/agendamentos`
- [ ] Vi meu agendamento na lista

### Teste de Cancelamento
- [ ] Na lista de agendamentos
- [ ] Cliquei em **"Cancelar"** em um agendamento
- [ ] Confirmei o alerta
- [ ] Status mudou para **"Cancelado"**
- [ ] Badge ficou vermelho

### Teste de Logout
- [ ] Cliquei em **"Sair"** no menu
- [ ] Fui redirecionado para `/login`
- [ ] Menu mudou (não mostra mais nome)

---

## 🔍 **VERIFICAÇÕES TÉCNICAS**

### Console do Navegador (F12)
- [ ] Abri DevTools (F12)
- [ ] Aba **Console** não tem erros vermelhos críticos
- [ ] Aba **Network**:
  - [ ] Requisições para `http://localhost:3000` funcionando
  - [ ] Status 200, 201 nas requisições bem-sucedidas
  - [ ] Token sendo enviado no header `x-access-token`

### Terminal Backend
- [ ] Sem erros no console
- [ ] Vejo logs de requisições:
  - `GET /barbeiros`
  - `GET /servicos`
  - `POST /usuario/login`
  - `GET /agendamentos`

### Terminal Frontend
- [ ] Sem erros de compilação
- [ ] Não aparece:
  - "ERROR in..."
  - "Parser Error..."

---

## 🚨 **TROUBLESHOOTING**

### ❌ Backend não inicia
- [ ] MySQL está rodando?
- [ ] Arquivo `.env` existe?
- [ ] Credenciais do MySQL estão corretas?
- [ ] Porta 3000 está livre?

### ❌ Frontend não compila
- [ ] Angular CLI instalado? `ng version`
- [ ] Dependências instaladas? `npm install`
- [ ] Node.js atualizado? (v18+)

### ❌ Página não carrega
- [ ] Backend está rodando?
- [ ] Frontend está rodando?
- [ ] URL correta: `http://localhost:4200`?

### ❌ Login não funciona
- [ ] Backend está respondendo?
- [ ] Console do navegador tem erros?
- [ ] Usuário foi cadastrado?
- [ ] Senha está correta?

### ❌ Agendamento não cria
- [ ] Está logado?
- [ ] Token está sendo enviado?
- [ ] Backend tem erros no console?
- [ ] Barbeiro e serviço existem?

---

## ✅ **TUDO OK!**

Se você marcou todos os checkboxes acima, **PARABÉNS!** 🎉

Seu sistema de barbearia está **100% funcional**!

---

## 📊 **STATUS FINAL**

```
✅ Backend rodando na porta 3000
✅ Frontend rodando na porta 4200
✅ Banco de dados criado e populado
✅ Autenticação JWT funcionando
✅ CRUD completo operacional
✅ Interface bonita (preto/dourado)
✅ Responsivo funcionando
```

---

## 🎯 **PRÓXIMOS PASSOS**

Agora você pode:
- ✨ Criar mais agendamentos
- 👥 Cadastrar mais usuários
- 📊 Ver estatísticas no dashboard
- 📱 Testar no celular (mobile)
- 🎨 Customizar cores em `styles.scss`
- 🔧 Adicionar novas funcionalidades

---

## 📞 **SUPORTE**

Se algo deu errado:

1. Verifique os erros nos consoles (backend e frontend)
2. Confirme que MySQL está rodando
3. Verifique se .env está configurado
4. Limpe node_modules e reinstale: `rm -rf node_modules && npm install`
5. Verifique se as portas 3000 e 4200 estão livres

---

**Sistema pronto para uso!** 💪✂️✨

**Developed with ❤️ following DSW course standards**


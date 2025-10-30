# 🔍 Guia de Diagnóstico - Login Admin

## ❌ PROBLEMA IDENTIFICADO

O banco de dados tem senha em **bcrypt**, mas o código usa **MD5**!

```sql
-- No ddl.sql (BCRYPT):
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Administrador', 'admin@gv.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador');
```

```javascript
// No usuarioRepository.js (MD5):
const query = `
  SELECT id, nome, email, tipo as role 
  FROM usuarios 
  WHERE email = ? AND senha = MD5(?)
`
```

---

## ✅ SOLUÇÃO RÁPIDA

Execute este SQL no MySQL para criar um admin com senha em MD5:

```sql
USE gv_banco;

-- Deletar o admin antigo (bcrypt)
DELETE FROM usuarios WHERE email = 'admin@gv.com';

-- Criar novo admin com senha MD5
-- Email: admin@gv.com
-- Senha: admin123
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Guilherme Vasconcelos', 'admin@gv.com', MD5('admin123'), 'administrador');

-- Verificar se criou corretamente
SELECT id, nome, email, tipo, senha FROM usuarios;
```

---

## 🧪 TESTAR O LOGIN

### 1. **Verificar Backend está rodando**
```powershell
cd barbearia-backend
npm start
```

Deve aparecer: `API Barbearia subiu na porta 3000`

### 2. **Verificar Frontend está rodando**
```powershell
cd barbearia-frontend
ng serve
```

Deve aparecer: `Application bundle generation complete`

### 3. **Acessar aplicação**
- URL: http://localhost:4200
- Clique em "Login Administrativo" no navbar
- **Email:** `admin@gv.com`
- **Senha:** `admin123`

### 4. **Verificar Console do Navegador**
- Pressione **F12**
- Vá em **Console**
- Tente fazer login
- Se aparecer erro, copie a mensagem

---

## 🔎 VERIFICAÇÕES ADICIONAIS

### A. Testar API diretamente com Postman/Insomnia

```http
POST http://localhost:3000/usuario/login
Content-Type: application/json

{
  "email": "admin@gv.com",
  "senha": "admin123"
}
```

**Resposta esperada (sucesso):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "Guilherme Vasconcelos",
    "email": "admin@gv.com",
    "role": "administrador"
  }
}
```

**Resposta esperada (erro):**
```json
{
  "erro": "Credenciais inválidas"
}
```

### B. Verificar tabela usuarios no MySQL

```sql
USE gv_banco;

-- Ver todos os usuários
SELECT id, nome, email, tipo, senha FROM usuarios;

-- A senha deve ser um hash MD5 (32 caracteres hexadecimais)
-- Exemplo: 0192023a7bbd73250516f069df18b500 (MD5 de "admin123")
```

### C. Testar hash MD5 da senha

```sql
-- Verificar se a senha bate
SELECT 
  id, 
  nome, 
  email,
  senha as senha_armazenada,
  MD5('admin123') as senha_testada,
  CASE 
    WHEN senha = MD5('admin123') THEN 'SENHA CORRETA ✓' 
    ELSE 'SENHA INCORRETA ✗' 
  END as resultado
FROM usuarios 
WHERE email = 'admin@gv.com';
```

---

## 🐛 ERROS COMUNS

### Erro: "Credenciais inválidas"
**Causa:** Senha no banco não está em MD5  
**Solução:** Execute o SQL da "SOLUÇÃO RÁPIDA"

### Erro: "CORS policy"
**Causa:** Backend não permite requisições do frontend  
**Solução:** Verificar se `cors()` está habilitado em `app.js` (já está!)

### Erro: "Cannot POST /usuario/login"
**Causa:** Backend não está rodando ou rota não foi registrada  
**Solução:** Reiniciar o backend com `npm start`

### Erro: "Network error"
**Causa:** Backend não está rodando  
**Solução:** Verificar se backend está na porta 3000

### Erro no Console: "jwt is not defined"
**Causa:** Problema no import do JWT  
**Solução:** Verificar `utils/jwt.js`

---

## 📋 CHECKLIST DE VERIFICAÇÃO

- [ ] Backend rodando na porta 3000
- [ ] Frontend rodando na porta 4200
- [ ] Usuário admin existe no banco
- [ ] Senha do admin está em MD5
- [ ] Email é `admin@gv.com`
- [ ] Senha é `admin123`
- [ ] CORS habilitado no backend
- [ ] Console do navegador não mostra erros
- [ ] Rota `/usuario/login` existe em `rotas.js`

---

## 🎯 TESTE FINAL

Depois de executar o SQL de correção:

1. ✅ Reiniciar o backend: `Ctrl+C` → `npm start`
2. ✅ Recarregar o frontend: `F5` no navegador
3. ✅ Limpar cache: `Ctrl+Shift+Del` → Limpar tudo
4. ✅ Fazer login:
   - Email: `admin@gv.com`
   - Senha: `admin123`

**Resultado esperado:** Redirecionar para `/dashboard` ✨

---

## 📞 SE AINDA NÃO FUNCIONAR

Me envie:
1. Print do console do navegador (F12 → Console)
2. Print do terminal do backend
3. Resultado do SQL: `SELECT * FROM usuarios WHERE email = 'admin@gv.com'`

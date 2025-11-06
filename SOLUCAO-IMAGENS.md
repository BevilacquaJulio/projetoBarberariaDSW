# 🔧 SOLUÇÃO - Imagens aparecendo como texto

## ✅ Correções Aplicadas

1. **Content-Type corrigido** - Agora usa `image/png`, `image/jpeg`, etc. em vez de `image/*`
2. **Path absoluto** - Usa `path.resolve()` para garantir que o Express encontre o arquivo
3. **Tipo TypeScript** - Adicionado `servico_id` na interface do ImagemService
4. **Cache-Control** - Adicionado para melhor performance

---

## 🚀 Passos para Resolver

### 1. **Primeiro, registre as imagens no banco:**

```bash
cd barbearia-backend
npm run popular-imagens
```

**Verifique se funcionou:**
- Deve mostrar: `✅ Sucessos: 6`
- Se mostrar erros, verifique o console

### 2. **Verifique se as imagens foram registradas:**

**Opção A - Via API:**
```bash
GET http://localhost:3000/api/imagens
```

**Deve retornar:**
```json
{
  "imagens": [
    {
      "id": 1,
      "filename": "5.png",
      "servico_id": 1,
      "titulo": "Corte Feminino",
      "preco": 114.99
    },
    ...
  ]
}
```

**Opção B - Via MySQL:**
```sql
SELECT * FROM imagens;
```

### 3. **Teste se o backend está servindo as imagens:**

Abra no navegador:
```
http://localhost:3000/api/imagens/5.png
```

**Se a imagem aparecer:** ✅ Backend está funcionando
**Se der erro 404:** Verifique se o arquivo existe em `barbearia-backend/src/uploads/`

### 4. **Reinicie o backend:**

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
cd barbearia-backend
npm start
```

### 5. **Limpe o cache do navegador:**

- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

Ou abra em aba anônima/privada.

### 6. **Verifique o console do navegador:**

Abra o DevTools (F12) e verifique:

**Aba Network:**
- Veja se há requisições para `/api/imagens`
- Veja se há requisições para `/api/imagens/5.png`, etc.
- Se houver erros 404, as imagens não foram registradas

**Aba Console:**
- Procure por erros relacionados a imagens
- Verifique se há erros de CORS

---

## 🔍 Debug Avançado

### No console do navegador, execute:

```javascript
// Verificar serviços
console.log('Serviços:', window.servicos);

// Verificar imagens carregadas
// (adicione no home.component.ts temporariamente)
```

### Adicione logs temporários no home.component.ts:

```typescript
carregarImagens() {
  this.imagemService.listarImagens().subscribe({
    next: (response) => {
      console.log('Imagens recebidas:', response);
      // ... resto do código
      console.log('Imagens mapeadas:', this.imagensByServico);
    },
    error: (err) => {
      console.error('Erro ao carregar imagens:', err);
    }
  });
}
```

---

## 📋 Checklist

- [ ] Backend rodando (`npm start` em `barbearia-backend`)
- [ ] Script executado (`npm run popular-imagens`)
- [ ] Imagens registradas no banco (verificar via API ou SQL)
- [ ] Arquivos físicos existem em `barbearia-backend/src/uploads/`
- [ ] URL da imagem funciona: `http://localhost:3000/api/imagens/5.png`
- [ ] Frontend rodando (`npm start` em `barbearia-frontend`)
- [ ] Cache do navegador limpo
- [ ] Sem erros no console do navegador

---

## 🐛 Problemas Comuns

### "Imagem não encontrada" (404)
- ✅ Verifique se o arquivo existe em `uploads/`
- ✅ Execute o script `popular-imagens` novamente
- ✅ Verifique se o nome do arquivo está correto (case-sensitive)

### "Acesso negado" (403)
- ✅ Faça login como admin primeiro
- ✅ Verifique se o token está sendo enviado

### Imagens não aparecem no frontend
- ✅ Verifique se `imagensByServico` está populado (console)
- ✅ Verifique se os IDs dos serviços correspondem aos `servico_id` das imagens
- ✅ Verifique a URL no Network tab do DevTools

### CORS Error
- ✅ Verifique se o backend tem CORS habilitado
- ✅ Verifique se a URL do backend está correta no `environment.ts`

---

## 💡 Mapeamento de Serviços

| Serviço ID | Nome | Arquivo |
|-----------|------|---------|
| 1 | Corte Feminino | 5.png |
| 2 | Coloração | 10.png |
| 3 | Luzes | 3.png |
| 4 | Hidratação | 8.png |
| 5 | Escova | 9.png |
| 6 | Maquiagem | 7.png |

**Importante:** Os IDs dos serviços no banco devem corresponder aos `servico_id` das imagens!

---

## ✅ Após seguir todos os passos

As imagens devem aparecer nos cards de serviços na página principal!

Se ainda não funcionar, verifique:
1. Console do navegador (F12)
2. Network tab para ver as requisições
3. Console do backend para ver erros


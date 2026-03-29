# 🪟 Setup Rápido - Windows

## 🚨 Problema: npm/node não reconhecido

Se você está vendo o erro:
```
npm : O termo 'npm' não foi reconhecido como nome de cmdlet...
```

**Solução em 3 passos:**

### Passo 1: Instalar Node.js

1. Vá para: https://nodejs.org
2. Clique no botão **LTS** (Recomendado para maioria)
3. Baixe e execute o instalador
4. **IMPORTANTE:** Deixe todas as opções marcadas durante a instalação

### Passo 2: Reiniciar o Computador

**Não pule este passo!** O Windows precisa reiniciar para atualizar o PATH.

### Passo 3: Verificar Instalação

1. Abra um **novo** PowerShell ou CMD
2. Execute:
   ```powershell
   node --version
   npm --version
   ```

Se mostrar as versões, está tudo pronto!

## 🚀 Rodar o Projeto

Agora que o Node.js está instalado:

```powershell
# 1. Clone o repositório (se ainda não fez)
git clone https://github.com/anabe-apereira/doc-tech-challenge.git
cd doc-tech-challenge

# 2. Instale dependências
npm install

# 3. Inicie o servidor
npm start
```

Abra seu navegador em: http://localhost:3000

## 🔧 Ainda com Problemas?

### PowerShell Execution Policy

Se der erro de Execution Policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Antivírus Bloqueando

Alguns antivírus bloqueiam o Node.js:
1. Adicione Node.js às exceções do seu antivírus
2. Ou desative temporariamente durante a instalação

###PATH do Windows

Se mesmo após reiniciar não funcionar:
1. Pesquise "Variáveis de Ambiente" no Windows
2. Clique em "Editar as variáveis de ambiente do sistema"
3. Em "Variáveis do sistema", encontre "Path"
4. Clique "Editar" e adicione:
   - `C:\Program Files\nodejs\`
   - `C:\Users\SEU_USUARIO\AppData\Roaming\npm`

## 📞 Ajuda

Se ainda assim não funcionar:
1. Verifique se instalou a versão correta (18.x ou superior)
2. Tente usar o PowerShell em vez do CMD
3. Reinicie o computador novamente

---

**Resumo:** Instale Node.js → Reinicie → Verifique com `node --version` → `npm install` → `npm start` 🚀

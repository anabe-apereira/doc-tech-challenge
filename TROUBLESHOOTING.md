# 🔧 Guia de Troubleshooting

## 🚨 Problemas Comuns e Soluções

### 1. Node.js/npm não encontrado

**Erro**: `npm : O termo 'npm' não foi reconhecido`

**Solução**:
1. Instale Node.js: https://nodejs.org (versão LTS)
2. Reinicie o computador
3. Verifique: `node --version` e `npm --version`

### 2. Erros de TypeScript no VS Code

**Erros**:
- `Cannot find module 'prism-react-renderer/themes/github'`
- `Cannot find module '@docusaurus/types'`
- `Cannot find name 'require'`

**Solução**:
```bash
npm install
npm run lint:fix
```

### 3. Erros ao rodar `npm start`

**Erro**: `Module not found: Can't resolve 'docusaurus'`

**Solução**:
```bash
npm install
npm start
```

### 4. Erros de build

**Erro**: `Failed to compile`

**Solução**:
```bash
npm run clear
npm install
npm run build
```

### 5. Problemas com portas

**Erro**: `Port 3000 is already in use`

**Solução**:
```bash
# Windows
npx kill-port 3000

# Ou use outra porta
PORT=3001 npm start
```

### 6. Problemas com Git

**Erro**: `git is not recognized`

**Solução**:
1. Instale Git: https://git-scm.com
2. Reinicie o terminal/VS Code
3. Verifique: `git --version`

### 7. Problemas com ESLint

**Erro**: Erros de lint no VS Code

**Solução**:
```bash
npm run lint:fix
```

### 8. Arquivos faltando

**Erro**: `ENOENT: no such file or directory`

**Solução**:
```bash
# Verifique se todos os arquivos existem
ls -la
# Se faltar algo, clone novamente:
git clone https://github.com/anabe-apereira/doc-tech-challenge.git
```

## 🔄 Comandos Úteis

### Verificação de Saúde do Projeto
```bash
# Verificar instalação do Node.js
node --version && npm --version

# Verificar dependências
npm list --depth=0

# Limpar e reinstalar
npm run clear
rm -rf node_modules package-lock.json
npm install
```

### Desenvolvimento
```bash
# Iniciar desenvolvimento
npm start

# Build para produção
npm run build

# Servir build localmente
npm run serve
```

### Debug
```bash
# Verbose output
npm start -- --verbose

# Limpar cache
npm cache clean --force
```

## 📱 Problemas Específicos do VS Code

### Extensões não instalando
1. Verifique se o VS Code está atualizado
2. Reinicie o VS Code
3. Tente instalar manualmente

### IntelliSense não funcionando
1. Pressione `Ctrl+Shift+P`
2. Digite "TypeScript: Restart TS Server"
3. Recarregue a janela

## 🌐 Problemas de Rede

### npm install lento
```bash
# Use npm mais rápido
npm config set registry https://registry.npmjs.org/

# Ou use yarn
npm install -g yarn
yarn install
```

### Proxy corporativo
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

## 🆘 Ajuda Adicional

### Logs Detalhados
```bash
# Logs do npm
npm start -- --loglevel verbose

# Logs do Docusaurus
npm run build -- --debug
```

### Verificar Ambiente
```bash
# Informações do sistema
npm config list
node -e "console.log(process.platform, process.arch)"
```

### Relatar Problemas
Se nenhum dos passos acima funcionar:
1. Capture o erro completo
2. Anote seu sistema operacional
3. Verifique as versões: `node --version`, `npm --version`
4. Abra uma issue no GitHub

---

**Lembre-se**: A maioria dos problemas é resolvida com `npm install` e `npm run lint:fix`! 🚀

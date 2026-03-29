# Guia para Colaboradores

## 🚀 Setup Rápido (5 minutos)

### 1️⃣ Pré-requisitos
```bash
# Verifique se tem Node.js 18+
node --version

# Se não tiver, instale: https://nodejs.org
# Ou use nvm: nvm install 18 && nvm use 18
```

### 2️⃣ Clone e Instale
```bash
git clone https://github.com/anabe-apereira/doc-tech-challenge.git
cd doc-tech-challenge
npm install
```

### 3️⃣ Comece a Editar
```bash
npm start
# Abra http://localhost:3000
```

## 📝 Como Editar a Documentação

### Criar Nova Página
1. Crie arquivo em `docs/pasta/nova-pagina.md`
2. Adicione frontmatter:
   ```yaml
   ---
   title: Título da Página
   sidebar_position: 1
   ---
   ```
3. Adicione ao `sidebars.js` se necessário

### Editar Página Existente
- Abra o arquivo `.md` desejado
- Edite o conteúdo
- Salve e veja as mudanças em tempo real no navegador

### Diagramas Mermaid
- Use o editor online: https://mermaid.live
- Copie o código para dentro dos blocos ````mermaid`

## 🎨 Dicas de Edição

### Formatação
- Use `##` para subtítulos (não `#`)
- Use `**negrito**` para ênfase
- Use `código` para termos técnicos
- Use tabelas para organizar informações

### Links Internos
```markdown
[Texto do link](./pasta/arquivo.md)
[Texto do link](#ancora-na-mesma-pagina)
```

### Imagens
```markdown
![Descrição](./imagens/nome-imagem.png)
```

## 🛠️ Comandos Úteis

```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build para produção
npm run serve      # Servir build localmente
npm run clear      # Limpar cache
```

## 📋 Estrutura de Pastas

```
docs/
├── intro.md              # Página inicial
├── projeto/              # Sobre o projeto
├── ddd/                  # Domain-Driven Design
├── fluxos/               # Fluxos de negócio
└── implementacao/        # Detalhes técnicos

src/css/
└── custom.css            # Estilos personalizados

static/
└── img/                  # Imagens estáticas
```

## 🐛 Problemas Comuns

### **Node.js não encontrado**
```bash
# Instale Node.js 18+
# Windows: Baixe do site oficial
# Mac: brew install node@18
# Linux: Use gerenciador de pacotes da distro
```

### **Porta 3000 ocupada**
```bash
# Mate o processo na porta 3000
npx kill-port 3000
# Ou use outra porta
PORT=3001 npm start
```

### **Build falha**
```bash
npm run clear
npm install
npm start
```

## 🔄 Fluxo de Trabalho Git

1. **Crie branch para sua mudança**
   ```bash
   git checkout -b feature/sua-mudanca
   ```

2. **Faça suas mudanças**
   - Edite os arquivos
   - Teste localmente com `npm start`
   - Commit com mensagem clara

3. **Push e Pull Request**
   ```bash
   git push origin feature/sua-mudanca
   # Abra PR no GitHub
   ```

## 📱 Extensões VS Code Recomendadas

Instale automaticamente ao abrir o projeto:
- **Markdown All in One**: Edição avançada
- **Mermaid Preview**: Visualizar diagramas
- **Prettier**: Formatação automática
- **GitLens**: Histórico de mudanças

## 🎯 Boas Práticas

### ✅ Faça
- Use linguagem clara e objetiva
- Mantenha consistência nos termos
- Teste links e diagramas
- Use mensagens de commit descritivas
- Revise suas mudanças antes de commitar

### ❌ Não Faça
- Use jargões sem explicar
- Deixe links quebrados
- Comita arquivos temporários
- Mude estrutura sem discussão
- Use termos em inglês sem necessidade

## 📞 Ajuda e Suporte

- **Discord**: Tech Challenge Architecture
- **Issues**: Abra no GitHub para bugs ou sugestões
- **Wiki**: Consulte documentação adicional

## 🏆 Contribuidores

Agradecemos sua contribuição! Cada melhoria ajuda o projeto a evoluir.

---

**Lembre-se**: A documentação é para todos. Mantenha-a acessível e clara! 🚀

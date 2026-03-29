# Tech Challenge - Documentação

Bem-vindo à documentação do projeto Tech Challenge - Sistema de Gestão de Oficina Mecânica!

## 🚀 Sobre o Projeto

Este projeto consiste no desenvolvimento de um **Sistema Integrado de Atendimento e Execução de Serviços** para uma oficina mecânica de médio porte, aplicando **Domain-Driven Design (DDD)** e garantindo boas práticas de **Qualidade de Software e Segurança**.

## 📋 Estrutura da Documentação

A documentação está organizada nas seguintes seções principais:

### 📖 [Visão Geral](./docs/intro)
- Descrição do projeto e objetivos
- Contexto do negócio
- Funcionalidades principais

### 🏗️ [Projeto](./docs/projeto)
- [Descrição do Desafio](./docs/projeto/descricao) - Problemas e necessidades
- [Proposta de Solução](./docs/projeto/proposta) - Arquitetura e abordagem
- [Requisitos Técnicos](./docs/projeto/requisitos) - Especificações técnicas

### 🎯 [Domain-Driven Design](./docs/ddd)
- [Visão Geral do Domínio](./docs/ddd/visao-geral) - Entidades e conceitos
- [Event Storming](./docs/ddd/event-storming) - Mapeamento de eventos
- [Diagramas DDD](./docs/ddd/diagramas) - Arquitetura e design
- [Linguagem Ubíqua](./docs/ddd/linguagem-ubiqua) - Vocabulário compartilhado

### 🔄 [Fluxos de Negócio](./docs/fluxos)
- [Ordem de Serviço](./docs/fluxos/ordem-servico) - Processo principal
- [Fluxo de Aprovação](./docs/fluxos/aprovacao) - Gestão de orçamentos
- [Gestão de Estoque](./docs/fluxos/estoque) - Controle de peças

### 🛠️ [Implementação](./docs/implementacao)
- API RESTful
- Segurança
- Testes
- Docker

## 🏭 Contexto do Negócio

Uma oficina mecânica de médio porte enfrenta desafios como:

- ❌ Erros na priorização dos atendimentos
- ❌ Falhas no controle de peças e insumos
- ❌ Dificuldade em acompanhar o status dos serviços
- ❌ Perda de histórico de clientes e veículos
- ❌ Ineficiência no fluxo de orçamentos e autorizações

## 💡 Solução Proposta

Sistema que permite:
- ✅ Acompanhamento em tempo real do andamento do serviço
- ✅ Autorização de reparos adicionais via aplicativo
- ✅ Gestão interna eficiente e segura
- ✅ Histórico completo e rastreável

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + TypeScript
- **Banco de Dados**: PostgreSQL
- **Arquitetura**: Monolito com camadas
- **API**: RESTful com OpenAPI/Swagger
- **Containerização**: Docker + Docker Compose
- **Testes**: Jest com 80%+ cobertura
- **Design**: Domain-Driven Design (DDD)

## 📊 Métricas de Sucesso

- 🎯 Redução de 50% no tempo de processamento de OS
- 🎯 Aumento de 30% na satisfação dos clientes
- 🎯 Redução de 40% em erros de orçamento
- 🎯 80%+ cobertura de testes nos domínios críticos

## 🚀 Como Rodar o Projeto

### 📋 Guia Rápido por Sistema Operacional

- **🪟 Windows**: Veja [SETUP-WINDOWS.md](./SETUP-WINDOWS.md) para instruções detalhadas
- **🍎 macOS/Linux**: Siga as instruções abaixo

### Pré-requisitos

- **Node.js** 18.0 ou superior ⚠️ **OBRIGATÓRIO**
- **npm** 8.0 ou superior (ou yarn 1.22+)
- **Git** para controle de versão

#### 🔧 Como Instalar Node.js

**Opção 1: Download Oficial (Recomendado)**
1. Acesse: https://nodejs.org
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador e siga as instruções
4. Reinicie seu computador após a instalação

**Opção 2: Usando Chocolatey (Windows)**
```bash
# Instale o Chocolatey primeiro (se não tiver)
# Depois execute:
choco install nodejs --version=18.19.0
```

**Opção 3: Usando NVM (Recomendado para Desenvolvedores)**
```bash
# Instale NVM para Windows: https://github.com/coreybutler/nvm-windows
# Depois execute no PowerShell:
nvm install 18
nvm use 18
```

#### ✅ Verificar Instalação

Após instalar, verifique no terminal (PowerShell/CMD/WSL):

```bash
node --version    # Deve mostrar: v18.x.x ou superior
npm --version     # Deve mostrar: 8.x.x ou superior
```

**Se os comandos acima não funcionarem, reinicie seu computador e tente novamente.**

### Instalação e Execução Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/anabe-apereira/doc-tech-challenge.git
   cd doc-tech-challenge
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou com yarn
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou com yarn
   yarn start
   ```

4. **Acesse a documentação**
   - Abra seu navegador e acesse: http://localhost:3000
   - A documentação estará disponível para edição e visualização em tempo real

### Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Servir build localmente
npm run serve

# Limpar cache e build
npm run clear

# Gerar IDs para headings
npm run write-heading-ids

# Gerar arquivos de tradução
npm run write-translations

# Personalizar componentes (opcional)
npm run swizzle
```

### Para Editores e Colaboradores

#### Configuração do VS Code (Recomendado)

Crie um arquivo `.vscode/settings.json` com:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "markdown.preview.fontSize": 14,
  "markdown.preview.lineHeight": 1.6
}
```

#### Extensões VS Code Sugeridas

- **Markdown All in One**: Para edição avançada de Markdown
- **Mermaid Preview**: Para visualizar diagramas
- **GitLens**: Para melhor visualização do Git
- **Prettier**: Para formatação de código

#### Editando Diagramas Mermaid

Os diagramas usam sintaxe Mermaid. Para editar:

1. Use o editor Mermaid Live: https://mermaid.live
2. Copie o código do diagrama do arquivo .md
3. Edite visualmente
4. Copie o código atualizado de volta para o arquivo

#### Adicionando Novas Páginas

1. Crie arquivo `.md` em `docs/` ou subdiretórios
2. Adicione ao `sidebars.js` para incluir na navegação
3. Use frontmatter para metadados:
   ```yaml
   ---
   title: Título da Página
   sidebar_position: 1
   ---
   ```

### Deploy Automático (GitHub Pages)

O projeto está configurado para deploy automático no GitHub Pages:

1. **Configure o repositório**:
   - Vá para Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages (ou main com `/docs`)

2. **Ative o GitHub Actions**:
   ```bash
   npm run build
   git add dist/
   git commit -m "Add build files"
   git push
   ```

3. **Deploy automático**:
   ```bash
   npm run deploy
   ```

### Troubleshooting Comum

#### 🚨 ERRO: "npm: O termo 'npm' não foi reconhecido"

Este é o erro mais comum e significa que **Node.js não está instalado** ou não está no PATH do sistema.

**SOLUÇÃO:**
1. **Instale Node.js** seguindo as instruções acima
2. **Reinicie seu computador** (importante!)
3. **Abra um novo terminal** e verifique:
   ```bash
   node --version
   npm --version
   ```

#### ⚠️ Erros de TypeScript/Lint (Antes de Instalar Dependências)

Se você vir erros como:
- `Cannot find module 'prism-react-renderer/themes/github'`
- `Cannot find module '@docusaurus/types'`
- `Cannot find name 'require'`

**Isso é normal antes de instalar as dependências!** Para resolver:

```bash
# 1. Instale as dependências
npm install

# 2. Se os erros persistirem, execute:
npm run lint:fix
```

#### Problemas com Node.js
```bash
# Verifique versão do Node.js
node --version  # Deve ser 18.0+

# Se necessário, use nvm
nvm install 18
nvm use 18
```

#### Problemas com Dependências
```bash
# Limpe cache do npm
npm cache clean --force

# Remova node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

#### Porta 3000 Ocupada
```bash
# Mude a porta no package.json ou use:
PORT=3001 npm start
```

### Contribuição

1. **Fork** o repositório
2. Crie uma **branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push** para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um **Pull Request**

---

## 🚀 Como Usar esta Documentação

### Para Desenvolvedores
1. Comece pela [Visão Geral do Domínio](./docs/ddd/visao-geral)
2. Estude os [Diagramas DDD](./docs/ddd/diagramas)
3. Entenda os [Fluxos de Negócio](./docs/fluxos)
4. Consulte os [Requisitos Técnicos](./docs/projeto/requisitos)

### Para Analistas de Negócio
1. Leia a [Descrição do Desafio](./docs/projeto/descricao)
2. Entenda o [Event Storming](./docs/ddd/event-storming)
3. Estude a [Linguagem Ubíqua](./docs/ddd/linguagem-ubiqua)
4. Analise os [Fluxos de Negócio](./docs/fluxos)

### Para Gestores
1. Visão geral na [Introdução](./docs/intro)
2. [Proposta de Solução](./docs/projeto/proposta)
3. Métricas e KPIs nos fluxos de negócio
4. Requisitos técnicos em [Requisitos](./docs/projeto/requisitos)

## 📝 Entregáveis do Projeto

### 📋 Documentação
- ✅ Diagramas DDD completos
- ✅ Event Storming dos fluxos
- ✅ Linguagem Ubíqua aplicada
- ✅ Especificações técnicas

### 💻 Código-Fonte
- ✅ APIs RESTful conforme requisitos
- ✅ Dockerfile e docker-compose
- ✅ README completo com instruções
- ✅ Testes automatizados

### 📊 Relatórios
- ✅ Análise de vulnerabilidades
- ✅ Documento de entrega em PDF
- ✅ Vídeo demonstrativo

## 🔗 Links Importantes

- [Repositório GitHub](https://github.com/anasb/doc-tech-challenge)
- [Documentação Online](https://anasb.github.io/doc-tech-challenge/)
- [API Documentation](https://anasb.github.io/doc-tech-challenge/api)
- [Diagrams Miro](https://miro.com/app/board/...) (link a ser adicionado)

## 📞 Contato

- **Discord**: Tech Challenge Architecture
- **Email**: tech-challenge@example.com
- **Repository**: https://github.com/anabe-apereira/doc-tech-challenge

## 🤝 Contribuição

Quer contribuir? Veja nosso [Guia para Colaboradores](./CONTRIBUTING.md)!

### 📋 Arquivos Importantes
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) - Guia completo para colaboradores
- [`SETUP-WINDOWS.md`](./SETUP-WINDOWS.md) - Guia específico para Windows
- [`requirements.txt`](./requirements.txt) - Requisitos e ferramentas necessárias
- [`.vscode/settings.json`](./.vscode/settings.json) - Configuração do VS Code
- [`.vscode/extensions.json`](./.vscode/extensions.json) - Extensões recomendadas

### 🚀 Setup Rápido
```bash
git clone https://github.com/anabe-apereira/doc-tech-challenge.git
cd doc-tech-challenge
npm install
npm start
# Abra http://localhost:3000
```

## 📄 Licença

Este projeto é desenvolvido como parte do Tech Challenge da disciplina de Software Architecture.

---

**Data de Entrega**: 05/05/2026
**Disciplina**: 15SOAT - Fase 1 - Tech Challenge
**Versão**: 1.0.0

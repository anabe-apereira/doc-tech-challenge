---
title: API RESTful
sidebar_position: 1
---

# API RESTful

## 🎯 Visão Geral

A API RESTful do sistema de gestão da oficina mecânica foi projetada seguindo as melhores práticas de arquitetura REST, com documentação OpenAPI 3.0, versionamento, autenticação JWT e tratamento robusto de erros.

## 🏗️ Arquitetura da API

### Estrutura Base

```
https://api.tech-challenge.com/v1/
├── auth/                    # Autenticação
├── clientes/               # Gestão de clientes
├── veiculos/               # Gestão de veículos
├── ordens-servico/         # Ordens de serviço
├── servicos/               # Catálogo de serviços
├── pecas/                  # Gestão de peças
├── estoque/                # Controle de estoque
├── orcamentos/             # Orçamentos
├── pagamentos/             # Pagamentos
├── usuarios/               # Usuários do sistema
└── relatorios/             # Relatórios e métricas
```

### Padrões de URL

| Padrão | Exemplo | Descrição |
|--------|---------|-----------|
| `GET /recurso` | `GET /clientes` | Listar todos os recursos |
| `GET /recurso/{id}` | `GET /clientes/123` | Obter recurso específico |
| `POST /recurso` | `POST /clientes` | Criar novo recurso |
| `PUT /recurso/{id}` | `PUT /clientes/123` | Atualizar recurso completo |
| `PATCH /recurso/{id}` | `PATCH /clientes/123` | Atualizar parcialmente |
| `DELETE /recurso/{id}` | `DELETE /clientes/123` | Remover recurso |
| `GET /recurso/{id}/sub-recurso` | `GET /clientes/123/veiculos` | Listar sub-recursos |

## 🔐 Autenticação e Autorização

### JWT Authentication

```javascript
// Login
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@oficina.com",
  "senha": "senha123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@oficina.com",
    "perfil": "MECANICO"
  }
}
```

### Headers de Autenticação

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-API-Version: v1
X-Request-ID: uuid-v4-generate-here
```

### Perfis de Acesso

| Perfil | Descrição | Permissões |
|--------|-----------|------------|
| **ADMIN** | Administrador do sistema | Acesso total a todos os recursos |
| **GERENTE** | Gerente da oficina | Gestão de OS, relatórios, equipe |
| **RECEPCIONISTA** | Atendimento ao cliente | Clientes, veículos, OS básicas |
| **MECANICO** | Técnico executor | Diagnóstico, execução de serviços |
| **ESTOQUISTA** | Gestão de estoque | Peças, movimentações, compras |
| **FINANCEIRO** | Contas a pagar/receber | Pagamentos, faturamento |

## 📋 Endpoints Principais

### 1. Autenticação

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@oficina.com",
  "senha": "senha123"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

### 2. Clientes

#### Listar Clientes
```http
GET /api/v1/clientes?page=1&limit=20&search=joao&status=ATIVO
Authorization: Bearer {token}
```

#### Criar Cliente
```http
POST /api/v1/clientes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "tipo": "PESSOA_FISICA",
  "cpfCnpj": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  },
  "observacoes": "Cliente preferencial"
}
```

#### Atualizar Cliente
```http
PUT /api/v1/clientes/123
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "telefone": "(11) 88888-8888",
  "observacoes": "Atualizado em 01/01/2024"
}
```

### 3. Veículos

#### Criar Veículo
```http
POST /api/v1/veiculos
Authorization: Bearer {token}
Content-Type: application/json

{
  "clienteId": 123,
  "placa": "ABC1D23",
  "marca": "Fiat",
  "modelo": "Strada",
  "ano": 2020,
  "cor": "Branca",
  "chassi": "9BWZZZ377VT004251",
  "categoria": "UTILITARIO_LEVE",
  "combustivel": "FLEX",
  "observacoes": "Veículo de trabalho"
}
```

#### Buscar Veículo por Placa
```http
GET /api/v1/veiculos?placa=ABC1D23
Authorization: Bearer {token}
```

### 4. Ordens de Serviço

#### Criar Ordem de Serviço
```http
POST /api/v1/ordens-servico
Authorization: Bearer {token}
Content-Type: application/json

{
  "clienteId": 123,
  "veiculoId": 456,
  "relatoInicial": "Barulho ao frear e carro puxando para direita",
  "quilometragem": 52340,
  "prioridade": "NORMAL",
  "observacoes": "Cliente precisa do carro para segunda-feira"
}
```

#### Listar Ordens de Serviço
```http
GET /api/v1/ordens-servico?status=EM_EXECUCAO&clienteId=123&dataInicio=2024-01-01&dataFim=2024-01-31
Authorization: Bearer {token}
```

#### Adicionar Serviço à OS
```http
POST /api/v1/ordens-servico/789/servicos
Authorization: Bearer {token}
Content-Type: application/json

{
  "descricao": "Troca de pastilhas de freio dianteiras",
  "valor": 180.00,
  "tempoEstimado": 60,
  "mecanicoId": 456,
  "pecas": [
    {
      "pecaId": 101,
      "quantidade": 1
    }
  ]
}
```

### 5. Orçamentos

#### Gerar Orçamento
```http
POST /api/v1/ordens-servico/789/orcamentos
Authorization: Bearer {token}
Content-Type: application/json

{
  "validadeDias": 7,
  "observacoes": "Orçamento válido por 7 dias",
  "itens": [
    {
      "tipo": "SERVICO",
      "descricao": "Troca de pastilhas de freio dianteiras",
      "valor": 180.00,
      "tempoEstimado": 60
    },
    {
      "tipo": "PECA",
      "pecaId": 101,
      "quantidade": 1,
      "valorUnitario": 240.00
    }
  ]
}
```

#### Aprovar Orçamento
```http
POST /api/v1/orcamentos/456/aprovar
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipoAprovacao": "PARCIAL",
  "itensAprovados": [1, 3],
  "itensRecusados": [2],
  "motivoRecusa": "Cliente vai fazer alinhamento em outro lugar",
  "usuario": "cliente@portal.com"
}
```

### 6. Estoque

#### Consultar Estoque
```http
GET /api/v1/estoque?pecaId=101&baixoEstoque=true
Authorization: Bearer {token}
```

#### Movimentação de Estoque
```http
POST /api/v1/estoque/movimentacoes
Authorization: Bearer {token}
Content-Type: application/json

{
  "pecaId": 101,
  "tipo": "ENTRADA",
  "quantidade": 10,
  "motivo": "Compra fornecedor AutoPeças",
  "fornecedorId": 501,
  "valorUnitario": 45.00,
  "numeroNota": "12345"
}
```

## 📊 Formatos de Resposta

### Padrão de Sucesso

```json
{
  "sucesso": true,
  "dados": {
    "id": 123,
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "mensagem": "Cliente criado com sucesso",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "uuid-v4"
}
```

### Paginação

```json
{
  "sucesso": true,
  "dados": [
    {"id": 1, "nome": "Cliente 1"},
    {"id": 2, "nome": "Cliente 2"}
  ],
  "paginacao": {
    "pagina": 1,
    "limite": 20,
    "total": 150,
    "totalPaginas": 8,
    "temProxima": true,
    "temAnterior": false
  }
}
```

### Erros

```json
{
  "sucesso": false,
  "erro": {
    "codigo": "VALIDACAO_FALHOU",
    "mensagem": "Dados de entrada inválidos",
    "detalhes": [
      {
        "campo": "cpfCnpj",
        "mensagem": "CPF inválido"
      },
      {
        "campo": "email",
        "mensagem": "E-mail já cadastrado"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "uuid-v4"
}
```

## 🚨 Códigos de Status HTTP

| Código | Significado | Quando Usar |
|--------|-------------|-------------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Requisição bem-sucedida sem conteúdo |
| `400` | Bad Request | Dados de entrada inválidos |
| `401` | Unauthorized | Não autenticado |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito de dados |
| `422` | Unprocessable Entity | Validação de negócio falhou |
| `429` | Too Many Requests | Rate limit excedido |
| `500` | Internal Server Error | Erro interno do servidor |

## 🔄 Webhooks

### Configuração de Webhooks

```http
POST /api/v1/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://sistema-cliente.com/webhooks",
  "eventos": [
    "OS_CRIADA",
    "ORCAMENTO_APROVADO",
    "SERVICO_CONCLUIDO",
    "PAGAMENTO_REGISTRADO"
  ],
  "segredo": "webhook-secret-key",
  "ativo": true
}
```

### Payload de Webhook

```json
{
  "evento": "ORCAMENTO_APROVADO",
  "data": "2024-01-15T14:30:00Z",
  "dados": {
    "ordemServicoId": 789,
    "numeroOS": "2024-000123",
    "clienteId": 123,
    "valorAprovado": 540.00,
    "itensAprovados": [1, 3]
  },
  "versao": "v1"
}
```

## 🧪 Testes da API

### Exemplo com Jest + Supertest

```javascript
describe('POST /api/v1/clientes', () => {
  test('deve criar cliente com sucesso', async () => {
    const clienteData = {
      nome: 'João Silva',
      cpfCnpj: '123.456.789-00',
      telefone: '(11) 99999-9999',
      email: 'joao@teste.com'
    };

    const response = await request(app)
      .post('/api/v1/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteData)
      .expect(201);

    expect(response.body.sucesso).toBe(true);
    expect(response.body.dados.nome).toBe(clienteData.nome);
    expect(response.body.dados.id).toBeDefined();
  });

  test('deve validar CPF inválido', async () => {
    const clienteData = {
      nome: 'João Silva',
      cpfCnpj: '123.456.789-01', // CPF inválido
      telefone: '(11) 99999-9999',
      email: 'joao@teste.com'
    };

    const response = await request(app)
      .post('/api/v1/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteData)
      .expect(400);

    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.codigo).toBe('VALIDACAO_FALHOU');
  });
});
```

## 📈 Rate Limiting

### Configuração

```javascript
const rateLimit = require('express-rate-limit');

// Limite geral da API
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // 1000 requisições por janela
  message: 'Muitas requisições. Tente novamente mais tarde.'
});

// Limite para endpoints críticos
const criticalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // 10 requisições por minuto
  message: 'Limite de requisições excedido para este endpoint.'
});

// Aplicação dos limites
app.use('/api/v1/', generalLimiter);
app.use('/api/v1/auth/login', criticalLimiter);
app.use('/api/v1/ordens-servico', criticalLimiter);
```

## 📊 Monitoramento e Logging

### Estrutura de Log

```javascript
// Middleware de logging
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id,
      requestId: req.headers['x-request-id']
    });
  });
  
  next();
};
```

### Métricas

```javascript
const prometheus = require('prom-client');

// Métricas HTTP
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware de métricas
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc();
  });
  
  next();
};
```

## 📖 Documentação Interativa

### Swagger UI

A documentação interativa da API está disponível em:
- **Produção**: https://api.tech-challenge.com/docs
- **Desenvolvimento**: http://localhost:3000/docs

### OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Tech Challenge API
  description: API do Sistema de Gestão de Oficina Mecânica
  version: 1.0.0
  contact:
    name: Tech Challenge Team
    email: tech-challenge@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.tech-challenge.com/v1
    description: Produção
  - url: http://localhost:3000/v1
    description: Desenvolvimento

security:
  - bearerAuth: []

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

paths:
  /clientes:
    get:
      summary: Listar clientes
      tags:
        - Clientes
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Lista de clientes
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClienteListResponse'
```

---

Esta API RESTful proporciona uma interface robusta, segura e bem documentada para o sistema de gestão da oficina mecânica, seguindo as melhores práticas de desenvolvimento de APIs.

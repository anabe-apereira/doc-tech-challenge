---
title: Requisitos Técnicos
sidebar_position: 3
---

# Requisitos Técnicos

## 🏗️ Arquitetura e Design

### Arquitetura Monolítica

O sistema deve ser implementado como um **back-end monolítico** utilizando **arquitetura em camadas**:

```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│  (REST API Controllers, DTOs)       │
├─────────────────────────────────────┤
│         Application Layer           │
│   (Use Cases, Application Services) │
├─────────────────────────────────────┤
│          Domain Layer               │
│  (Entities, Value Objects, Events)  │
├─────────────────────────────────────┤
│       Infrastructure Layer          │
│   (Repositories, External APIs)     │
└─────────────────────────────────────┘
```

### Princípios de Design

- **SOLID**: Aplicação dos 5 princípios fundamentais
- **Clean Architecture**: Dependências sempre apontando para o domínio
- **DDD**: Domain-Driven Design para modelagem de negócio
- **SOLID**: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion

## 💾 Banco de Dados

### Escolha e Justificativa

**PostgreSQL** será o banco de dados escolhido:

#### Vantagens Técnicas

| Característica | Benefício para o Projeto |
|----------------|--------------------------|
| **ACID Compliance** | Garantia de consistência em transações financeiras |
| **JSON Support** | Flexibilidade para campos não estruturados |
| **Index Avançado** | Performance em consultas complexas |
| **Maturidade** | Ecossistema robusto e documentação completa |
| **Escalabilidade** | Suporte a crescimento horizontal |

#### Schema Básico

```sql
-- Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Veículos
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    placa VARCHAR(10) UNIQUE NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    ano INTEGER NOT NULL,
    cor VARCHAR(50),
    chassi VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ordens de Serviço
CREATE TABLE ordens_servico (
    id SERIAL PRIMARY KEY,
    numero_os VARCHAR(20) UNIQUE NOT NULL,
    cliente_id INTEGER REFERENCES clientes(id),
    veiculo_id INTEGER REFERENCES veiculos(id),
    status VARCHAR(50) NOT NULL,
    quilometragem INTEGER,
    relato_inicial TEXT,
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 API RESTful

### Padrões e Convenções

#### URL Structure

```
https://api.tech-challenge.com/v1/{resource}
```

#### HTTP Methods

| Método | Operação | Exemplo |
|--------|----------|---------|
| `GET` | Listar/Obter | `GET /ordens-servico` |
| `POST` | Criar | `POST /ordens-servico` |
| `PUT` | Atualizar completo | `PUT /ordens-servico/{id}` |
| `PATCH` | Atualizar parcial | `PATCH /ordens-servico/{id}/status` |
| `DELETE` | Remover | `DELETE /clientes/{id}` |

#### Status Codes

| Código | Significado | Quando Usar |
|--------|-------------|-------------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos |
| `401` | Unauthorized | Não autenticado |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito de dados |
| `500` | Internal Error | Erro do servidor |

### Endpoints Principais

#### Ordens de Serviço

```yaml
# Criar OS
POST /api/v1/ordens-servico
Content-Type: application/json
{
  "clienteId": 1,
  "veiculoId": 1,
  "relatoInicial": "Barulho ao frear",
  "quilometragem": 50000
}

# Listar OS
GET /api/v1/ordens-servico?status=EM_EXECUCAO&clienteId=1

# Detalhar OS
GET /api/v1/ordens-servico/{id}

# Atualizar Status
PATCH /api/v1/ordens-servico/{id}/status
{
  "status": "EM_EXECUCAO",
  "observacao": "Iniciado serviço de freios"
}
```

#### Clientes

```yaml
# Criar Cliente
POST /api/v1/clientes
{
  "nome": "João Silva",
  "cpfCnpj": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "endereco": "Rua A, 123"
}

# Buscar por CPF
GET /api/v1/clientes?cpf=123.456.789-00
```

## 🔐 Segurança

### Autenticação JWT

#### Implementação

```javascript
// JWT Service
class JWTService {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
      issuer: 'tech-challenge-api'
    });
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
```

#### Middleware de Proteção

```javascript
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
```

### Validação de Dados

#### CPF/CNPJ

```javascript
const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica tamanho
  if (cleanCPF.length !== 11) return false;
  
  // Algoritmo de validação do CPF
  // ... implementação completa
  
  return true;
};
```

#### Placa de Veículo (Mercosul)

```javascript
const validatePlaca = (placa) => {
  const mercosulPattern = /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/;
  const antigoPattern = /^[A-Z]{3}\d{4}$/;
  
  return mercosulPattern.test(placa) || antigoPattern.test(placa);
};
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições
  message: 'Muitas requisições, tente novamente mais tarde'
});

app.use('/api/', limiter);
```

## 🧪 Testes Automatizados

### Estratégia de Testes

#### Cobertura Exigida: 80% nos Domínios Críticos

```javascript
// Teste de Domínio - Exemplo
describe('OrdemServico', () => {
  test('deve criar OS com dados válidos', () => {
    const ordemServico = new OrdemServico({
      clienteId: 1,
      veiculoId: 1,
      relatoInicial: 'Barulho ao frear'
    });

    expect(ordemServico.status).toBe('ABERTA');
    expect(ordemServico.numeroOS).toBeDefined();
  });

  test('não deve permitir OS sem cliente', () => {
    expect(() => {
      new OrdemServico({ clienteId: null });
    }).toThrow('Cliente é obrigatório');
  });
});
```

#### Testes de Integração (API)

```javascript
describe('POST /api/v1/ordens-servico', () => {
  test('deve criar OS com sucesso', async () => {
    const response = await request(app)
      .post('/api/v1/ordens-servico')
      .set('Authorization', `Bearer ${token}`)
      .send({
        clienteId: 1,
        veiculoId: 1,
        relatoInicial: 'Teste'
      });

    expect(response.status).toBe(201);
    expect(response.body.numeroOS).toBeDefined();
  });
});
```

### Configuração do Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75
    },
    './src/domain/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

## 🐳 Docker e Containerização

### Dockerfile Otimizado

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://techuser:techpass@db:5432/techdb
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=techdb
      - POSTGRES_USER=techuser
      - POSTGRES_PASSWORD=techpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U techuser -d techdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 📊 Monitoramento e Logging

### Estrutura de Logs

```javascript
// Winston Logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware de logging
const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
};
```

### Métricas de Saúde

```javascript
// Health Check Endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      memory: checkMemory()
    }
  };

  const isHealthy = Object.values(health.checks)
    .every(check => check.status === 'ok');

  res.status(isHealthy ? 200 : 503).json(health);
});
```

## 📋 Configuração Local

### Variáveis de Ambiente

```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://techuser:techpass@localhost:5432/techdb

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Redis
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Scripts de Desenvolvimento

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node scripts/seed.ts",
    "docker:build": "docker build -t tech-challenge .",
    "docker:run": "docker-compose up -d"
  }
}
```

## 📝 Entregáveis Obrigatórios

### 1. **Código-Fonte**
- ✅ APIs RESTful conforme requisitos
- ✅ Dockerfile otimizado
- ✅ docker-compose.yml funcional
- ✅ README.md completo

### 2. **Documentação**
- ✅ Swagger/OpenAPI specification
- ✅ Diagramas de arquitetura
- ✅ Guia de instalação e uso

### 3. **Qualidade**
- ✅ Testes com 80%+ cobertura
- ✅ Análise de vulnerabilidades
- ✅ Code review e linting

### 4. **Deploy**
- ✅ Imagem Docker funcional
- ✅ Configuração para produção
- ✅ Health checks implementados

---

Estes requisitos técnicos garantem uma base sólida, escalável e segura para o MVP do sistema de gestão da oficina mecânica.

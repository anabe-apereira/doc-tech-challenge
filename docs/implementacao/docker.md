---
title: Docker
sidebar_position: 4
---

# Docker e Containerização

## 🐳 Dockerfile

### Multi-stage Build Otimizado
```dockerfile
# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production Stage
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

## 📦 Docker Compose

### Ambiente Completo
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
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

## 🔧 Scripts Docker

### Build e Deploy
```bash
#!/bin/bash
# build.sh

# Build da imagem
docker build -t tech-challenge:latest .

# Tag para produção
docker tag tech-challenge:latest registry.example.com/tech-challenge:latest

# Push para registry
docker push registry.example.com/tech-challenge:latest
```

### Ambiente de Desenvolvimento
```bash
#!/bin/bash
# dev.sh

# Inicia ambiente completo
docker-compose up -d

# Aguarda banco estar pronto
docker-compose exec db pg_isready -U techuser -d techdb

# Executa migrações
docker-compose exec app npm run migrate

# Mostra logs
docker-compose logs -f app
```

## 🌐 Multi-ambiente

### Desenvolvimento
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      target: builder
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

### Produção
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: tech-challenge:latest
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## 📊 Monitoramento

### Health Checks
```javascript
// health.js
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

### Logs
```yaml
# docker-compose.yml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 🚀 CI/CD Integration

### GitHub Actions
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t tech-challenge .
      - name: Run tests
        run: docker run tech-challenge npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Boas Práticas

1. **Imagens Leves**: Multi-stage builds
2. **Segurança**: Non-root users
3. **Health Checks**: Monitoramento de saúde
4. **Resource Limits**: Controle de recursos
5. **Secrets Management**: Variáveis de ambiente
6. **Logging**: Logs estruturados

## 📋 Comandos Úteis

```bash
# Build
docker build -t tech-challenge .

# Run
docker run -p 3000:3000 tech-challenge

# Compose
docker-compose up -d
docker-compose logs -f
docker-compose down

# Limpeza
docker system prune -a
docker volume prune
```

---

*Esta seção será detalhada com configurações avançadas e melhores práticas.*

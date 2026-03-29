---
title: Testes
sidebar_position: 3
---

# Testes

## 🧪 Estratégia de Testes

### Pirâmide de Testes

```
        /\
       /  \
      / E2E \  ← 10% (Testes de integração)
     /______\
    /        \
   /Unitários \  ← 70% (Lógica de domínio)
  /__________\
 /            \
/Integração   \ ← 20% (APIs, Database)
/______________/
```

## 📋 Cobertura Exigida

| Tipo | Cobertura Mínima |
|------|-----------------|
| **Domínio** | 90% |
| **Aplicação** | 80% |
| **Infraestrutura** | 70% |
| **APIs** | 85% |

## 🧪 Testes Unitários

### Testes de Domínio
```javascript
describe('OrdemServico', () => {
  test('deve criar OS com dados válidos', () => {
    const ordemServico = new OrdemServico({
      clienteId: 1,
      veiculoId: 1,
      relatoInicial: 'Teste'
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

### Testes de Serviços
```javascript
describe('OrdemServicoService', () => {
  test('deve aprovar orçamento com sucesso', async () => {
    const service = new OrdemServicoService();
    const result = await service.aprovarOrcamento(1, {
      itensAprovados: [1, 2],
      usuario: 'test'
    });

    expect(result.status).toBe('APROVADA');
  });
});
```

## 🔗 Testes de Integração

### APIs
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

### Database
```javascript
describe('OrdemServicoRepository', () => {
  test('deve salvar e recuperar OS', async () => {
    const repository = new OrdemServicoRepository();
    const os = new OrdemServico({ clienteId: 1 });
    
    const saved = await repository.salvar(os);
    const found = await repository.buscarPorId(saved.id);
    
    expect(found.id).toBe(saved.id);
  });
});
```

## 🌐 Testes E2E

### Fluxos Críticos
```javascript
describe('Fluxo completo de OS', () => {
  test('deve criar, aprovar e executar OS', async () => {
    // 1. Criar OS
    const response = await criarOS();
    
    // 2. Gerar orçamento
    const orcamento = await gerarOrcamento(response.id);
    
    // 3. Aprovar orçamento
    await aprovarOrcamento(orcamento.id);
    
    // 4. Executar serviços
    await executarServicos(response.id);
    
    // 5. Verificar status final
    const osFinal = await buscarOS(response.id);
    expect(osFinal.status).toBe('FECHADA');
  });
});
```

## 🛠️ Ferramentas

### Jest
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
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

### Supertest
```javascript
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('GET /health', async () => {
    await request(app)
      .get('/health')
      .expect(200);
  });
});
```

## 📊 Relatórios

### Coverage
- HTML reports
- JSON para CI/CD
- Threshold enforcement

### Test Results
- JUnit XML
- Allure reports
- Integração com GitHub Actions

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
- name: Run Tests
  run: |
    npm test
    npm run test:coverage
    
- name: Upload Coverage
  uses: codecov/codecov-action@v1
```

## 🎯 Boas Práticas

1. **Test First**: Escrever testes antes do código
2. **AAA Pattern**: Arrange, Act, Assert
3. **Testes Independentes**: Sem dependências entre testes
4. **Nomenclatura Clara**: Descrição do que está sendo testado
5. **Mock External Dependencies**: Isolar o código

---

*Esta seção será expandida com exemplos práticos e configurações detalhadas.*

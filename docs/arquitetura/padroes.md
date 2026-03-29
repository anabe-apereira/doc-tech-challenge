---
title: Padrões Aplicados
sidebar_position: 3
---

# Padrões de Design Aplicados

## 🎯 Padrões de Projeto (Design Patterns)

### 1. Repository Pattern
**Objetivo**: Abstrair o acesso a dados

```javascript
class OrdemServicoRepository {
  async salvar(ordemServico) { }
  async buscarPorId(id) { }
  async listarPorCliente(clienteId) { }
}
```

### 2. Factory Pattern
**Objetivo**: Criar objetos complexos

```javascript
class OrdemServicoFactory {
  static criar(dados) {
    return new OrdemServico({
      numero: this.gerarNumero(),
      ...dados
    });
  }
}
```

### 3. Observer Pattern
**Objetivo**: Notificar mudanças de estado

```javascript
class OrdemServico {
  adicionarObservador(observer) {
    this.observers.push(observer);
  }
  
  notificarMudanca(evento) {
    this.observers.forEach(o => o.update(evento));
  }
}
```

### 4. Strategy Pattern
**Objetivo**: Algoritmos intercambiáveis

```javascript
class CalculadoraOrcamento {
  constructor(estrategia) {
    this.estrategia = estrategia;
  }
  
  calcular(servicos) {
    return this.estrategia.calcular(servicos);
  }
}
```

## 🏗️ Padrões Arquiteturais

### 1. Clean Architecture
- Dependências apontando para dentro
- Camadas bem definidas
- Testabilidade

### 2. Domain-Driven Design
- Bounded Contexts
- Aggregates
- Domain Events

### 3. CQRS (Command Query Responsibility Segregation)
- Separação de leitura e escrita
- Otimização de performance

## 🔧 Padrões de Código

### 1. SOLID
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### 2. DRY (Don't Repeat Yourself)
- Reutilização de código
- Funções utilitárias
- Componentes genéricos

### 3. KISS (Keep It Simple, Stupid)
- Simplicidade na implementação
- Evitar over-engineering
- Clareza no código

---

*Esta seção será expandida com exemplos práticos e melhores práticas.*

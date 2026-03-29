---
title: Visão Geral do Domínio
sidebar_position: 1
---

# Visão Geral do Domínio

## 🏭 Contexto de Negócio

Uma **oficina mecânica de médio porte** opera em um ambiente complexo com múltiplos atores, processos interconectados e regras de negócio específicas. O coração da operação é a **Ordem de Serviço (OS)**, que orquestra todo o fluxo desde a entrada do veículo até sua entrega.

## 👥 Atores do Domínio

### Principais Envolvidos

| Ator | Responsabilidades | Interações |
|------|-------------------|------------|
| **Cliente** | Levar veículo, relatar problemas, aprovar orçamentos, pagar | Interface principal do negócio |
| **Recepcionista** | Cadastrar clientes/veículos, abrir OS, comunicar-se | Ponte entre cliente e equipe técnica |
| **Mecânico** | Diagnosticar, executar serviços, registrar consumos | Executor técnico principal |
| **Estoquista** | Controlar peças, registrar movimentações | Garante disponibilidade de insumos |
| **Financeiro** | Controlar pagamentos, faturamento | Gestão financeira |
| **Gestor** | Aprovar exceções, analisar indicadores | Tomada de decisões estratégicas |

## 🎯 Entidades Principais do Domínio

### 1. Ordem de Serviço (OS)

**Agregado Raiz** do sistema - orquestradora de todo o processo.

```mermaid
classDiagram
    class OrdemServico {
        +String numeroOS
        +Status status
        +DateTime dataEntrada
        +String relatoInicial
        +Integer quilometragem
        +Cliente cliente
        +Veiculo veiculo
        +List~ItemServico~ itensServico
        +Orcamento orcamento
        +abrir()
        +adicionarServico()
        +gerarOrcamento()
        +aprovarOrcamento()
        +iniciarExecucao()
        +finalizar()
    }
    
    class Status {
        <<enumeration>>
        ABERTA
        EM_DIAGNOSTICO
        ORCAMENTO_PENDENTE
        AGUARDANDO_APROVACAO
        APROVADA
        PARCIALMENTE_APROVADA
        EM_EXECUCAO
        CONCLUIDA_TECNICAMENTE
        AGUARDANDO_PAGAMENTO
        FECHADA
        CANCELADA
    }
    
    OrdemServico --> Status
```

### 2. Cliente

Entidade que representa o consumidor dos serviços.

```mermaid
classDiagram
    class Cliente {
        +String nome
        +String cpfCnpj
        +String telefone
        +String email
        +Endereco endereco
        +List~Veiculo~ veiculos
        +List~OrdemServico~ historicoOS
        +validarDocumento()
        +adicionarVeiculo()
        +verificarInadimplencia()
    }
    
    class TipoCliente {
        <<enumeration>>
        PESSOA_FISICA
        PESSOA_JURIDICA
    }
    
    Cliente --> TipoCliente
```

### 3. Veículo

Entidade que representa os veículos atendidos pela oficina.

```mermaid
classDiagram
    class Veiculo {
        +String placa
        +String marca
        +String modelo
        +Integer ano
        +String cor
        +String chassi
        +Integer quilometragemAtual
        +List~OrdemServico~ historicoServicos
        +validarPlaca()
        +atualizarQuilometragem()
        +verificarGarantia()
    }
    
    class CategoriaVeiculo {
        <<enumeration>>
        CARRO_PASSEIO
        UTILITARIO_LEVE
        MOTO
        CAMINHAO_LEVE
    }
    
    Veiculo --> CategoriaVeiculo
```

### 4. Item de Serviço

Representa cada serviço específico dentro de uma OS.

```mermaid
classDiagram
    class ItemServico {
        +String descricao
        +StatusItem status
        +Decimal valor
        +Integer tempoEstimado
        +Mecanico responsavel
        +List~ItemPeca~ pecasUtilizadas
        +DateTime dataInicio
        +DateTime dataFim
        +iniciar()
        +pausar()
        +concluir()
        +adicionarPeca()
    }
    
    class StatusItem {
        <<enumeration>>
        PENDENTE
        ORCADO
        APROVADO
        RECUSADO
        EM_EXECUCAO
        CONCLUIDO
        CANCELADO
    }
    
    ItemServico --> StatusItem
```

### 5. Peça e Estoque

Controle de peças e movimentações de estoque.

```mermaid
classDiagram
    class Peca {
        +String nome
        +String codigo
        +Decimal valorUnitario
        +Integer estoqueAtual
        +Integer estoqueMinimo
        +String fornecedor
        +verificarDisponibilidade()
        +reservar()
        +baixarEstoque()
        +reporEstoque()
    }
    
    class MovimentacaoEstoque {
        +TipoMovimentacao tipo
        +Integer quantidade
        +String motivo
        +OrdemServico ordemServico
        +DateTime dataMovimentacao
    }
    
    class TipoMovimentacao {
        <<enumeration>>
        ENTRADA
        SAIDA
        RESERVA
        DEVOLUCAO
        AJUSTE
    }
    
    Peca --> MovimentacaoEstoque
    MovimentacaoEstoque --> TipoMovimentacao
```

## 🔄 Relacionamentos Entre Entidades

```mermaid
erDiagram
    CLIENTE ||--o{ VEICULO : possui
    VEICULO ||--o{ ORDEM_SERVICO : gera
    ORDEM_SERVICO ||--o{ ITEM_SERVICO : contem
    ORDEM_SERVICO ||--o{ ORCAMENTO : possui
    ITEM_SERVICO ||--o{ ITEM_PECA : consome
    PECA ||--o{ ITEM_PECA : compoe
    ORDEM_SERVICO ||--o{ MOVIMENTACAO_ESTOQUE : gera
    ORDEM_SERVICO ||--o{ PAGAMENTO : recebe
    ORDEM_SERVICO ||--o{ CHECKLIST_FINAL : possui
    ORDEM_SERVICO ||--o{ HISTORICO_EVENTO : registra
    
    MECANICO ||--o{ ITEM_SERVICO : executa
    CLIENTE ||--o{ PAGAMENTO : realiza
```

## 🎯 Bounded Contexts

### Contexto de Atendimento

**Responsabilidade**: Gestão do processo principal de atendimento

- **Core**: Ordem de Serviço, Cliente, Veículo
- **Supporting**: Agendamento, Comunicação
- **Generic**: Notificações, Logging

### Contexto de Estoque

**Responsabilidade**: Gestão de peças e insumos

- **Core**: Peça, Movimentação de Estoque
- **Supporting**: Fornecedor, Compras
- **Generic**: Relatórios de Estoque

### Contexto Financeiro

**Responsabilidade**: Gestão financeira do negócio

- **Core**: Pagamento, Faturamento
- **Supporting**: Orçamento, Cobrança
- **Generic**: Relatórios Financeiros

## 🌊 Domain Events

### Eventos Principais

```mermaid
flowchart TD
    A[OS Aberta] --> B[OS em Diagnóstico]
    B --> C[Orçamento Gerado]
    C --> D{Cliente Aprova?}
    D -->|Sim| E[Orçamento Aprovado]
    D -->|Parcial| F[Orçamento Parcialmente Aprovado]
    D -->|Não| G[Orçamento Recusado]
    E --> H[Serviços Iniciados]
    F --> H
    H --> I[Peças Reservadas]
    I --> J[Peças Consumidas]
    J --> K[Serviço Concluído]
    K --> L[Pagamento Registrado]
    L --> M[OS Fechada]
    G --> N[OS Encerrada sem Execução]
```

### Eventos de Domínio

| Evento | Quando Ocorre | Impacto |
|--------|---------------|---------|
| `OSCriada` | Nova OS é aberta | Inicia fluxo de atendimento |
| `DiagnosticoConcluido` | Técnico finaliza diagnóstico | Dispara geração de orçamento |
| `OrcamentoGerado` | Orçamento criado | Notifica cliente para aprovação |
| `OrcamentoAprovado` | Cliente aprova orçamento | Libera execução e reserva peças |
| `ServicoIniciado` | Serviço começa a ser executado | Registra início e aloca recursos |
| `PecaConsumida` | Peça é baixada do estoque | Atualiza controle de estoque |
| `ServicoConcluido` | Serviço é finalizado | Atualiza status da OS |
| `PagamentoRegistrado` | Pagamento é confirmado | Libera entrega do veículo |
| `OSFechada` | Processo é concluído | Gera histórico e métricas |

## 📋 Value Objects

### Documento (CPF/CNPJ)

```javascript
class Documento {
  constructor(valor) {
    if (!this.validar(valor)) {
      throw new Error('Documento inválido');
    }
    this.valor = this.limpar(valor);
    this.tipo = this.definirTipo(valor);
  }

  validar(documento) {
    const limpo = this.limpar(documento);
    return this.validarCPF(limpo) || this.validarCNPJ(limpo);
  }

  limpar(documento) {
    return documento.replace(/\D/g, '');
  }

  definirTipo(documento) {
    return this.limpar(documento).length === 11 ? 'CPF' : 'CNPJ';
  }
}
```

### Placa Veículo

```javascript
class Placa {
  constructor(valor) {
    if (!this.validar(valor)) {
      throw new Error('Placa inválida');
    }
    this.valor = this.formatar(valor);
  }

  validar(placa) {
    const mercosul = /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/;
    const antigo = /^[A-Z]{3}\d{4}$/;
    return mercosul.test(placa) || antigo.test(placa);
  }

  formatar(placa) {
    return placa.toUpperCase().replace(/\s/g, '');
  }
}
```

### Dinheiro

```javascript
class Dinheiro {
  constructor(valor) {
    this.valor = Math.round(valor * 100); // Convertido para centavos
  }

  adicionar(outro) {
    return new Dinheiro((this.valor + outro.valor) / 100);
  }

  multiplicar(fator) {
    return new Dinheiro((this.valor * fator) / 100);
  }

  formatar() {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.valor / 100);
  }
}
```

## 🎯 Aggregates e Consistência

### Aggregate Root: OrdemServico

Garante a consistência de todas as operações relacionadas a uma OS:

```javascript
class OrdemServico {
  aprovarOrcamento(itensAprovados, usuario) {
    // Regra: Não pode aprovar itens já recusados
    itensAprovados.forEach(item => {
      if (item.status === StatusItem.RECUSADO) {
        throw new Error('Item já foi recusado anteriormente');
      }
    });

    // Atualiza status dos itens
    this.itensServico.forEach(item => {
      const aprovado = itensAprovados.find(i => i.id === item.id);
      item.status = aprovado ? StatusItem.APROVADO : StatusItem.RECUSADO;
    });

    // Define status da OS
    const itensAprovadosCount = this.itensServico
      .filter(item => item.status === StatusItem.APROVADO).length;
    
    if (itensAprovadosCount === this.itensServico.length) {
      this.status = Status.APROVADA;
    } else if (itensAprovadosCount > 0) {
      this.status = Status.PARCIALMENTE_APROVADA;
    } else {
      this.status = Status.RECUSADA;
    }

    // Domain Event
    this.addDomainEvent(new OrcamentoAprovadoEvent(
      this.id,
      itensAprovados,
      new Date(),
      usuario
    ));
  }
}
```

## 🔄 Repositories (Interfaces)

```javascript
// Interface do Repository
class OrdemServicoRepository {
  async salvar(ordemServico) {
    throw new Error('Método não implementado');
  }

  async buscarPorId(id) {
    throw new Error('Método não implementado');
  }

  async buscarPorNumeroOS(numeroOS) {
    throw new Error('Método não implementado');
  }

  async listarPorCliente(clienteId) {
    throw new Error('Método não implementado');
  }

  async listarPorStatus(status) {
    throw new Error('Método não implementado');
  }
}
```

## 📊 Métricas do Domínio

### Indicadores de Negócio

- **Tempo Médio de Atendimento**: Duração total do processo
- **Taxa de Aprovação**: Percentual de orçamentos aprovados
- **Valor Médio por OS**: Indicador financeiro
- **Rotatividade de Peças**: Movimentação de estoque
- **Satisfação do Cliente**: Feedback pós-serviço

### KPIs Operacionais

- **OS por Dia/Mês**: Volume de atendimentos
- **Ocupação dos Mecânicos**: Utilização da capacidade
- **Giro de Estoque**: Eficiência de gestão
- **Tempo de Diagnóstico**: Agilidade técnica

---

Esta visão geral do domínio estabelece as bases para a modelagem detalhada e implementação do sistema, garantindo que a solução tecnológica reflita fielmente as complexidades e necessidades do negócio de oficina mecânica.

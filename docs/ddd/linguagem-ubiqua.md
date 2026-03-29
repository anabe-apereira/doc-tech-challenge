---
title: Linguagem Ubíqua
sidebar_position: 4
---

# Linguagem Ubíqua

## 🎯 O que é Linguagem Ubíqua?

A **Linguagem Ubíqua** é um conceito fundamental do Domain-Driven Design que estabelece uma linguagem comum, compartilhada por toda a equipe (desenvolvedores, especialistas de domínio, stakeholders), para descrever o sistema de forma consistente e precisa.

## 🏭 Vocabulário do Domínio da Oficina Mecânica

### Termos Principais

| Termo | Definição | Contexto | Sinônimos a Evitar |
|-------|-----------|----------|-------------------|
| **Ordem de Serviço (OS)** | Documento que formaliza o atendimento de um veículo | Atendimento | Ticket, Requisição, Chamado |
| **Diagnóstico** | Avaliação técnica para identificar problemas | Técnico | Análise, Verificação, Inspeção |
| **Orçamento** | Proposta de serviços e valores para cliente | Financeiro | Cotação, Proposta, Preço |
| **Aprovação** | Consentimento do cliente para executar serviços | Atendimento | Autorização, Confirmação, Aceite |
| **Execução** | Realização dos serviços aprovados | Técnico | Desenvolvimento, Realização, Trabalho |
| **Peça** | Componente utilizado na reparação | Estoque | Item, Componente, Material |
| **Estoque** | Conjunto de peças disponíveis | Estoque | Inventário, Armazém, Depósito |
| **Cliente** | Pessoa que solicita os serviços | Atendimento | Consumidor, Usuário, Paciente |
| **Veículo** | Objeto do atendimento | Atendimento | Carro, Automóvel, Unidade |
| **Mecânico** | Profissional que executa os serviços | Técnico | Técnico, Profissional, Executor |

### Verbos de Negócio

| Verbo | Significado | Exemplo de Uso |
|-------|-------------|----------------|
| **Abrir OS** | Iniciar formalmente o atendimento | "Vamos abrir OS para o cliente" |
| **Diagnosticar** | Identificar problemas no veículo | "O mecânico vai diagnosticar o problema" |
| **Orçar** | Calcular valores dos serviços | "Precisamos orçar a troca de freios" |
| **Aprovar** | Consentir com os serviços propostos | "O cliente aprovou o orçamento" |
| **Executar** | Realizar os serviços aprovados | "Vamos executar os serviços aprovados" |
| **Concluir** | Finalizar um serviço específico | "O serviço foi concluído com sucesso" |
| **Baixar** | Remover peça do estoque | "Vamos baixar a peça no estoque" |
| **Faturar** | Gerar cobrança dos serviços | "Vamos faturar a OS do cliente" |
| **Entregar** | Devolver veículo ao cliente | "O veículo está pronto para entrega" |
| **Fechar** | Encerrar a OS formalmente | "Vamos fechar a OS após pagamento" |

## 📋 Glossário Detalhado

### A

**Aguardando Aprovação**
- **Definição**: Status da OS quando o orçamento foi enviado ao cliente e aguarda resposta
- **Contexto**: Fluxo de aprovação
- **Regras**: Tempo limite de 7 dias para resposta

**Aguardando Peça**
- **Definição**: Status quando serviço está parado por falta de peça em estoque
- **Contexto**: Execução de serviços
- **Ação**: Notificar compras e cliente

**Aprovação Parcial**
- **Definição**: Cliente aprova apenas parte dos serviços orçados
- **Contexto**: Fluxo de aprovação
- **Impacto**: Executar apenas itens aprovados, manter recusados no histórico

### C

**Checklist Final**
- **Definição**: Verificação obrigatória antes da entrega do veículo
- **Contexto**: Finalização
- **Itens**: Serviços concluídos, peças instaladas, sem pendências, teste final

**Cliente**
- **Definição**: Pessoa física ou jurídica que solicita serviços
- **Contexto**: Atendimento
- **Dados obrigatórios**: Nome, CPF/CNPJ, telefone, e-mail, endereço

### D

**Diagnóstico**
- **Definição**: Avaliação técnica para identificar problemas e necessidades
- **Contexto**: Técnico
- **Resultado**: Lista de serviços necessários e peças requeridas

### E

**Encerrada sem Execução**
- **Definição**: Status final quando orçamento é recusado ou expira
- **Contexto**: Fluxo de não aprovação
- **Regra**: Manter histórico completo, permitir cobrança de diagnóstico

**Estoque**
- **Definição**: Conjunto de peças e insumos disponíveis para uso
- **Contexto**: Estoque
- **Controle**: Quantidade, valor, localização, fornecedor

**Execução**
- **Definição**: Fase de realização dos serviços aprovados
- **Contexto**: Técnico
- **Regra**: Só pode iniciar após aprovação formal

### F

**Faturamento**
- **Definição**: Processo de gerar cobrança dos serviços executados
- **Contexto**: Financeiro
- **Momento**: Após conclusão de todos os serviços

### M

**Mecânico**
- **Definição**: Profissional responsável pelo diagnóstico e execução
- **Contexto**: Técnico
- **Responsabilidades**: Diagnosticar, executar, registrar consumos

**Movimentação de Estoque**
- **Definição**: Registro de entrada e saída de peças
- **Contexto**: Estoque
- **Tipos**: Entrada, saída, reserva, devolução, ajuste

### O

**Ordem de Serviço (OS)**
- **Definição**: Documento principal que orquestra todo o atendimento
- **Contexto**: Atendimento
- **Componentes**: Cliente, veículo, serviços, peças, orçamento, pagamento

**Orçamento**
- **Definição**: Proposta detalhada de serviços e valores
- **Contexto**: Financeiro
- **Validade**: 7 dias padrão
- **Estrutura**: Serviços separados, peças detalhadas, valores individuais e total

### P

**Peça**
- **Definição**: Componente utilizado na reparação do veículo
- **Contexto**: Estoque
- **Atributos**: Código, nome, quantidade, valor, fornecedor

**Pagamento**
- **Definição**: Liquidação financeira dos serviços executados
- **Contexto**: Financeiro
- **Formas**: Dinheiro, cartão, PIX, parcelamento

### R

**Recusada**
- **Definição**: Status quando cliente não aprova o orçamento
- **Contexto**: Fluxo de aprovação
- **Consequência**: OS encerrada sem execução, histórico mantido

### S

**Serviço**
- **Definição**: Trabalho técnico realizado no veículo
- **Contexto**: Técnico
- **Atributos**: Descrição, valor, tempo estimado, peças necessárias

### V

**Veículo**
- **Definição**: Objeto do atendimento
- **Contexto**: Atendimento
- **Dados obrigatórios**: Placa, marca, modelo, ano, cor, chassi

## 🔄 Padrões de Nomenclatura

### Para Classes e Entidades

```javascript
// ✅ Boas práticas
class OrdemServico { }
class ItemServico { }
class MovimentacaoEstoque { }
class ChecklistFinal { }

// ❅ Evitar
class OSService { }
class ServiceItem { }
class StockMovement { }
class FinalChecklist { }
```

### Para Métodos

```javascript
// ✅ Verbos de negócio
ordemServico.abrir()
ordemServico.iniciarDiagnostico()
ordemServico.gerarOrcamento()
ordemServico.aprovarOrcamento()
ordemServico.iniciarExecucao()
ordemServico.finalizarServico()
ordemServico.fechar()

// ❅ Evitar
ordemServico.create()
ordemServico.startDiagnosis()
ordemServico.generateBudget()
ordemServico.approveBudget()
ordemServico.startExecution()
ordemServico.finishService()
ordemServico.close()
```

### Para Status

```javascript
// ✅ Enumerations em português
const StatusOS = {
  ABERTA: 'ABERTA',
  EM_DIAGNOSTICO: 'EM_DIAGNOSTICO',
  AGUARDANDO_APROVACAO: 'AGUARDANDO_APROVACAO',
  APROVADA: 'APROVADA',
  EM_EXECUCAO: 'EM_EXECUCAO',
  CONCLUIDA_TECNICAMENTE: 'CONCLUIDA_TECNICAMENTE',
  AGUARDANDO_PAGAMENTO: 'AGUARDANDO_PAGAMENTO',
  FECHADA: 'FECHADA',
  CANCELADA: 'CANCELADA'
};

// ❅ Evitar
const StatusOS = {
  OPEN: 'OPEN',
  DIAGNOSING: 'DIAGNOSING',
  WAITING_APPROVAL: 'WAITING_APPROVAL',
  APPROVED: 'APPROVED',
  EXECUTING: 'EXECUTING',
  TECHNICALLY_COMPLETED: 'TECHNICALLY_COMPLETED',
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED'
};
```

## 📝 Exemplos de Comunicação

### Conversa com Especialista de Domínio

**Desenvolvedor**: "Quando o cliente chega, nós criamos uma OS?"
**Especialista**: "Sim, nós abrimos uma OS. Primeiro a gente cadastra o cliente se ele não existir, depois o veículo, e aí sim abrimos a OS."

**Desenvolvedor**: "E depois de abrir a OS, o que acontece?"
**Especialista**: "A OS vai para diagnóstico. O mecânico avalia o veículo e identifica o que precisa ser feito. Aí ele registra o diagnóstico na OS."

**Desenvolvedor**: "E o orçamento?"
**Especialista**: "Depois do diagnóstico, a gente gera o orçamento. A gente separa cada serviço com o valor e as peças que vai precisar. Aí envia para o cliente aprovar."

### Documentação de API

```yaml
# POST /api/v1/ordens-servico
summary: Abrir nova ordem de serviço
description: Inicia formalmente o atendimento de um veículo
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        properties:
          clienteId:
            type: integer
            description: ID do cliente cadastrado
          veiculoId:
            type: integer
            description: ID do veículo cadastrado
          relatoInicial:
            type: string
            description: Relato do cliente sobre o problema
          quilometragem:
            type: integer
            description: Quilometragem atual do veículo
responses:
  201:
    description: OS aberta com sucesso
    content:
      application/json:
        schema:
          type: object
          properties:
            id:
              type: integer
            numeroOS:
              type: string
            status:
              type: string
              enum: [ABERTA]
            dataEntrada:
              type: string
              format: date-time
```

## 🎯 Regras de Consistência

### 1. Sempre usar termos em português
- ✅ "Ordem de Serviço"
- ❌ "Service Order"

### 2. Manter consistência em todo o sistema
- ✅ Sempre "abrir OS"
- ❌ Às vezes "criar OS", outras "iniciar OS"

### 3. Usar verbos de negócio
- ✅ "diagnosticar", "orçar", "executar"
- ❌ "analisar", "calcular", "realizar"

### 4. Ser específico e preciso
- ✅ "aguardando aprovação"
- ❌ "pendente"

### 5. Evitar jargões técnicos desnecessários
- ✅ "baixar peça do estoque"
- ❌ "dar commit na transação de estoque"

## 📋 Dicionário de Sinônimos Proibidos

| Termo Correto | Termos Proibidos |
|---------------|------------------|
| Ordem de Serviço | Ticket, Chamado, Request, Issue |
| Cliente | Customer, User, Consumer |
| Veículo | Car, Automobile, Unit |
| Mecânico | Technician, Professional, Engineer |
| Peça | Part, Component, Item, Material |
| Estoque | Inventory, Warehouse, Stock |
| Orçamento | Quote, Budget, Proposal, Estimate |
| Aprovação | Authorization, Confirmation, Acceptance |
| Execução | Execution, Implementation, Development |
| Diagnóstico | Analysis, Inspection, Check-up |

## 🔄 Evolução da Linguagem

A Linguagem Ubíqua não é estática - ela evolui com o entendimento do domínio:

### Processo de Refinamento

1. **Descoberta**: Identificar termos iniciais
2. **Validação**: Confirmar com especialistas
3. **Refinamento**: Ajustar baseado no uso
4. **Documentação**: Registrar no glossário
5. **Treinamento**: Ensinar toda a equipe

### Sinais de Linguagem Inconsistente

- 😟 Desenvolvedores perguntam "o que isso significa?"
- 😟 Especialistas corrigem termos durante reuniões
- 😟 Documentação usa termos diferentes do código
- 😟 APIs têm nomes confusos
- 😟 Novos membros têm dificuldade de entender

---

Uma Linguagem Ubíqua bem estabelecida é fundamental para o sucesso do projeto, garantindo que todos falem a mesma língua e que o sistema reflita fielmente o domínio da oficina mecânica.

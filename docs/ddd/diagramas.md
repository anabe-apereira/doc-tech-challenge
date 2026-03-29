---
title: Diagramas DDD
sidebar_position: 3
---

# Diagramas Domain-Driven Design

## 🎯 Visão Geral dos Diagramas

Os diagramas DDD representam a arquitetura e o design do sistema da oficina mecânica, seguindo os princípios do Domain-Driven Design para garantir que a solução tecnológica reflita fielmente as complexidades do negócio.

## 🏗️ Diagrama de Contexto Delimitado (Bounded Context)

```mermaid
graph TB
    subgraph "Contexto de Atendimento"
        OS[Ordem Serviço]
        CLI[Cliente]
        VEC[Veículo]
        REC[Recepção]
    end
    
    subgraph "Contexto Técnico"
        DIAG[Diagnóstico]
        SERV[Serviço]
        MEC[Mecânico]
        CHECK[Checklist]
    end
    
    subgraph "Contexto de Estoque"
        PEC[Peça]
        EST[Estoque]
        MOV[Movimentação]
        FORN[Fornecedor]
    end
    
    subgraph "Contexto Financeiro"
        ORC[Orçamento]
        PAG[Pagamento]
        FAT[Faturamento]
        COB[Cobrança]
    end
    
    subgraph "Contexto de Comunicação"
        NOT[Notificação]
        EMAIL[E-mail]
        WHATS[WhatsApp]
        SMS[SMS]
    end
    
    OS -.-> ORC
    OS -.-> PEC
    ORC -.-> PAG
    SERV -.-> PEC
    CLI -.-> NOT
    OS -.-> NOT
    
    style "Contexto de Atendimento" fill:#e1f5fe
    style "Contexto Técnico" fill:#f3e5f5
    style "Contexto de Estoque" fill:#e8f5e8
    style "Contexto Financeiro" fill:#fff3e0
    style "Contexto de Comunicação" fill:#fce4ec
```

### Relacionamentos entre Contextos

| Contexto | Relacionamento | Tipo de Integração |
|----------|----------------|-------------------|
| **Atendimento → Financeiro** | Envia dados da OS para orçamento | **Domain Events** |
| **Atendimento → Estoque** | Solicita peças para serviços | **Synchronous API** |
| **Técnico → Estoque** | Consome peças durante execução | **Domain Events** |
| **Financeiro → Comunicação** | Dispara notificações de pagamento | **Events** |
| **Estoque → Atendimento** | Notifica falta de peças | **Events** |

## 🎯 Diagrama de Aggregates

```mermaid
classDiagram
    class OrdemServico {
        <<Aggregate Root>>
        +String numeroOS
        +Status status
        +DateTime dataEntrada
        +String relatoInicial
        +Integer quilometragem
        +abrir()
        +iniciarDiagnostico()
        +gerarOrcamento()
        +aprovarOrcamento()
        +iniciarExecucao()
        +finalizar()
        +cancelar()
    }
    
    class ItemServico {
        <<Entity>>
        +String descricao
        +StatusItem status
        +Decimal valor
        +Integer tempoEstimado
        +iniciar()
        +pausar()
        +concluir()
        +cancelar()
    }
    
    class Orcamento {
        <<Entity>>
        +Decimal valorTotal
        +StatusOrcamento status
        +DateTime validade
        +List~ItemOrcamento~ itens
        +calcularTotal()
        +validarAprovacao()
        +expirar()
    }
    
    class ChecklistFinal {
        <<Entity>>
        +Boolean todosItensConcluidos
        +Boolean veiculoLimpo
        +Boolean semPendencias
        +DateTime dataRealizacao
        +realizar()
        +validar()
    }
    
    class HistoricoEvento {
        <<Entity>>
        +String tipoEvento
        +String descricao
        +DateTime dataHora
        +String usuario
        +registrar()
    }
    
    OrdemServico ||--o{ ItemServico : contem
    OrdemServico ||--|| Orcamento : possui
    OrdemServico ||--|| ChecklistFinal : possui
    OrdemServico ||--o{ HistoricoEvento : registra
```

## 🔧 Diagrama de Entidades e Value Objects

```mermaid
classDiagram
    class Cliente {
        <<Entity>>
        +String nome
        +Documento documento
        +Telefone telefone
        +Email email
        +Endereco endereco
        +TipoCliente tipo
        +validar()
        +estaInadimplente()
    }
    
    class Documento {
        <<Value Object>>
        +String valor
        +TipoDocumento tipo
        +validar()
        +formatar()
    }
    
    class Telefone {
        <<Value Object>>
        +String ddd
        +String numero
        +TipoTelefone tipo
        +validar()
        +formatar()
    }
    
    class Email {
        <<Value Object>>
        +String endereco
        +validar()
    }
    
    class Endereco {
        <<Value Object>>
        +String rua
        +String numero
        +String bairro
        +String cidade
        +String estado
        +String cep
        +formatar()
    }
    
    class Veiculo {
        <<Entity>>
        +Placa placa
        +String marca
        +String modelo
        +Integer ano
        +String cor
        +String chassi
        +Integer quilometragem
        +validar()
        +atualizarQuilometragem()
    }
    
    class Placa {
        <<Value Object>>
        +String valor
        +validar()
        +formatar()
    }
    
    Cliente ||--o{ Veiculo : possui
    Cliente *-- Documento : possui
    Cliente *-- Telefone : possui
    Cliente *-- Email : possui
    Cliente *-- Endereco : possui
    Veiculo *-- Placa : possui
```

## 🏪 Diagrama do Contexto de Estoque

```mermaid
classDiagram
    class Estoque {
        <<Aggregate Root>>
        +String id
        +List~ItemEstoque~ itens
        +verificarDisponibilidade()
        +reservar()
        +baixar()
        +repor()
        +calcularValorTotal()
    }
    
    class ItemEstoque {
        <<Entity>>
        +Peca peca
        +Integer quantidade
        +Integer quantidadeMinima
        +Decimal valorUnitario
        +verificarEstoqueBaixo()
        +reservar()
        +baixar()
    }
    
    class Peca {
        <<Entity>>
        +String codigo
        +String nome
        +String descricao
        +CategoriaPeca categoria
        +String fornecedor
        +Integer tempoReposicao
        +validar()
    }
    
    class MovimentacaoEstoque {
        <<Entity>>
        +TipoMovimentacao tipo
        +Integer quantidade
        +String motivo
        +OrdemServico ordemServico
        +DateTime dataMovimentacao
        +String responsavel
        +registrar()
    }
    
    Estoque ||--o{ ItemEstoque : contem
    ItemEstoque ||--|| Peca : referencia
    Estoque ||--o{ MovimentacaoEstoque : gera
```

## 💳 Diagrama do Contexto Financeiro

```mermaid
classDiagram
    class Pagamento {
        <<Aggregate Root>>
        +String id
        +OrdemServico ordemServico
        +Decimal valor
        +StatusPagamento status
        +FormaPagamento forma
        +DateTime dataPagamento
        +registrar()
        +confirmar()
        +cancelar()
    }
    
    class FormaPagamento {
        <<Value Object>>
        +TipoForma tipo
        +String descricao
        +Decimal valor
        +Integer parcelas
        +validar()
    }
    
    class Fatura {
        <<Entity>>
        +String numero
        +DateTime emissao
        +DateTime vencimento
        +Decimal valor
        +StatusFatura status
        +gerar()
        +vencer()
        +cancelar()
    }
    
    class Cobranca {
        <<Entity>>
        +String id
        +Cliente cliente
        +Decimal valor
        +DateTime dataVencimento
        +StatusCobranca status
        +gerarBoleto()
        +enviarNotificacao()
    }
    
    Pagamento *-- FormaPagamento : possui
    Pagamento ||--|| Fatura : gera
    Pagamento ||--o{ Cobranca : podeGerar
```

## 🔄 Diagrama de Domain Events

```mermaid
flowchart TD
    subgraph "Eventos de Atendimento"
        E1[OSCriada]
        E2[ClienteCadastrado]
        E3[VeiculoRecebido]
        E4[OSEncerrada]
    end
    
    subgraph "Eventos Técnicos"
        E5[DiagnosticoConcluido]
        E6[ServicoIniciado]
        E7[ServicoConcluido]
        E8[ChecklistRealizado]
    end
    
    subgraph "Eventos Financeiros"
        E9[OrcamentoGerado]
        E10[OrcamentoAprovado]
        E11[PagamentoRegistrado]
        E12[FaturaEmitida]
    end
    
    subgraph "Eventos de Estoque"
        E13[PecaReservada]
        E14[PecaConsumida]
        E15[EstoqueBaixo]
        E16[MovimentacaoRegistrada]
    end
    
    subgraph "Eventos de Comunicação"
        E17[NotificacaoEnviada]
        E18[EmailEnviado]
        E19[WhatsAppEnviado]
        E20[SMSEnviado]
    end
    
    E1 --> E5
    E5 --> E9
    E9 --> E17
    E10 --> E6
    E6 --> E13
    E6 --> E14
    E7 --> E8
    E8 --> E11
    E11 --> E12
    E12 --> E4
    
    style "Eventos de Atendimento" fill:#e1f5fe
    style "Eventos Técnicos" fill:#f3e5f5
    style "Eventos Financeiros" fill:#fff3e0
    style "Eventos de Estoque" fill:#e8f5e8
    style "Eventos de Comunicação" fill:#fce4ec
```

## 📊 Diagrama de Estados da Ordem de Serviço

```mermaid
stateDiagram-v2
    [*] --> Aberta
    Aberta --> EmDiagnostico
    EmDiagnostico --> OrcamentoPendente
    OrcamentoPendente --> AguardandoAprovacao
    AguardandoAprovacao --> Aprovada
    AguardandoAprovacao --> ParcialmenteAprovada
    AguardandoAprovacao --> Recusada
    AguardandoAprovacao --> Expirada
    
    Aprovada --> EmExecucao
    ParcialmenteAprovada --> EmExecucao
    
    EmExecucao --> AguardandoPeca
    AguardandoPeca --> EmExecucao
    
    EmExecucao --> AguardandoComplemento
    AguardandoComplemento --> EmExecucao
    
    EmExecucao --> ConcluidaTecnicamente
    ConcluidaTecnicamente --> AguardandoPagamento
    AguardandoPagamento --> Fechada
    
    Recusada --> EncerradaSemExecucao
    Expirada --> EncerradaSemExecucao
    
    EmExecucao --> Cancelada
    AguardandoPeca --> Cancelada
    AguardandoComplemento --> Cancelada
    
    Fechada --> [*]
    EncerradaSemExecucao --> [*]
    Cancelada --> [*]
    
    note right of AguardandoAprovacao
        Cliente pode aprovar:
        - Totalmente
        - Parcialmente
        - Recusar
    end note
    
    note right of EmExecucao
        Pode ser pausado por:
        - Falta de peça
        - Novo diagnóstico
        - Cancelamento
    end note
```

## 🔗 Diagrama de Repositories

```mermaid
classDiagram
    class IOrdemServicoRepository {
        <<Interface>>
        +salvar(ordemServico)
        +buscarPorId(id)
        +buscarPorNumeroOS(numero)
        +listarPorCliente(clienteId)
        +listarPorStatus(status)
        +listarPorPeriodo(dataInicio, dataFim)
    }
    
    class IClienteRepository {
        <<Interface>>
        +salvar(cliente)
        +buscarPorId(id)
        +buscarPorDocumento(cpfCnpj)
        +listarTodos()
        +verificarExistencia(cpfCnpj)
    }
    
    class IVeiculoRepository {
        <<Interface>>
        +salvar(veiculo)
        +buscarPorId(id)
        +buscarPorPlaca(placa)
        +listarPorCliente(clienteId)
        +verificarExistencia(placa)
    }
    
    class IEstoqueRepository {
        <<Interface>>
        +salvar(estoque)
        +buscarPorId(id)
        +buscarPorPeca(pecaId)
        +listarItensBaixos()
        +listarMovimentacoes(periodo)
    }
    
    class IPagamentoRepository {
        <<Interface>>
        +salvar(pagamento)
        +buscarPorId(id)
        +listarPorOS(ordemServicoId)
        +listarPorPeriodo(dataInicio, dataFim)
    }
    
    class OrdemServicoRepositoryPostgres {
        +salvar(ordemServico)
        +buscarPorId(id)
        +buscarPorNumeroOS(numero)
        +listarPorCliente(clienteId)
        +listarPorStatus(status)
        +listarPorPeriodo(dataInicio, dataFim)
    }
    
    IOrdemServicoRepository <|-- OrdemServicoRepositoryPostgres
    IClienteRepository <|.. ClienteRepositoryPostgres
    IVeiculoRepository <|.. VeiculoRepositoryPostgres
    IEstoqueRepository <|.. EstoqueRepositoryPostgres
    IPagamentoRepository <|.. PagamentoRepositoryPostgres
```

## 🎯 Diagrama de Application Services

```mermaid
classDiagram
    class OrdemServicoService {
        <<Application Service>>
        +criarOrdemServico(dto)
        +adicionarServico(ordemServicoId, dto)
        +gerarOrcamento(ordemServicoId)
        +aprovarOrcamento(ordemServicoId, dto)
        +iniciarExecucao(ordemServicoId)
        +finalizarServico(ordemServicoId, itemId)
        +registrarPagamento(ordemServicoId, dto)
        +fecharOrdemServico(ordemServicoId)
    }
    
    class ClienteService {
        <<Application Service>>
        +cadastrarCliente(dto)
        +atualizarCliente(clienteId, dto)
        +buscarCliente(clienteId)
        +listarClientes()
        +verificarInadimplencia(clienteId)
    }
    
    class EstoqueService {
        <<Application Service>>
        +reservarPecas(ordemServicoId)
        +consumirPeca(pecaId, quantidade)
        +reporEstoque(pecaId, quantidade)
        +verificarDisponibilidade(pecaId)
        +listarItensBaixos()
    }
    
    class NotificationService {
        <<Application Service>>
        +enviarNotificacaoOrcamento(ordemServicoId)
        +enviarConfirmacaoPagamento(ordemServicoId)
        +enviarAlertaEstoqueBaixo(pecas)
        +enviarLembreteAprovacao(ordemServicoId)
    }
    
    OrdemServicoService --> IOrdemServicoRepository
    OrdemServicoService --> IClienteRepository
    OrdemServicoService --> IVeiculoRepository
    OrdemServicoService --> NotificationService
    
    ClienteService --> IClienteRepository
    
    EstoqueService --> IEstoqueRepository
    EstoqueService --> NotificationService
```

## 📋 Diagrama de DTOs (Data Transfer Objects)

```mermaid
classDiagram
    class CriarOrdemServicoDTO {
        +Integer clienteId
        +Integer veiculoId
        +String relatoInicial
        +Integer quilometragem
        +String observacoes
        +validar()
    }
    
    class AdicionarServicoDTO {
        +String descricao
        +Decimal valor
        +Integer tempoEstimado
        +List~ItemPecaDTO~ pecas
        +validar()
    }
    
    class AprovarOrcamentoDTO {
        +List~Integer~ itensAprovados
        +List~Integer~ itensRecusados
        +String motivoRecusa
        +String usuario
        +validar()
    }
    
    class ItemPecaDTO {
        +Integer pecaId
        +Integer quantidade
        +Decimal valorUnitario
        +validar()
    }
    
    class PagamentoDTO {
        +Decimal valor
        +String formaPagamento
        +Integer parcelas
        +String dadosCartao
        +validar()
    }
    
    class ConsultarOSDTO {
        +String numeroOS
        +Integer clienteId
        +String status
        +DateTime dataInicio
        +DateTime dataFim
        +validar()
    }
```

## 🔄 Diagrama de Integração entre Sistemas

```mermaid
graph TB
    subgraph "API Gateway"
        GATEWAY[API Gateway]
    end
    
    subgraph "Microservices (Futuro)"
        MS_ATEND[Atendimento Service]
        MS_TECN[Técnico Service]
        MS_ESTQ[Estoque Service]
        MS_FIN[Financeiro Service]
        MS_NOTIF[Notification Service]
    end
    
    subgraph "Banco de Dados"
        DB_ATEND[(Atendimento DB)]
        DB_TECN[(Técnico DB)]
        DB_ESTQ[(Estoque DB)]
        DB_FIN[(Financeiro DB)]
    end
    
    subgraph "External Services"
        EMAIL[Email Service]
        WHATS[WhatsApp API]
        SMS[SMS Gateway]
        PAG[Payment Gateway]
    end
    
    subgraph "Message Broker"
        KAFKA[Apache Kafka]
    end
    
    GATEWAY --> MS_ATEND
    GATEWAY --> MS_TECN
    GATEWAY --> MS_ESTQ
    GATEWAY --> MS_FIN
    
    MS_ATEND --> DB_ATEND
    MS_TECN --> DB_TECN
    MS_ESTQ --> DB_ESTQ
    MS_FIN --> DB_FIN
    
    MS_ATEND -.-> KAFKA
    MS_TECN -.-> KAFKA
    MS_ESTQ -.-> KAFKA
    MS_FIN -.-> KAFKA
    
    MS_NOTIF --> EMAIL
    MS_NOTIF --> WHATS
    MS_NOTIF --> SMS
    MS_FIN --> PAG
    
    KAFKA -.-> MS_NOTIF
```

## 📊 Métricas e Monitoramento

```mermaid
graph LR
    subgraph "Métricas de Negócio"
        MN1[Tempo Médio de Atendimento]
        MN2[Taxa de Aprovação]
        MN3[Valor Médio por OS]
        MN4[Satisfação do Cliente]
    end
    
    subgraph "Métricas Operacionais"
        MO1[OS por Dia]
        MO2[Ocupação dos Mecânicos]
        MO3[Giro de Estoque]
        MO4[Tempo de Resposta API]
    end
    
    subgraph "Métricas Técnicas"
        MT1[Disponibilidade]
        MT2[Taxa de Erros]
        MT3[Performance]
        MT4[Cobertura de Testes]
    end
    
    subgraph "Ferramentas"
        PROM[Prometheus]
        GRAF[Grafana]
        ELK[ELK Stack]
        JAEGER[Jaeger]
    end
    
    MN1 --> PROM
    MN2 --> PROM
    MO1 --> PROM
    MO2 --> PROM
    
    PROM --> GRAF
    MT1 --> GRAF
    MT2 --> GRAF
    
    ELK --> KIBANA
    JAEGER --> UI
```

---

Estes diagramas DDD fornecem uma visão completa da arquitetura do sistema, garantindo que todos os aspectos do domínio da oficina mecânica sejam adequadamente representados e que a implementação siga as melhores práticas de Domain-Driven Design.

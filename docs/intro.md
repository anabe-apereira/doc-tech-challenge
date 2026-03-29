---
title: Visão Geral
sidebar_position: 1
---

# Tech Challenge - Sistema de Gestão de Oficina Mecânica

Bem-vindo à documentação do projeto Tech Challenge! Este projeto consiste no desenvolvimento de um **Sistema Integrado de Atendimento e Execução de Serviços** para uma oficina mecânica de médio porte.

## 🎯 Objetivo do Projeto

Desenvolver a primeira versão **(MVP)** do back-end do sistema da oficina, com foco em gestão de ordens de serviço, clientes e peças, aplicando **Domain-Driven Design (DDD)** e garantindo boas práticas de **Qualidade de Software e Segurança**.

## 🏭 Contexto do Negócio

Uma oficina mecânica de médio porte, especializada em manutenção de veículos, tem enfrentado desafios para expandir seus serviços com qualidade e eficiência. Atualmente, o processo de atendimento, diagnóstico, execução de serviços e entrega dos veículos é feito de forma desorganizada, utilizando anotações manuais e planilhas.

### Problemas Identificados

- Erros na priorização dos atendimentos
- Falhas no controle de peças e insumos
- Dificuldade em acompanhar o status dos serviços
- Perda de histórico de clientes e veículos
- Ineficiência no fluxo de orçamentos e autorizações

## 💡 Solução Proposta

O sistema permitirá aos clientes acompanhar em tempo real o andamento do serviço, autorizar reparos adicionais via aplicativo e garantir uma gestão interna eficiente e segura.

## 🚀 Funcionalidades Principais

### Fluxos Principais

1. **Criação da Ordem de Serviço (OS)**
   - Identificação do cliente por CPF/CNPJ
   - Cadastro de veículo (placa, marca, modelo, ano)
   - Inclusão dos serviços solicitados
   - Orçamento gerado automaticamente

2. **Acompanhamento da OS**
   - Status em tempo real
   - Consulta por parte do cliente via API

3. **Gestão Administrativa**
   - CRUD de clientes, veículos, serviços e peças
   - Controle de estoque
   - Monitoramento de métricas

4. **Segurança e Qualidade**
   - Autenticação JWT
   - Validação de dados
   - Testes automatizados

## 📋 Estrutura da Documentação

Esta documentação está organizada nas seguintes seções:

- **Projeto**: Descrição detalhada do desafio e proposta
- **Domain-Driven Design**: Modelagem do domínio e diagramas
- **Arquitetura**: Visão geral e componentes do sistema
- **Fluxos de Negócio**: Processos e regras de negócio
- **Implementação**: Detalhes técnicos da solução

## 🛠️ Stack Tecnológico

- **Back-end**: Monolito com arquitetura em camadas
- **Banco de Dados**: A ser definido (com justificativa)
- **API**: RESTful com documentação Swagger
- **Containerização**: Docker e Docker Compose
- **Testes**: Cobertura mínima de 80% nos domínios críticos

## 📚 Próximos Passos

Para entender melhor o projeto, recomendamos a leitura sequencial:

1. [Descrição do Desafio](./projeto/descricao)
2. [Visão Geral do Domínio](./ddd/visao-geral)
3. [Diagramas DDD](./ddd/diagramas)
4. [Fluxos de Negócio](./fluxos/ordem-servico)

---

**Data de Entrega**: 05/05/2026  
**Disciplina**: 15SOAT - Fase 1 - Tech Challenge

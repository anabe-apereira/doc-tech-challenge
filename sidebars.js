/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Visão Geral',
    },
    {
      type: 'category',
      label: 'Projeto',
      items: [
        {
          type: 'doc',
          id: 'projeto/descricao',
          label: 'Descrição do Desafio',
        },
        {
          type: 'doc',
          id: 'projeto/proposta',
          label: 'Proposta de Solução',
        },
        {
          type: 'doc',
          id: 'projeto/requisitos',
          label: 'Requisitos Técnicos',
        },
      ],
    },
    {
      type: 'category',
      label: 'Domain-Driven Design',
      items: [
        {
          type: 'doc',
          id: 'ddd/visao-geral',
          label: 'Visão Geral do Domínio',
        },
        {
          type: 'doc',
          id: 'ddd/event-storming',
          label: 'Event Storming',
        },
        {
          type: 'doc',
          id: 'ddd/diagramas',
          label: 'Diagramas DDD',
        },
        {
          type: 'doc',
          id: 'ddd/linguagem-ubiqua',
          label: 'Linguagem Ubíqua',
        },
      ],
    },
    {
      type: 'category',
      label: 'Arquitetura',
      items: [
        {
          type: 'doc',
          id: 'arquitetura/visao-geral',
          label: 'Visão Arquitetural',
        },
        {
          type: 'doc',
          id: 'arquitetura/componentes',
          label: 'Componentes',
        },
        {
          type: 'doc',
          id: 'arquitetura/padroes',
          label: 'Padrões Aplicados',
        },
      ],
    },
    {
      type: 'category',
      label: 'Fluxos de Negócio',
      items: [
        {
          type: 'doc',
          id: 'fluxos/ordem-servico',
          label: 'Ordem de Serviço',
        },
        {
          type: 'doc',
          id: 'fluxos/aprovacao',
          label: 'Fluxo de Aprovação',
        },
        {
          type: 'doc',
          id: 'fluxos/estoque',
          label: 'Gestão de Estoque',
        },
      ],
    },
    {
      type: 'category',
      label: 'Implementação',
      items: [
        {
          type: 'doc',
          id: 'implementacao/api',
          label: 'API RESTful',
        },
        {
          type: 'doc',
          id: 'implementacao/seguranca',
          label: 'Segurança',
        },
        {
          type: 'doc',
          id: 'implementacao/testes',
          label: 'Testes',
        },
        {
          type: 'doc',
          id: 'implementacao/docker',
          label: 'Docker',
        },
      ],
    },
  ],
};

module.exports = sidebars;

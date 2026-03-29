import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '📋 Documentação Completa',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Acesse toda a documentação do projeto, desde a visão geral até os detalhes de implementação.
      </>
    ),
  },
  {
    title: '🏗️ Domain-Driven Design',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Projeto desenvolvido com DDD, garantindo uma arquitetura robusta e escalável.
      </>
    ),
  },
  {
    title: '🔧 Sistema de Oficina',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Sistema completo para gestão de oficinas mecânicas, com ordens de serviço e controle de estoque.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

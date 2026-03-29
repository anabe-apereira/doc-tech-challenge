import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function TeamSection() {
  return (
    <section className={styles.teamSection}>
      <div className="container">
        <h2 className={styles.teamTitle}>👥 Equipe do Projeto</h2>
        <div className={styles.teamGrid}>
          {/* Aluno 1 */}
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>
              <img src="https://github.com/placeholder.png" alt="Foto do Aluno 1" />
            </div>
            <h3 className={styles.memberName}>Nome do Aluno 1</h3>
            <p className={styles.memberRM}>RM: XXXXXXX</p>
            <div className={styles.memberLinks}>
              <a href="https://github.com/username1" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/username1" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Aluno 2 */}
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>
              <img src="https://github.com/placeholder.png" alt="Foto do Aluno 2" />
            </div>
            <h3 className={styles.memberName}>Nome do Aluno 2</h3>
            <p className={styles.memberRM}>RM: XXXXXXX</p>
            <div className={styles.memberLinks}>
              <a href="https://github.com/username2" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/username2" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Aluno 3 */}
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>
              <img src="https://github.com/placeholder.png" alt="Foto do Aluno 3" />
            </div>
            <h3 className={styles.memberName}>Nome do Aluno 3</h3>
            <p className={styles.memberRM}>RM: XXXXXXX</p>
            <div className={styles.memberLinks}>
              <a href="https://github.com/username3" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/username3" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Aluno 4 */}
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>
              <img src="https://github.com/placeholder.png" alt="Foto do Aluno 4" />
            </div>
            <h3 className={styles.memberName}>Nome do Aluno 4</h3>
            <p className={styles.memberRM}>RM: XXXXXXX</p>
            <div className={styles.memberLinks}>
              <a href="https://github.com/username4" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/username4" target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Ver Documentação
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Bem-vindo`}
      description="Sistema de Gestão de Oficina Mecânica">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <TeamSection />
      </main>
    </Layout>
  );
}

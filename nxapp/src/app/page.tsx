
import UsersManager from "./components/servicesmanager";
import Link from "next/link";
import "./home.css";

const features = [
  {
    number: "01",
    icon: "💻",
    title: "Développement web",
    description:
      "Création de sites web et d'applications modernes, performants et adaptés aux besoins de votre activité.",
    tag: "DÉVELOPPEMENT",
  },
  {
    number: "02",
    icon: "🎨",
    title: "Design d'interface",
    description:
      "Conception d'interfaces modernes, intuitives et responsives pour offrir une expérience utilisateur agréable.",
    tag: "UI / UX DESIGN",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Maintenance informatique",
    description:
      "Installation, configuration, diagnostic et maintenance des équipements informatiques pour assurer leur bon fonctionnement.",
    tag: "SUPPORT IT",
  },
];

export default function HomePage() {
  return (
    <main className="site">
      {/* Navigation */}
      <nav className="navbar">
        <Link href="/" className="brand">
          <span className="brand-icon">F</span>
          <span>
            FullStack<span className="brand-light">Pro</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-active">
            Accueil
          </Link>
          <a href="#features">Nos services</a>
          <Link href="/login">Connexion</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <Link href="/login" className="nav-cta">
          Commencer <span>↗</span>
        </Link>
      </nav>

      {/* Section principale */}
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot" />
            VOTRE PROCHAIN PROJET COMMENCE ICI
          </div>

          <h1>
            Transformez vos idées
            <br />
            en expériences <span>digitales.</span>
          </h1>

          <p className="hero-description">
            Bienvenue sur FullStackPro, une plateforme dédiée
            au développement web, au design d'interface et
            à la maintenance informatique, avec une expérience
            moderne et intuitive.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="button-primary">
              Découvrir le projet <span>↗</span>
            </Link>

            <a href="#features" className="button-secondary">
              Découvrir nos services ↓
            </a>
          </div>

          <div className="hero-proof">
            <div className="avatar-stack">
              <span>F</span>
              <span>S</span>
              <span>+</span>
            </div>

            <div>
              <strong>Des solutions pour vos projets</strong>
              <p>Concevoir · Développer · Maintenir</p>
            </div>
          </div>
        </div>

        {/* Illustration du tableau de bord */}
        <div className="hero-visual">
          <div className="visual-glow" />

          <div className="dashboard-card">
            <div className="dashboard-top">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>

              <span>workspace / overview</span>
              <span className="live-label">LIVE</span>
            </div>

            <div className="dashboard-body">
              <div className="dashboard-welcome">
                <span className="mini-label">
                  VOTRE ESPACE DIGITAL
                </span>

                <h2>
                  Build something
                  <br />
                  remarkable.
                </h2>

                <p>Everything starts with a great idea.</p>
              </div>

              <div className="metric-grid">
                <div className="metric">
                  <span>Services</span>
                  <strong>03</strong>
                  <small>Nos expertises</small>
                </div>

                <div className="metric">
                  <span>Design</span>
                  <strong>
                    UI<span className="metric-plus">+</span>
                  </strong>
                  <small>Responsive</small>
                </div>
              </div>

              <div className="activity">
                <div className="activity-icon">✓</div>

                <div>
                  <strong>Application initialisée</strong>
                  <p>Votre espace est prêt à évoluer.</p>
                </div>

                <span className="activity-status">OK</span>
              </div>

              <div className="code-decoration">
                <span>const</span> project ={" "}
                <span>"FullStackPro"</span>;
                <br />
                <span>return</span> {"{"} innovation: true {"}"};
              </div>
            </div>
          </div>

          <div className="floating-card floating-top">
            <span className="floating-icon">✳</span>
            <div>
              <strong>Modern UI</strong>
              <small>Design soigné</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <span className="check-icon">✓</span>
            <div>
              <strong>Ready to build</strong>
              <small>Votre aventure commence</small>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="tech-strip">
        <span>DES SOLUTIONS NUMÉRIQUES</span>

        <div>
          <b>Next.js</b>
          <i /> React
          <i /> TypeScript
          <i /> Web Design
        </div>
      </section>

      {/* Présentation des trois services */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              NOS DOMAINES D'EXPERTISE
            </span>

            <h2>
              Des solutions
              <br />
              pour votre <span>projet digital.</span>
            </h2>
          </div>

          <p>
            Du développement web au design d'interface, en passant
            par la maintenance informatique, découvrez nos services
            pour accompagner vos projets numériques.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-top">
                <span className="feature-icon">
                  {feature.icon}
                </span>

                <span className="feature-number">
                  {feature.number}
                </span>
              </div>

              <span className="feature-tag">
                {feature.tag}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <a href="#contact" className="feature-link">
                En savoir plus <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Bannière de contact */}
      <section className="contact-banner" id="contact">
        <div>
          <span className="section-kicker">
            LA SUITE VOUS APPARTIENT
          </span>

          <h2>Prêt à passer à l'étape suivante ?</h2>

          <p>
            Contactez-nous pour discuter de votre projet
            et découvrir les solutions adaptées à vos besoins.
          </p>
        </div>

        <Link href="/contact" className="button-primary">
          Parlons de votre projet <span>↗</span>
        </Link>
      </section>

      {/* Gestion CRUD des utilisateurs via l'API Express */}
      <UsersManager />

      {/* Pied de page */}
      <footer className="footer">
        <Link href="/" className="brand">
          <span className="brand-icon">F</span>
          <span>
            FullStack<span className="brand-light">Pro</span>
          </span>
        </Link>

        <p>
          Un projet d'apprentissage. Une vision tournée vers l'avenir.
        </p>

        <span>© {new Date().getFullYear()} FullStackPro</span>
      </footer>
    </main>
  );
}

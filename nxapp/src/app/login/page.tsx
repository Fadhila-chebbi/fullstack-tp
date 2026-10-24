
"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Formulaire validé. Pour une connexion réelle, configurez un système d'authentification."
    );
  }

  return (
    <main className="login-page">
      <nav className="login-navbar">
        <Link href="/" className="login-brand">
          <span className="login-brand-icon">F</span>
          <span>FullStack<span className="login-brand-accent">Pro</span></span>
        </Link>

        <Link href="/" className="login-home-link">
          <span>←</span> Retour à l'accueil
        </Link>
      </nav>

      <section className="login-layout">
        <div className="login-left">
          <div className="login-form-container">
            <div className="login-mobile-logo">F.</div>

            <span className="login-eyebrow">
              <span className="login-eyebrow-dot" />
              VOTRE ESPACE PERSONNEL
            </span>

            <h1>
              Bienvenue
              <br />
              <span>de nouveau.</span>
            </h1>

            <p className="login-intro">
              Connectez-vous pour poursuivre votre expérience
              et découvrir toutes les possibilités de FullStackPro.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="email">Adresse e-mail</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">✉</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nom@exemple.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="password">Mot de passe</label>
                  <span className="login-field-note">Accès sécurisé</span>
                </div>

                <div className="login-input-wrap">
                  <span className="login-input-icon">⌑</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Saisissez votre mot de passe"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="login-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              <label className="login-remember">
                <input type="checkbox" name="remember" />
                <span>Se souvenir de moi</span>
              </label>

              <button type="submit" className="login-submit">
                Se connecter <span>↗</span>
              </button>

              {message && (
                <p className="login-message" role="status">
                  {message}
                </p>
              )}
            </form>

            <div className="login-separator">
              <span>FULLSTACKPRO WORKSPACE</span>
            </div>

            <div className="login-contact">
              Vous avez besoin d'aide ?
              <Link href="/contact"> Contactez-nous</Link>
            </div>
          </div>

          <footer className="login-bottom">
            <span>© {new Date().getFullYear()} FullStackPro</span>
            <span>Learning · Building · Growing</span>
          </footer>
        </div>

        <aside className="login-right">
          <div className="login-decoration login-decoration-one" />
          <div className="login-decoration login-decoration-two" />

          <div className="login-right-content">
            <span className="login-panel-label">
              <span /> YOUR DIGITAL WORKSPACE
            </span>

            <div className="login-illustration">
              <div className="login-illustration-orbit orbit-a" />
              <div className="login-illustration-orbit orbit-b" />

              <div className="login-window">
                <div className="login-window-header">
                  <div className="login-window-dots">
                    <i /><i /><i />
                  </div>
                  <span>project.dashboard</span>
                  <span className="login-window-status">ACTIVE</span>
                </div>

                <div className="login-window-body">
                  <div className="login-code-line">
                    <span>01</span> <b>const</b> project = {"{"}
                  </div>
                  <div className="login-code-line indent">
                    <span>02</span> name: <em>"FullStackPro"</em>,
                  </div>
                  <div className="login-code-line indent">
                    <span>03</span> status: <em>"Ready"</em>,
                  </div>
                  <div className="login-code-line indent">
                    <span>04</span> future: <em>"Unlimited"</em>
                  </div>
                  <div className="login-code-line">
                    <span>05</span> {"}"};
                  </div>

                  <div className="login-window-divider" />

                  <div className="login-project-status">
                    <span className="login-status-check">✓</span>
                    <div>
                      <strong>Workspace initialized</strong>
                      <small>Everything is ready to evolve.</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="login-float-card login-float-top">
                <span className="login-float-icon">✳</span>
                <div>
                  <strong>Modern experience</strong>
                  <small>Designed for you</small>
                </div>
              </div>

              <div className="login-float-card login-float-bottom">
                <span className="login-float-check">✓</span>
                <div>
                  <strong>Keep moving forward</strong>
                  <small>Your journey continues</small>
                </div>
              </div>
            </div>

            <h2>
              Les bonnes idées
              <br />
              méritent de <span>prendre vie.</span>
            </h2>

            <p className="login-panel-description">
              Explorez un environnement conçu pour apprendre,
              développer vos compétences et donner vie à vos idées.
            </p>

            <div className="login-panel-footer">
              <span>DESIGNED TO BUILD</span>
              <span>01 — 03</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

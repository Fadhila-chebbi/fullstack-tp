"use client";

import { useState } from "react";
import Link from "next/link";
import "./contact.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="contact-page">
      <nav className="contact-navbar">
        <Link href="/" className="contact-brand">
          <span className="contact-brand-icon">F</span>
          <span>
            FullStack<span className="contact-brand-accent">Pro</span>
          </span>
        </Link>

        <div className="contact-nav-links">
          <Link href="/">Accueil</Link>
          <Link href="/login">Connexion</Link>
          <Link href="/contact" className="contact-nav-active">
            Contact
          </Link>
        </div>
      </nav>

      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-label">NOUS CONTACTER</span>
          <h1>
            Parlons de votre
            <span> prochain projet.</span>
          </h1>
          <p>
            Une question, une idée ou besoin d'informations ?
            Notre équipe est là pour vous aider.
          </p>

          <div className="contact-hero-points">
            <span>✓ Réponse personnalisée</span>
            <span>✓ Équipe à votre écoute</span>
          </div>
        </div>

        <div className="contact-illustration">
          <div className="contact-orbit orbit-one"></div>
          <div className="contact-orbit orbit-two"></div>

          <div className="contact-chat-card">
            <div className="contact-chat-top">
              <span className="contact-avatar">F</span>
              <div>
                <strong>Équipe FullStackPro</strong>
                <small>À votre écoute</small>
              </div>
              <span className="contact-online-dot"></span>
            </div>

            <div className="contact-chat-message">
              Bonjour ! 👋
              <br />
              Comment pouvons-nous vous aider ?
            </div>

            <div className="contact-chat-reply">
              J'aimerais en savoir plus...
            </div>

            <div className="contact-chat-input">
              <span>Écrivez votre message...</span>
              <span className="contact-send-icon">➤</span>
            </div>
          </div>

          <span className="contact-floating-icon floating-mail">✉</span>
          <span className="contact-floating-icon floating-star">✦</span>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <span className="contact-label">RESTONS EN CONTACT</span>
          <h2>Nous sommes là pour vous.</h2>
          <p>
            Remplissez le formulaire et présentez-nous votre demande.
            Nous serons ravis d'échanger avec vous.
          </p>

          <div className="contact-info-item">
            <span className="contact-info-icon">✉</span>
            <div>
              <strong>Adresse e-mail</strong>
              <p>contact@fullstackpro.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">◷</span>
            <div>
              <strong>Disponibilité</strong>
              <p>Du lundi au vendredi</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">⌖</span>
            <div>
              <strong>Notre engagement</strong>
              <p>Vous accompagner dans vos projets</p>
            </div>
          </div>

          <div className="contact-trust">
            <span className="contact-trust-symbol">✓</span>
            <p>
              Votre message est important pour nous. Toutes les demandes
              sont traitées avec attention.
            </p>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h2>Message prêt !</h2>
              <p>
                Le formulaire a été validé. Cette démonstration n'envoie
                pas encore de message à un serveur.
              </p>
              <button
                type="button"
                className="contact-submit"
                onClick={() => setSubmitted(false)}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              <h2>Envoyez-nous un message</h2>
              <p className="contact-form-intro">
                Les champs marqués d'un * sont obligatoires.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Entrez votre nom"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Adresse e-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemple@email.com"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">Sujet *</label>
                  <select id="subject" name="subject" required defaultValue="">
                    <option value="" disabled>
                      Choisissez un sujet
                    </option>
                    <option value="information">Demande d'information</option>
                    <option value="project">Proposition de projet</option>
                    <option value="support">Assistance technique</option>
                    <option value="other">Autre demande</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Votre message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre demande..."
                    rows={5}
                    minLength={10}
                    required
                  />
                </div>

                <button type="submit" className="contact-submit">
                  Envoyer le message <span>→</span>
                </button>

                <p className="contact-form-note">
                  Merci de prendre le temps de nous écrire.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <footer className="contact-footer">
        <Link href="/" className="contact-brand">
          <span className="contact-brand-icon">F</span>
          <span>
            FullStack<span className="contact-brand-accent">Pro</span>
          </span>
        </Link>
        <p>© 2026 FullStackPro — Réalisé dans le cadre du TP Full Stack.</p>
        <Link href="/">Retour à l'accueil ↑</Link>
      </footer>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";

interface User {
  id: number;
  nom: string;
  email: string;
}

const API_URL = "http://localhost:3001/api/users";

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Impossible de charger les utilisateurs."
        );
      }

      setUsers(result.data);
    } catch {
      setError(
        "Impossible de contacter le serveur Express sur le port 3001."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  function resetForm() {
    setNom("");
    setEmail("");
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom.trim(),
            email: email.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "L'opération a échoué.");
      }

      setMessage(result.message);
      resetForm();
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditing(user: User) {
    setEditingId(user.id);
    setNom(user.nom);
    setEmail(user.email);
    setMessage("");
    setError("");

    document.getElementById("users-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function deleteUser(id: number) {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "La suppression a échoué.");
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage(result.message);
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <section
      id="users"
      style={{
        maxWidth: 1100,
        margin: "70px auto",
        padding: "32px 24px",
        color: "#172033",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#64748b", fontWeight: 700, letterSpacing: 2 }}>
          TP2 · API REST EXPRESS
        </p>

        <h2 style={{ fontSize: 32, margin: "12px 0" }}>
          Gestion des utilisateurs
        </h2>

        <p style={{ color: "#64748b" }}>
          Consultez, ajoutez, modifiez et supprimez les utilisateurs depuis
          l’interface.
        </p>
      </div>

      {message && (
        <p role="status" style={{ color: "#15803d", marginBottom: 16 }}>
          {message}
        </p>
      )}

      {error && (
        <p role="alert" style={{ color: "#b91c1c", marginBottom: 16 }}>
          {error}
        </p>
      )}

      <form
        id="users-form"
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 16,
          padding: 24,
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          marginBottom: 32,
          background: "#ffffff",
        }}
      >
        <h3 style={{ fontSize: 21, margin: 0 }}>
          {editingId !== null
            ? "Modifier un utilisateur"
            : "Ajouter un utilisateur"}
        </h3>

        <label style={{ display: "grid", gap: 8 }}>
          Nom complet
          <input
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
            maxLength={100}
            placeholder="Ex. Amine Ben Ali"
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 8 }}>
          Adresse email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength={254}
            placeholder="Ex. amine@example.com"
            style={inputStyle}
          />
        </label>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="submit" disabled={saving} style={primaryButtonStyle}>
            {saving
              ? "Enregistrement..."
              : editingId !== null
                ? "Enregistrer les modifications"
                : "Ajouter l’utilisateur"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              style={secondaryButtonStyle}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ fontSize: 22, margin: 0 }}>
          Utilisateurs enregistrés ({users.length})
        </h3>

        <button
          type="button"
          onClick={() => void loadUsers()}
          style={secondaryButtonStyle}
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <p>Chargement des utilisateurs...</p>
      ) : users.length === 0 ? (
        <p>Aucun utilisateur disponible. Ajoutez votre premier utilisateur.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {users.map((user) => (
            <article
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
                padding: 22,
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                background: "#ffffff",
              }}
            >
              <div style={{ flex: "1 1 280px" }}>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 700,
                    margin: "0 0 8px",
                  }}
                >
                  UTILISATEUR #{user.id}
                </p>

                <h4 style={{ fontSize: 19, margin: "0 0 8px" }}>
                  {user.nom}
                </h4>

                <p style={{ color: "#64748b", margin: 0 }}>
                  {user.email}
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => startEditing(user)}
                  style={secondaryButtonStyle}
                >
                  Modifier
                </button>

                <button
                  type="button"
                  onClick={() => void deleteUser(user.id)}
                  style={deleteButtonStyle}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: 9,
  font: "inherit",
  color: "#172033",
  background: "#ffffff",
};

const primaryButtonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 9,
  background: "#4338ca",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "10px 15px",
  border: "1px solid #cbd5e1",
  borderRadius: 9,
  background: "#ffffff",
  color: "#172033",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "10px 15px",
  border: "1px solid #fecaca",
  borderRadius: 9,
  background: "#fff1f2",
  color: "#be123c",
  fontWeight: 600,
  cursor: "pointer",
};
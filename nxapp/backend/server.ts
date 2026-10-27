
import express, { Request, Response } from 'express';
import cors from 'cors';
import { users, getNextUserId, User } from './users';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET : récupérer tous les utilisateurs
app.get('/api/users', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: users,
  });
});

// GET : récupérer un utilisateur par son ID
app.get('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Identifiant invalide.',
    });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur introuvable.',
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

// POST : ajouter un utilisateur
app.post('/api/users', (req: Request, res: Response) => {
  const { nom, email } = req.body;

  if (
    typeof nom !== 'string' ||
    typeof email !== 'string' ||
    !nom.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Le nom et l’email sont obligatoires.',
    });
  }

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!emailValide) {
    return res.status(400).json({
      success: false,
      message: 'Veuillez saisir une adresse email valide.',
    });
  }

  const nouvelUtilisateur: User = {
    id: getNextUserId(),
    nom: nom.trim(),
    email: email.trim(),
  };

  users.push(nouvelUtilisateur);

  return res.status(201).json({
    success: true,
    message: 'Utilisateur ajouté avec succès.',
    data: nouvelUtilisateur,
  });
});

// PUT : modifier un utilisateur
app.put('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nom, email } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Identifiant invalide.',
    });
  }

  if (
    typeof nom !== 'string' ||
    typeof email !== 'string' ||
    !nom.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Le nom et l’email sont obligatoires.',
    });
  }

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!emailValide) {
    return res.status(400).json({
      success: false,
      message: 'Veuillez saisir une adresse email valide.',
    });
  }

  const utilisateur = users.find((u) => u.id === id);

  if (!utilisateur) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur introuvable.',
    });
  }

  utilisateur.nom = nom.trim();
  utilisateur.email = email.trim();

  return res.status(200).json({
    success: true,
    message: 'Utilisateur modifié avec succès.',
    data: utilisateur,
  });
});

// DELETE : supprimer un utilisateur
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Identifiant invalide.',
    });
  }

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur introuvable.',
    });
  }

  const utilisateurSupprime = users.splice(index, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Utilisateur supprimé avec succès.',
    data: utilisateurSupprime,
  });
});

// Route inconnue
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: true,
    message: 'Route API trouvable.',
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});

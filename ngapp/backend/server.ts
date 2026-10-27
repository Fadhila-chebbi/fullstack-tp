
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

interface Service {
  id: number;
  nom: string;
  description: string;
}

let services: Service[] = [
  {
    id: 1,
    nom: '💻Développement web',
    description: 'Création de sites et d\'applications avec Angular'
  },
  {
    id: 2,
    nom: ' 🖌️Design d\'interface',
    description: 'Interfaces modernes, claires et adaptées à tous les écrans.'
  },
  {
    id: 3,
    nom: '🛠️ Déploiement',
    description: 'Mise en ligne et maintenance de l\'application.'
  }
];
app.use(cors());
app.use(express.json());
// GET : récupérer tous les services
app.get('/api/services', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: services
  });
});
app.get('/api/services/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service introuvable.'
    });
  }

  return res.status(200).json({
    success: true,
    data: service
  });
});
// POST : ajouter un nouveau service
app.post('/api/services', (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (!nom || !description) {
    return res.status(400).json({
      success: false,
      message: 'Le nom et la description sont obligatoires.'
    });
  }

  const nouveauService: Service = {
    id: services.length > 0
      ? Math.max(...services.map(service => service.id)) + 1
      : 1,
    nom,
    description
  };

  services.push(nouveauService);

  return res.status(201).json({
    success: true,
    message: 'Service ajouté avec succès.',
    data: nouveauService
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API Angular opérationnelle',
    status: 'success'
  });
});
// PUT : modifier un service existant
app.put('/api/services/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service introuvable.'
    });
  }

  const { nom, description } = req.body;

  if (!nom || !description) {
    return res.status(400).json({
      success: false,
      message: 'Le nom et la description sont obligatoires.'
    });
  }

  service.nom = nom;
  service.description = description;

  return res.status(200).json({
    success: true,
    message: 'Service modifié avec succès.',
    data: service
  });
});

 // DELETE : supprimer un service
app.delete('/api/services/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = services.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Service introuvable.'
    });
  }

  services.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: 'Service supprimé avec succès.'
  });
});


app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Le serveur Express fonctionne correctement'
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route introuvable'
  });
});

app.listen(PORT, () => {
  console.log(`API Angular démarrée sur http://localhost:${PORT}`);
});

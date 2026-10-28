
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose, { Schema, Model, Document } from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET === 'TA_CLE_SECRETE') {
  throw new Error('Configure une vraie valeur JWT_SECRET dans .env');
}

// ==================== Modèle Service ====================

interface IService extends Document {
  id: number;
  nom: string;
  description: string;
}

const serviceSchema = new Schema<IService>(
  {
    id: { type: Number, required: true, unique: true },
    nom: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>('Service', serviceSchema);

// ==================== Modèle User ====================

interface IUser extends Document {
  nom: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    nom: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);

// ==================== Type utilisateur authentifié ====================

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// ==================== Sécurité et middlewares ====================

app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de requêtes. Réessaie dans 15 minutes.'
  }
}));


app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://tp3-angular-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' }));

// ==================== Authentification JWT ====================

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentification requise. Connecte-toi.'
    });
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (typeof decoded === 'string' || !decoded.sub) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide.'
      });
    }

    req.userId = decoded.sub;
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token invalide ou expiré. Reconnecte-toi.'
    });
  }
}

// ==================== POST : inscription ====================

app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { nom, email, password } = req.body;

  if (
    typeof nom !== 'string' || !nom.trim() ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== 'string' ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message: 'Nom, email valide et mot de passe de 8 caractères minimum requis.'
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Cette adresse email est déjà utilisée.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      nom: nom.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    const token = jwt.sign(
      { sub: user._id.toString() },
      JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      success: true,
      message: 'Compte créé avec succès.',
      data: {
        user: {
          id: user._id.toString(),
          nom: user.nom,
          email: user.email
        },
        token
      }
    });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: 'Cette adresse email est déjà utilisée.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du compte.'
    });
  }
});

// ==================== POST : connexion ====================

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe obligatoires.'
    });
  }

  try {
    const user = await User.findOne({
      email: email.trim().toLowerCase()
    }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.'
      });
    }

    const token = jwt.sign(
      { sub: user._id.toString() },
      JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie.',
      data: {
        user: {
          id: user._id.toString(),
          nom: user.nom,
          email: user.email
        },
        token
      }
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion.'
    });
  }
});

// ==================== GET : tous les services (public) ====================

app.get('/api/services', async (_req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ id: 1 });
    return res.status(200).json({ success: true, data: services });
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des services.'
    });
  }
});

// ==================== GET : un service (public) ====================

app.get('/api/services/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: 'Identifiant invalide.'
    });
  }

  try {
    const service = await Service.findOne({ id });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service introuvable.'
      });
    }

    return res.status(200).json({ success: true, data: service });
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du service.'
    });
  }
});

// ==================== POST : ajouter un service (protégé) ====================

app.post(
  '/api/services',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { nom, description } = req.body;

    if (
      typeof nom !== 'string' || !nom.trim() ||
      typeof description !== 'string' || !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et la description sont obligatoires.'
      });
    }

    try {
      const dernierService = await Service.findOne().sort({ id: -1 });
      const prochainId = dernierService ? dernierService.id + 1 : 1;

      const nouveauService = await Service.create({
        id: prochainId,
        nom: nom.trim(),
        description: description.trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Service ajouté avec succès.',
        data: nouveauService
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l’ajout du service.'
      });
    }
  }
);

// ==================== Page d'accueil ====================

app.get('/', (_req: Request, res: Response) => {
  return res.json({
    message: 'API Angular opérationnelle',
    status: 'success'
  });
});

// ==================== PUT : modifier un service (protégé) ====================

app.put(
  '/api/services/:id',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nom, description } = req.body;

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'Identifiant invalide.'
      });
    }

    if (
      typeof nom !== 'string' || !nom.trim() ||
      typeof description !== 'string' || !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et la description sont obligatoires.'
      });
    }

    try {
      const serviceModifie = await Service.findOneAndUpdate(
        { id },
        { nom: nom.trim(), description: description.trim() },
        { returnDocument: 'after', runValidators: true }
      );

      if (!serviceModifie) {
        return res.status(404).json({
          success: false,
          message: 'Service introuvable.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Service modifié avec succès.',
        data: serviceModifie
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la modification du service.'
      });
    }
  }
);

// ==================== DELETE : supprimer un service (protégé) ====================

app.delete(
  '/api/services/:id',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        message: 'Identifiant invalide.'
      });
    }

    try {
      const serviceSupprime = await Service.findOneAndDelete({ id });

      if (!serviceSupprime) {
        return res.status(404).json({
          success: false,
          message: 'Service introuvable.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Service supprimé avec succès.'
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du service.'
      });
    }
  }
);

// ==================== Vérifier le serveur et MongoDB ====================

app.get('/api/health', (_req: Request, res: Response) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  return res.status(mongoConnected ? 200 : 503).json({
    status: mongoConnected ? 'OK' : 'ERROR',
    message: mongoConnected
      ? 'Le serveur Express et MongoDB fonctionnent correctement.'
      : 'MongoDB n’est pas connecté.'
  });
});

// ==================== Route inconnue ====================

app.use((_req: Request, res: Response) => {
  return res.status(404).json({ error: 'Route introuvable' });
});

// ==================== Démarrage du serveur ====================

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error('La variable MONGODB_URI manque dans .env');
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connexion à MongoDB réussie.');

  if (await Service.countDocuments() === 0) {
    await Service.insertMany([
      {
        id: 1,
        nom: '💻Développement web',
        description: 'Création de sites et d’applications avec Angular'
      },
      {
        id: 2,
        nom: '🖌️Design d’interface',
        description: 'Interfaces modernes, claires et adaptées à tous les écrans.'
      },
      {
        id: 3,
        nom: '🛠️ Déploiement',
        description: 'Mise en ligne et maintenance de l’application.'
      }
    ]);

    console.log('Services de démonstration ajoutés.');
  }

  app.listen(PORT, () => {
    console.log(`API Angular démarrée sur http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Impossible de démarrer le serveur :', error);
  process.exit(1);
});

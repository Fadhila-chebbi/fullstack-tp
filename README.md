# Craftline — Application Web Full Stack

## 1. Présentation du projet

**Craftline** est une application web Full Stack destinée à présenter des services numériques à travers une interface moderne, professionnelle et responsive.

Ce projet a été réalisé dans le cadre des travaux pratiques du module Full Stack Web Development.

L'application principale repose sur Angular pour le Front-End, Node.js et Express.js pour le Back-End, et MongoDB pour la persistance des données.

## 2. Technologies utilisées

### Front-End
- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular HttpClient

### Back-End
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

### Sécurité
- JWT (JSON Web Tokens)
- bcryptjs pour le hachage des mots de passe
- Helmet pour la sécurisation des en-têtes HTTP
- CORS
- Express Rate Limit

### Outils et déploiement
- Visual Studio Code
- Git et GitHub
- Render

## 3. Structure du projet

```text
fullstack-tp/
│
├── ngapp/
│   ├── src/
│   │   └── app/
│   │       ├── pages/
│   │       │   ├── home/
│   │       │   ├── login/
│   │       │   ├── contact/
│   │       │   ├── services/
│   │       │   └── service-details/
│   │       │
│   │       ├── services/
│   │       ├── app.config.ts
│   │       ├── app.routes.ts
│   │       ├── app.html
│   │       └── app.css
│   │
│   └── backend/
│       ├── models/
│       │   └── Services.ts
│       ├── server.ts
│       ├── package.json
│       └── tsconfig.json
│
├── nxapp/
│
└── README.md
```

Le dossier `nxapp/` est conservé dans le dépôt pour les travaux précédents de comparaison entre Angular et Next.js. L'application principale Craftline présentée dans ce projet est développée avec Angular.

## 4. TP1 — Développement Front-End

Le Front-End de Craftline est développé avec Angular.

### Fonctionnalités réalisées

- Page d'accueil moderne et responsive.
- Page de présentation des services.
- Pages individuelles présentant les détails de chaque service.
- Page de connexion avec validation des formulaires.
- Page de contact avec validation des champs.
- Navigation entre les différentes pages avec Angular Router.
- Utilisation de services Angular pour communiquer avec le Back-End.
- Utilisation de HttpClient pour les requêtes HTTP.
- Adaptation de l'interface aux différentes tailles d'écran.

## 5. TP2 — Développement de l'API REST

Le Back-End est développé avec Node.js, Express.js et TypeScript.

### Gestion des services

L'API REST permet les opérations suivantes :

- **GET** : récupérer la liste des services.
- **GET par identifiant** : récupérer
# 🌼 Garderie DevOps — Les Petits Explorateurs

Application web responsive pour une garderie, construite avec **Next.js, TypeScript, Node.js, Express et Docker Compose**.

## Fonctionnalités

- Landing page responsive avec Navbar, Hero, Services et Activités.
- API REST Express avec trois endpoints métier et une route de santé.
- Récupération dynamique des données par le frontend.
- Configuration de l'URL API par variable d'environnement.
- Exécution locale séparée ou via Docker Compose.
 
## Architecture

```text
garderie-devops/
├── frontend/              # Next.js + TypeScript
│   ├── app/               # Pages et styles globaux
│   ├── components/        # Navbar, Hero, Services, Activities
│   └── lib/api.ts         # Client HTTP vers Express
├── backend/               # Node.js + Express
│   └── src/
│       ├── data/          # Données de démonstration
│       ├── routes/        # Endpoints REST
│       └── server.js
├── docker-compose.yml
└── README.md
```

## Prérequis

- Node.js 22 ou version compatible récente
- npm
- Docker et Docker Compose (facultatifs pour le lancement local)

## Lancer en local

### 1. Démarrer l'API

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API disponible sur `http://localhost:4000`.

### 2. Démarrer le frontend

Dans un second terminal :

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Site disponible sur `http://localhost:3000`.

`frontend/.env.local` doit contenir `API_URL=http://localhost:4000` lorsque Next.js tourne directement sur l'hôte.

## API REST

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Vérifier l'état du backend |
| GET | `/api/garderie` | Informations générales de la garderie |
| GET | `/api/services` | Liste des services |
| GET | `/api/activites` | Liste des activités |

Exemples de test :

```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/garderie
curl http://localhost:4000/api/services
curl http://localhost:4000/api/activites
```

Les endpoints métier renvoient une enveloppe JSON contenant `success` et `data`. Les endpoints de listes incluent aussi `count`.

## Lancer avec Docker Compose

À la racine du projet :

```bash
docker compose up --build
```

- Frontend : `http://localhost:3000`
- Backend : `http://localhost:4000`
- Santé de l'API : `http://localhost:4000/api/health`

Dans le réseau Docker, le frontend contacte le backend via `http://backend:4000`. Cette adresse interne est différente de `localhost:4000`, qui est utilisée depuis l'hôte.

Pour arrêter les conteneurs :

```bash
docker compose down
```

## Configuration

- `backend/.env.example` : port de l'API et origine autorisée par CORS.
- `frontend/.env.example` : URL de l'API appelée par Next.js.
- En Docker, `API_URL` est configurée avec l'adresse du service `backend`.

## Publication sur GitHub

Crée un dépôt public nommé `garderie-devops` sur GitHub, sans ajouter de README si tu as déjà celui-ci, puis exécute à la racine du projet :

```bash
git init
git add .
git commit -m "feat: create garderie web app with Next.js and Express"
git branch -M main
git remote add origin https://github.com/TON-UTILISATEUR/garderie-devops.git
git push -u origin main
```

Remplace `TON-UTILISATEUR` par ton nom d'utilisateur GitHub.

## Personnalisation

Le nom, les coordonnées, les services et les activités de démonstration se trouvent dans `backend/src/data/garderie.js`. Remplace-les par les vraies informations avant toute mise en production.

La photo du Hero est chargée depuis Unsplash ; une connexion Internet est nécessaire pour l'afficher.

# RightFlow 🎵

Plateforme de tracking et reversement automatique des droits musicaux (droits d'auteur + droits voisins) pour le Maghreb et l'Afrique.

## Stack technique

- **Frontend** : Next.js 14 + TypeScript + Tailwind CSS
- **Backend** : Next.js API Routes (serverless)
- **Base de données** : PostgreSQL + Prisma ORM
- **Audio tracking** : ACRCloud API + IoT (Raspberry Pi)
- **Blockchain** : Polygon (smart contracts pour les splits)
- **Paiements** : Orange Money + CIH Pay + Stripe
- **Auth** : NextAuth.js

## Installation

```bash
# 1. Cloner le repo
git clone https://github.com/rightflow/rightflow-app
cd rightflow

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Remplir les variables dans .env.local

# 4. Initialiser la base de données
npx prisma db push

# 5. Seed des données initiales
npm run db:seed

# 6. Lancer en développement
npm run dev
```

## Structure du projet

```
rightflow/
├── app/
│   ├── dashboard/        # Vue d'ensemble
│   ├── tracking/         # Flux de détections live
│   ├── paiements/        # Cycles trimestriels
│   ├── catalogue/        # Gestion des oeuvres
│   ├── admin/            # Dashboard BMDA
│   └── api/
│       ├── detections/   # Webhook IoT / ACRCloud
│       ├── works/        # CRUD catalogue
│       ├── cycles/       # Gestion des cycles
│       ├── reserve/      # Fonds de réserve
│       └── dashboard/    # Stats agrégées
├── components/
│   ├── layout/           # AppShell, Sidebar, Topbar
│   ├── dashboard/        # Composants dashboard
│   └── ui/               # Composants réutilisables
├── lib/
│   ├── prisma.ts         # Client Prisma singleton
│   ├── rightsEngine.ts   # Moteur de calcul des droits
│   └── acrcloud.ts       # Intégration ACRCloud
└── prisma/
    ├── schema.prisma     # Schéma de la BDD
    └── seed.ts           # Données initiales
```

## Fonctionnalités

### Tracking
- Reconnaissance audio en temps réel (ACRCloud)
- Monitoring 24h/24 des radios marocaines (Hit Radio, Medi1, 2M, Aswat...)
- Boitiers IoT pour les espaces publics (Morocco Mall, centres commerciaux...)
- Intégration APIs streaming (Spotify, Anghami, YouTube)

### Droits
- **Droits d'auteur (DA)** : auteurs et compositeurs
- **Droits voisins (DV)** : artistes-interprètes et labels producteurs
- Calcul automatique selon taux par territoire (MA, DZ, TN)
- Smart contracts blockchain pour les splits immuables

### Fonds de Réserve (Boîte Noire)
- Collecte automatique pour les oeuvres non enregistrées
- Période de réclamation : 18 mois
- Notifications proactives aux artistes non inscrits
- Redistribution au prorata des passages après expiration

### Paiements
- **Cycles trimestriels** : Q1/Q2/Q3/Q4
- Versement automatique à date fixe
- Méthodes : virement bancaire, Orange Money, CIH Pay, Wave
- Rapport détaillé DA / DV par artiste

## API

### POST /api/detections
Endpoint appelé par les boitiers IoT et l'API ACRCloud.
```json
{
  "sourceId": "src-hitradio",
  "isrc": "MA-Z03-24-00142",
  "rawTitle": "Ila Meta",
  "rawArtist": "Saad Lamjarred",
  "durationSeconds": 210,
  "confidence": 95.4
}
```

### GET /api/dashboard
Retourne les métriques agrégées du dashboard.

### POST /api/cycles/process
Déclenche le traitement d'un cycle de paiement.

### GET /api/reserve
Liste les entrées du Fonds de Réserve.

### POST /api/reserve
Actions : `notify` (envoyer notifications) ou `redistribute` (redistribuer après 18 mois).

## Déploiement

### Vercel (recommandé)
```bash
npm i -g vercel
vercel --prod
```

### Variables d'environnement requises sur Vercel
- `DATABASE_URL` (Neon, Supabase, ou PlanetScale)
- `NEXTAUTH_SECRET`
- `ACRCLOUD_ACCESS_KEY` + `ACRCLOUD_ACCESS_SECRET`
- `ORANGE_MONEY_API_KEY`

## Prochaines étapes

- [ ] Authentification complète (login/register)
- [ ] Application mobile (React Native)
- [ ] Smart contracts Solidity sur Polygon
- [ ] Intégration Bmat pour monitoring radio étendu
- [ ] Expansion Algérie (ONDA) et Tunisie (OTDAV)
- [ ] Tableau de bord analytics avancé

---

Built with ❤️ in Casablanca · RightFlow © 2025

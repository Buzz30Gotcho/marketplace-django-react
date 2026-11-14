# Marketplace API — Django REST Framework + React

Mini-projet full-stack : une API de **catalogue de produits** (back-end **Django / Django REST Framework**) et un front **React** qui la consomme. Pensé autour d'un cas marketplace : produits, catégories, fournisseurs.

## Stack

- **Back-end** : Python, Django 5, Django REST Framework
- **Front-end** : React (Vite) + React Router
- **Base de données** : SQLite (dev)
- **Outils** : django-filter (recherche/filtres), django-cors-headers (CORS), authentification par token, tests DRF

## Fonctionnalités

**API (back-end)**
- API REST `/api/products/` et `/api/categories/` (CRUD via `ModelViewSet`)
- **Pagination** automatique (10 par page)
- **Recherche** plein texte : `/api/products/?search=pomme`
- **Filtres** par catégorie et fournisseur : `/api/products/?category=1`
- **Authentification par token** : `/api/token/` renvoie un token à partir d'un login / mot de passe
- **Permissions** : lecture publique, écriture réservée aux utilisateurs authentifiés
- Interface d'admin Django

**Front (React)**
- Page **Catalogue** (publique) : cartes produits, recherche live, filtres par catégorie
- Page **Gestion** (protégée par connexion) : créer / supprimer des produits et des catégories
- **Navigation** entre les pages (React Router), gestion de l'état et des formulaires

**Qualité**
- Tests automatisés (liste, recherche, permission, création authentifiée)
- Commande de peuplement : `python manage.py seed_catalogue`

## Lancer le back-end

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # identifiants pour se connecter côté front / admin
python manage.py seed_catalogue    # (optionnel) remplit le catalogue d'exemples
python manage.py runserver 8002
```

- API navigable : http://127.0.0.1:8002/api/
- Admin : http://127.0.0.1:8002/admin/

> La page **Gestion** du front utilise les identifiants du superuser créé ci-dessus.

## Lancer le front-end

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Front disponible sur http://localhost:5173/ (il appelle l'API sur le port 8002).

## Tests

```bash
cd backend
python manage.py test
```

## Architecture

```
django-marketplace-api/
├── backend/            # back-end Django / DRF
│   ├── config/         # réglages du projet (settings, urls)
│   ├── catalogue/      # app métier : models, serializers, views, tests, seed
│   └── manage.py
└── frontend/           # front-end React (Vite)
    └── src/
        ├── api.js      # client de l'API (fetch + token)
        ├── App.jsx     # mise en page + routing
        └── pages/      # Catalog (public) et Manage (connexion + CRUD)
```

Le front React et le back Django sont deux couches séparées : le back expose les données en JSON via l'API, le front les affiche. C'est l'architecture classique d'une application web moderne.

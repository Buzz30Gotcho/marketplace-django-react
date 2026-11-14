# Marketplace API — Django REST Framework + React

Mini-projet full-stack : une API de **catalogue de produits** (back-end **Django / Django REST Framework**) et un front **React** qui la consomme. Pensé autour d'un cas marketplace : produits, catégories, fournisseurs.

## Stack

- **Back-end** : Python, Django 5, Django REST Framework
- **Front-end** : React (Vite)
- **Base de données** : SQLite (dev)
- **Outils** : django-filter (recherche), django-cors-headers (CORS), tests DRF

## Fonctionnalités

- API REST `/api/products/` et `/api/categories/` (CRUD via `ModelViewSet`)
- **Pagination** automatique (10 par page)
- **Recherche** plein texte : `/api/products/?search=pomme`
- **Filtres** par catégorie et fournisseur : `/api/products/?category=1`
- **Permissions** : lecture publique, écriture réservée aux utilisateurs authentifiés
- **Interface d'admin** Django pour gérer le catalogue
- Front React : liste des produits en cartes + barre de recherche live branchée sur l'API
- Tests automatisés (liste, recherche, permission d'écriture)

## Lancer le back-end

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # pour accéder à /admin
python manage.py runserver 8002
```

- API navigable : http://127.0.0.1:8002/api/
- Admin : http://127.0.0.1:8002/admin/

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
│   ├── catalogue/      # app métier : models, serializers, views, tests
│   └── manage.py
└── frontend/           # front-end React (Vite)
```

Le front React et le back Django sont deux couches séparées : le back expose les données en JSON via l'API, le front les affiche. C'est l'architecture classique d'une application web moderne.

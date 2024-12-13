# Spécification de l'API de Gestion de Ressources

## Légende

- 🔒 : Route nécessitant un token authentification (token JWT requis)
- ⬇️ : Route avec body ou paramètres requis
- ⬆️ : Route avec un format de retour spécifique

## Types de Rôles

- `administrateur` : Droits complets
- `professeur` : Droits limités
- `etudiant` : Droits minimaux

## Statuts de Ressources

- `propose` : En attente de validation
- `valide` : Approuvé et visible
- `rejete` : Non approuvé

## 1. Routes Utilisateur (`/users`)

### 1.1 Authentification

- `POST /users/login` ⬇️
  - Description : Authentification de l'utilisateur
  - Input Body:
  ```json
  {
    "identifiant": "string",
    "motDePasse": "string"
  }
  ```
  - Output Success (200):
  ```json
  {
    "token": "string",
    "utilisateur": {
      "id": "number",
      "prenom": "string",
      "nom": "string",
      "role": "string"
    }
  }
  ```
  - Cas de retour :
    - 200 OK : Connexion réussie
    - 401 Unauthorized : Identifiants invalides
    - 400 Bad Request : Données de connexion manquantes

### 1.2 Gestion du Profil

- `GET /users/me` 🔒 ⬆️

  - Description : Récupérer les informations du profil utilisateur connecté
  - Output Success (200):

  ```json
  {
    "id": "number",
    "prenom": "string",
    "nom": "string",
    "email": "string",
    "role": "string"
  }
  ```

  - Cas de retour :
    - 200 OK : Profil récupéré
    - 401 Unauthorized : Token invalide

- `POST /users/create` 🔒(administrateur) ⬇️

  - Description : Création d'un nouvel utilisateur
  - Input Body:

  ```json
  {
    "prenom": "string",
    "nom": "string",
    "email": "string",
    "motDePasse": "string",
    "role": "enum['administrateur','professeur','etudiant']"
  }
  ```

  - Output Success (201):
  - Cas de retour :
    - 201 Created : Utilisateur créé
    - 400 Bad Request : Données manquantes ou invalides
    - 401 Unauthorized : Token invalide ou rôle insuffisant
    - 409 Conflict : Utilisateur déjà existant

- `PUT /users/{id}` 🔒(admin) ⬇️

  - Description : Modification d'un utilisateur
  - Input Body:

  ```json
  {
    "prenom": "string?",
    "nom": "string?",
    "email": "string?",
    "motDePasse": "string?",
    "role": "enum['administrateur','professeur','etudiant']?"
  }
  ```

  - Output Success (200):
  - Cas de retour :
    - 200 OK : Utilisateur modifié
    - 400 Bad Request : Données invalides
    - 401 Unauthorized : Token invalide ou rôle insuffisant
    - 404 Not Found : Utilisateur non trouvé

- `DELETE /users/{id}` 🔒 (administrateur)
  - Description : Suppression d'un utilisateur
  - Output Success (204): Pas de contenu
    - Cas de retour :
      - 204 No Content : Utilisateur supprimé
      - 404 Not Found : Utilisateur non trouvé
      - 401 Unauthorized : Token invalide ou rôle insuffisant

## 2. Routes Ressources (`/ressources`)

### 2.1 Gestion des Ressources

- `GET /ressources` 🔒 ⬇️ ⬆️

  - Description : Récupérer la liste des ressources. Les ressources retournées dépendent des paramètres et du rôle de l'utilisateur :

    - `administrateur` : Toutes les ressources
    - `professeur` : Ressources validées
    - `etudiant` : Ressources validées

  - Input Query Params:

  ```json
  {
    "domaine": "string?",
    "titre": "string?",
    "description": "string?",
    "page": "number?",
    "limite": "number?"
  }
  ```

  - Output Success (200):

  ```json
  {
    "total": "number",
    "page": "number",
    "ressources": [
      {
        "id": "number",
        "titre": "string",
        "domaine": "string",
        "descriptionSimple": "string",
        "descriptionDetaillee": "string",
        "lien": "string",
        "acces": "string",
        "statut": "string"
      }
    ]
  }
  ```

  - Cas de retour :
    - 200 OK : Ressources récupérées
    - 401 Unauthorized : Token invalide
    - 400 Bad Request : Paramètres invalides

- `GET /ressources/{id}` 🔒 ⬆️

  - Description : Détails d'une ressource spécifique. La ressource retournée dépend du rôle de l'utilisateur :

    - `administrateur` : Toutes les ressources
    - `professeur` : Ressources validées
    - `etudiant` : Ressources validées

  - Output Success (200):

  ```json
  {
    "id": "number",
    "titre": "string",
    "domaine": "string",
    "descriptionSimple": "string",
    "descriptionDetaillee": "string",
    "lien": "string",
    "acces": "string",
    "feedbacksUtilisateurs": [
      {
        "id": "number",
        "contenu": "string",
        "note": "number?",
        "auteur": {
          "id": "number",
          "prenom": "string",
          "nom": "string",
          "role": "string"
        }
      }
    ],
    "statut": "string"
  }
  ```

  - Cas de retour :
    - 200 OK : Ressource récupérée
    - 401 Unauthorized : Token invalide ou rôle insuffisant
    - 404 Not Found : Ressource non trouvée

- `POST /ressources/create` 🔒 (administrateur ou professeur) ⬇️

  - Description : Création d'une nouvelle ressource. Les ressources créées par les professeurs sont en statut `propose` et doivent être validées par un administrateur. Les ressources créées par les administrateurs sont en statut `valide` directement.

  - Input Body:

  ```json
  {
    "titre": "string",
    "domaine": "string",
    "descriptionSimple": "string",
    "descriptionDetaillee": "string",
    "lien": "string",
    "acces": "string"
  }
  ```

  - Output Success (201):
  - Cas de retour :
    - 201 Created : Ressource créée
    - 400 Bad Request : Données manquantes ou invalides
    - 401 Unauthorized : Token invalide ou rôle insuffisant

- `PUT /ressources/{id}` 🔒(administrateur) ⬇️

  - Description : Modification d'une ressource
  - Input Body:

  ```json
  {
    "titre": "string?",
    "domaine": "string?",
    "descriptionSimple": "string?",
    "descriptionDetaillee": "string?",
    "lien": "string?",
    "acces": "string?"
  }
  ```

  - Output Success (200):
  - Cas de retour :
    - 200 OK : Ressource modifiée
    - 400 Bad Request : Données invalides
    - 401 Unauthorized : Token invalide ou rôle insuffisant
    - 404 Not Found : Ressource non trouvée

- `PUT /ressources/statut` 🔒(administrateur) ⬇️

  - Description : Changement de statut d'une ressource
  - Input Body:

  ```json
  {
    "idRessource": "number",
    "statut": "enum['propose','valide','rejete']"
  }
  ```

  - Output Success (200):
  - Cas de retour :
    - 200 OK : Statut modifié
    - 400 Bad Request : Données invalides
    - 401 Unauthorized : Token invalide ou rôle insuffisant
    - 404 Not Found : Ressource non trouvée
    -

- `DELETE /ressources/{id}` 🔒(administrateur)
  - Description : Suppression d'une ressource
  - Output Success (204): Pas de contenu
  - Cas de retour :
    - 204 No Content : Ressource supprimée
    - 404 Not Found : Ressource non trouvée
    - 401 Unauthorized : Token invalide ou rôle insuffisant

### 2.2 Gestion des Feedbacks

- `POST /ressources/{id}/feedback` 🔒⬇️

  - Description : Ajout d'un feedback sur une ressource.

    - Les étudiants ne peuvent ajouter qu'un seul feedback par ressource.

    - Les professeurs et administrateurs peuvent ajouter autant de feedbacks qu'ils le souhaitent.

  - Input Body:

  ```json
  {
    "contenu": "string",
    "note": "number?" // Note optionnelle entre 1-5
  }
  ```

  - Output Success (201):
  - Cas de retour :
    - 201 Created : Feedback ajouté
    - 400 Bad Request : Données invalides
    - 401 Unauthorized : Token invalide ou trop de feedbacks déjà ajoutés.
    - 404 Not Found : Ressource non trouvée

- `GET /ressources/{id}/feedbacks` 🔒 ⬆️
  - Description : Récupération des feedbacks d'une ressource
  - Output Success (200):
  ```json
  {
    "total": "number",
    "feedbacks": [
      {
        "id": "number",
        "contenu": "string",
        "note": "number?",
        "auteur": {
          "id": "number",
          "nom": "string"
        },
        "statut": "string" // "en_attente", "valide"
      }
    ]
  }
  ```
  - Cas de retour :
    - 200 OK : Feedbacks récupérés
    - 401 Unauthorized : Token invalide
    - 404 Not Found : Ressource non trouvée

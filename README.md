# ALTN72-java-project

DEVELOPPEMENT FULL STACK AVEC JAVA | S7 2024-25 | PROJET

## Installation

### Prérequis

- Back-end:

  - [Java 21](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
  - [Maven](https://maven.apache.org/download.cgi)

- Front-end:
  - [Node.js](https://nodejs.org/en/download/)
- Database:

  - [Docker Compose](https://docs.docker.com/compose/install/)

- Variable d'environnement:
  - A partir des .env.example présents dans les dossiers backend, frontend et database, créez des fichiers .env et renseignez les variables d'environnement.

### Installation

1. Lancez la base de données avec Docker Compose:

```bash
cd database && docker-compose up -d
```

2. Lancez le back-end:

```bash
cd backend && mvn spring-boot:run
```

3. Lancez le front-end:

```bash
cd frontend && npm install && npm start
```

## API Documentation

La documentation de l'API est disponible [ici](API_Documentation.md).

## Contributeurs

- [Maël AUBERT]()
- [Abdou KANDJI]()
- [Joseph PAVLOVSCHII]()
- [Sami BOUALAMI]()
- [Oscar BYRNE]()
- [Bamlak GURARA]()

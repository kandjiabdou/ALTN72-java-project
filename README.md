# 🌟 Hope Java Project  

**Hub of Platforms and Tools for Teaching**  
A resource management application designed for educators and students. It allows sharing educational resources with detailed descriptions, access methods, and the ability to add comments.  

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

---

## 📚 Context  

This project was developed as part of the **"Full Stack Development with Java"** course at **Efrei Paris**, under the supervision of **Professor Jacques AUGUSTIN**. It was created by students in the **I2 LSI class**.  

🌐 The website is live and accessible at: [https://java-project.maelaubert.fr/](https://java-project.maelaubert.fr/).  

---

## 🚀 Features  
- 📥 Add and manage educational resources.  
- 🛠️ Admin approval system for resource publication (approved, pending, or rejected).  
- 🔎 Students can browse and view approved resources.  
- 💬 Add comments on resources.  
- 🔐 Role-based access control for features.  

---

## 🔧 Prerequisites  

### Frontend  
- 🖥️ [Node.js](https://nodejs.org/) (v14+)  
- 📦 [npm](https://www.npmjs.com/) (v6+)  

### Backend  
- ☕ [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (v17+)  
- ⚙️ [Maven](https://maven.apache.org/) (v3.6+)  

### Database  
- 🐳 [Docker](https://www.docker.com/) (v20.10+)  
- 🛠️ [Docker Compose](https://docs.docker.com/compose/) (v1.29+)  

---

## ⚙️ Installation  

### Frontend  
1. 📄 Copy the `.env.example` file in the `frontend` directory to `.env` and adjust variables if needed:  
   ```sh
   cp frontend/.env.example frontend/.env
   ```  
2. Navigate to the `frontend` directory and install dependencies:  
   ```sh
   cd frontend
   npm install
   ```  
3. Start the development server:  
   ```sh
   npm run dev
   ```  

### Backend  
1. 📄 Configure `application.properties` for Spring Boot in the `backend` directory.  
2. Navigate to the `backend` directory and run the app:  
   ```sh
   cd backend
   mvn spring-boot:run
   ```  

### Database  
1. 📄 Copy the `.env.example` file in the `database` directory to `.env` and adjust variables if needed:  
   ```sh
   cp database/.env.example database/.env
   ```  
2. Start MariaDB using Docker Compose:  
   ```sh
   docker-compose up -d
   ```  

---

## 📖 Usage  

On the first launch, the database will be initialized with the following default accounts:  

| Role       | Username      | Password     |  
|------------|---------------|--------------|  
| 👨‍💼 Admin      | `admin`       | `admin123`   |  
| 👨‍🏫 Professor  | `prof`        | `prof123`    |  
| 👨‍🎓 Student    | `etudiant`    | `etudiant123`|  

🔑 Log in using the admin account to create, modify, or delete additional accounts.  

---

## 👥 Authors  

- ✨ Maël AUBERT  
- ✨ Abdou KANDJI  
- ✨ Sami BOUALAMI  
- ✨ Oscar BYRNE  
- ✨ Bamlak GURARA  
- ✨ Joseph PAVLOVSCHII  

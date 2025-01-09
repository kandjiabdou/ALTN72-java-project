# Étape 1 : Construire l'application
FROM maven:3.8.5-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Étape 2 : Exécuter l'application
FROM eclipse-temurin:17
WORKDIR /app
# Remplacez le chemin et le nom du fichier .jar par le bon nom
COPY --from=builder /app/target/HopeProject-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

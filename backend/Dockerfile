# Étape 1 : Construire l'application
FROM maven:3.8.5-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Étape 2 : Exécuter l'application
FROM eclipse-temurin:17
WORKDIR /app
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

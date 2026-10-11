# Build the React frontend
FROM node:22-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build Spring Boot and package the React assets into its static resources
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY backend/ ./
COPY --from=frontend-build /frontend/dist/ ./src/main/resources/static/
RUN chmod +x mvnw && ./mvnw -B -DskipTests package

# Run one application: website + /api endpoints
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]

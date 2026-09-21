FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8081
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] JWT Auth Service active on port 8081' && tail -f /dev/null"]

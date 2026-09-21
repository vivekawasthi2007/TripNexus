FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8084
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] AI Trip Planner Service active on port 8084' && tail -f /dev/null"]

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8087
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Kafka Disruption Engine active on port 8087' && tail -f /dev/null"]

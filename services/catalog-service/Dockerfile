FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8082
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Multi-Modal Catalog Service active on port 8082' && tail -f /dev/null"]

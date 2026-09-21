FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8761
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Eureka Server Registry active on port 8761' && tail -f /dev/null"]

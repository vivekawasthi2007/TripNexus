FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Spring Cloud Gateway active on port 8080' && tail -f /dev/null"]

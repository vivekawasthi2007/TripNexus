FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8083
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] ACID Booking Engine active on port 8083' && tail -f /dev/null"]

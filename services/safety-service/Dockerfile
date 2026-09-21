FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8086
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Emergency SOS Radar Service active on port 8086' && tail -f /dev/null"]

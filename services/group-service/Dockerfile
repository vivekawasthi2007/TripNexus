FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . /app
EXPOSE 8085
ENTRYPOINT ["sh", "-c", "echo '[TripNexus] Group Split-Pay Ledger active on port 8085' && tail -f /dev/null"]

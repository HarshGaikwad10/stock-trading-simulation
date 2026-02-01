FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/stock-trading-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5456

ENTRYPOINT ["java", "-jar", "app.jar"]

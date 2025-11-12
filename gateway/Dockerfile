# ==== Etapa de compilación ====
FROM maven:3.9.6-eclipse-temurin-17-focal AS builder

# Establecer directorio de trabajo
WORKDIR /build

# Copiar el pom.xml primero para aprovechar la caché de capas de Docker
COPY pom.xml .

# Descargar dependencias (esto quedará en caché si el pom.xml no cambia)
RUN mvn dependency:go-offline

# Copiar el código fuente
COPY src ./src

# Compilar la aplicación omitiendo tests
RUN mvn package -DskipTests

# ==== Etapa de ejecución ====
FROM eclipse-temurin:17-jre-focal

# Metadata
LABEL maintainer="Grupo 114 <grupo114@example.com>"
LABEL version="1.0"
LABEL description="API Gateway para Sistema de Logística de Contenedores"

# Crear un usuario no root para ejecutar la aplicación
RUN addgroup --system --gid 1001 appgroup \
    && adduser --system --uid 1001 --group appgroup

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el JAR desde la etapa de compilación
COPY --from=builder /build/target/*.jar app.jar

# Cambiar la propiedad del archivo al usuario no root
RUN chown appgroup:appgroup app.jar

# Cambiar al usuario no root
USER 1001

# Variables de entorno por defecto
ENV SPRING_PROFILES_ACTIVE=docker
ENV SERVER_PORT=8080
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Puerto que expone la aplicación
EXPOSE 8080

# Script de inicio con configuraciones de JVM
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar"]

# Healthcheck para verificar que la aplicación está funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

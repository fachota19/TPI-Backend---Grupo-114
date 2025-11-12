# 🚢 Sistema de Logística de Contenedores
**Trabajo Práctico Integrador – Backend de Aplicaciones (UTN FRC)**  
**Grupo 114**

---

## 🧩 Descripción general

El sistema gestiona el transporte de contenedores entre depósitos y clientes.  
Está desarrollado bajo una **arquitectura de microservicios** basada en **Spring Boot**, con **autenticación centralizada mediante Keycloak** y comunicación vía **API Gateway**.

El objetivo es modelar un backend distribuido donde cada componente cumple un rol bien definido dentro del dominio logístico.

---

## ⚙️ Arquitectura

El sistema se compone de los siguientes servicios:

| Microservicio | Repositorio | Descripción |
|----------------|-------------|-------------|
| 🧑‍💼 **Usuarios** | [MS-Usuarios](https://github.com/fachota19/MS-Usuarios) | Gestiona usuarios del sistema y sus roles (cliente, transportista, operador). |
| 💰 **Tarifas** | [MS-Tarifas](https://github.com/fachota19/MS-Tarifas) | Administra tarifas y calcula el costo estimado de traslados. |
| 🚛 **Camiones** | [MS-Camiones](https://github.com/fachota19/MS-Camiones) | Administra la flota de camiones, depósitos y transportistas. |
| 📦 **Solicitudes** | [MS-Solicitudes](https://github.com/fachota19/MS-Solicitudes) | Gestiona solicitudes de transporte, tramos y seguimiento del viaje. |

Servicios adicionales:

| Componente | Descripción |
|-------------|--------------|
| 🌐 **API Gateway** | Redirige peticiones a cada microservicio (Spring Cloud Gateway). |
| 🧠 **Keycloak** | Autenticación y gestión de roles (OAuth2 / JWT). |
| 🐘 **PostgreSQL** | Base de datos relacional por microservicio. |

---

## 🧱 Diagrama de arquitectura

📄 [Arquitectura C4.pdf](./Arquitectura%20C4.pdf)  
📄 [DER.pdf](./DER.pdf)

---

## 📡 Endpoints principales

El diseño de la API está documentado en formato OpenAPI:  
📄 [swagger.json](./swagger.json)

Ejemplos de endpoints:

| Servicio | Endpoint base | Ejemplo |
|-----------|---------------|----------|
| Usuarios | `/usuarios` | `GET /usuarios` |
| Tarifas | `/tarifas` | `POST /tarifas/calcular` |
| Camiones | `/camiones` | `GET /camiones/disponibles` |
| Solicitudes | `/solicitudes` | `GET /solicitudes/{id}/seguimiento` |

---

## 🐳 Despliegue local (Docker Compose)
### 🔧 Requisitos
- Docker (Desktop) instalado
- Docker Compose (v2) o docker-compose instalado
- JDK 17+ (si compilas/ejecutas localmente los microservicios fuera de contenedores)
- Maven 3.9+ (solo para desarrollo local)

> Nota: las instrucciones asumen que ejecutas los comandos desde el directorio raíz del repositorio.

### ▶️ Levantar el entorno (rápido)
1. Sitúate en la carpeta raíz del proyecto:

```bash
cd TPI-Backend---Grupo-114
```

2. Levanta los servicios en segundo plano (recomendado):

```bash
docker-compose up -d --build
```

3. Verifica que los contenedores estén activos:

```bash
docker-compose ps
```

### 🔍 Servicios y puertos relevantes
- API Gateway: http://localhost:8080
- Keycloak (admin): http://localhost:8081
- pgAdmin (UI): http://localhost:5050

Postgres (contenedores -> puertos expuestos en host):
- usuarios-db -> host:5433 (contenedor puerto 5432)
- tarifas-db -> host:5434
- camiones-db -> host:5435
- solicitudes-db -> host:5436

### Credenciales por defecto de pgAdmin (definidas en `docker-compose.yml`)
- Email: `admin@admin.com`
- Password: `admin`

Accede a pgAdmin en http://localhost:5050 e inicia sesión con esas credenciales.

### Conectar pgAdmin a las bases de datos del proyecto
Si añades la conexión desde la interfaz de pgAdmin que corre en el mismo Docker Compose, usa:

- Host: el nombre del servicio (por ejemplo `usuarios-db`)
- Port: `5432`
- Username: `postgres`
- Password: `postgres`

Si conectas desde tu máquina host (fuera de Docker), usa `localhost` y el puerto mapeado (por ejemplo `5433` para `usuarios-db`).

### Cambiar la contraseña de pgAdmin
Hay dos opciones sencillas:

1) Editar `docker-compose.yml` directamente

 - Localiza el servicio `pgadmin` y modifica la línea `PGADMIN_DEFAULT_PASSWORD: admin` por la contraseña deseada.
 - Luego recrea el servicio:

```bash
docker-compose down
docker-compose up -d --build
```

2) Usar una variable de entorno (más limpia)

 - Crea un archivo `.env` en la raíz con por ejemplo:

```env
# .env
PGADMIN_DEFAULT_PASSWORD=MiClaveSegura123
PGADMIN_DEFAULT_EMAIL=admin@admin.com
```

 - Modifica `docker-compose.yml` para que use esas variables (ejemplo):

```yaml
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
```

 - Finalmente recrea los servicios:

```bash
docker-compose down
docker-compose up -d --build
```

> Importante: evita usar contraseñas sencillas (`admin`) en entornos reales o compartidos.

### Comandos útiles
- Ver logs de todos los servicios:

```bash
docker-compose logs -f
```

- Ver logs de un servicio específico (ej. pgadmin):

```bash
docker-compose logs -f pgadmin
```

- Detener y eliminar contenedores (sin borrar volúmenes):

```bash
docker-compose down
```

- Detener y eliminar contenedores y volúmenes (p. ej. para reinicio limpio):

```bash
docker-compose down -v
```

### Seguridad y notas finales
- Las credenciales por defecto en `docker-compose.yml` (`postgres:postgres`, `admin:admin`) son válidas solo para desarrollo.
- Para producción, añade gestión de secretos (Vault / Docker secrets / variables de entorno seguras) y no expongas puertos innecesarios.

Si quieres, puedo crear un ejemplo de `.env.sample` y aplicar los cambios mínimos en `docker-compose.yml` para leer las variables desde `.env`.


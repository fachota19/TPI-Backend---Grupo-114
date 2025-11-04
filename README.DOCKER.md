# README – Docker

Este documento contiene instrucciones específicas para ejecutar el proyecto usando Docker (Docker Compose). Está pensado para desarrollo local.

## Requisitos

- Docker Desktop instalado (o Docker Engine)
- Docker Compose (v2) o la versión clásica `docker-compose`
- Tener permisos para ejecutar Docker en tu máquina

> Nota: en Windows con WSL2 puedes usar tu shell Bash (por ejemplo `bash.exe`) para ejecutar los comandos.

## Levantar el entorno (rápido)

1. Abre una terminal y sitúate en la raíz del repositorio:

```bash
cd "G:/Otros ordenadores/Mi PC/BDA/TPI/Proyecto/TPI-Backend---Grupo-114"
```

2. Levanta el conjunto de contenedores en segundo plano (reconstruye imágenes si hay cambios):

```bash
docker-compose up -d --build
```

3. Verifica el estado de los servicios:

```bash
docker-compose ps
```

4. Para ver logs en tiempo real (todos los servicios):

```bash
docker-compose logs -f
```

O logs de un servicio específico (ej. pgadmin):

```bash
docker-compose logs -f pgadmin
```

## Servicios y puertos expuestos (por defecto en `docker-compose.yml`)

- API Gateway: http://localhost:8080
- Keycloak (interfaz): http://localhost:8081
- pgAdmin (interfaz web): http://localhost:5050

Bases de datos PostgreSQL (contenedor -> puerto mapeado en host):

- usuarios-db -> host:5433 (contenedor 5432)
- tarifas-db -> host:5434
- camiones-db -> host:5435
- solicitudes-db -> host:5436

## Credenciales por defecto de pgAdmin

Estos valores vienen definidos en el `docker-compose.yml` actual:

- Email: `admin@admin.com`
- Password: `admin`

Accede a pgAdmin en http://localhost:5050 con esas credenciales.

## Cómo conectar pgAdmin a las bases de datos del proyecto

Dentro de la interfaz de pgAdmin (ejecutándose en Docker Compose) crea una nueva conexión (Server -> Create -> Server) y usa:

- Name: `usuarios-db` (o cualquier nombre descriptivo)
- Host: `usuarios-db` (nombre del servicio Docker Compose)
- Port: `5432`
- Maintenance DB: `usuariosdb` (según servicio)
- Username: `postgres`
- Password: `postgres`

Si estás conectando desde tu host (fuera de Docker), usa `localhost` y el puerto mapeado (p. ej. `5433` para `usuarios-db`).

## Cambiar la contraseña de pgAdmin

Opción A — Editar `docker-compose.yml` directamente

1. En el bloque `pgadmin` cambia:

```yaml
PGADMIN_DEFAULT_EMAIL: admin@admin.com
PGADMIN_DEFAULT_PASSWORD: admin
```

por las credenciales que quieras.

2. Recraga el servicio:

```bash
docker-compose down
docker-compose up -d --build
```

Opción B — Usar un archivo `.env` (recomendado para no versionar contraseñas)

1. Crea un archivo `.env` en la raíz del repo con contenido similar:

```env
# .env (NO subir a git)
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=MiClaveSegura123
```

2. Modifica `docker-compose.yml` para referenciar estas variables:

```yaml
environment:
  PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
  PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
```

3. Recrea los servicios:

```bash
docker-compose down
docker-compose up -d --build
```

> Importante: no subas el `.env` con contraseñas a repositorios públicos.

## Comandos útiles

- Detener y eliminar contenedores (mantener volúmenes):

```bash
docker-compose down
```

- Detener y eliminar contenedores y volúmenes (limpieza completa):

```bash
docker-compose down -v
```

- Reconstruir y reiniciar un servicio en particular (ej. api-gateway):

```bash
docker-compose up -d --build api-gateway
```

## Resolución de problemas comunes

- Si algún servicio no inicia, mira sus logs:

```bash
docker-compose logs <servicio>
```

- Si hay error de puerto en Windows, revisa que no haya procesos ocupando el puerto (p. ej. servicios locales de Postgres o IIS). Cambia el mapeo de puertos en `docker-compose.yml` si hace falta.

- Si el contenedor de Postgres no arranca por datos corruptos, prueba eliminar su volumen y recrearlo (esto borra datos):

```bash
docker-compose down -v
docker-compose up -d --build
```

## Seguridad y buenas prácticas

- No usar credenciales sencillas (`admin` / `postgres`) en entornos compartidos o producción.
- Gestionar secretos con `.env` fuera de control de versiones o con Docker Secrets / Vault.
- En producción no expongas puertos de base de datos directamente al host sin controles adicionales.

## ¿Qué más puedo hacer por vos?

- Puedo crear un archivo ` .env.sample` y aplicar los cambios mínimos en `docker-compose.yml` para que lea las variables desde `.env`.
- Puedo añadir instrucciones específicas para Windows (PowerShell) si las necesitás.

Si querés, creo el `.env.sample` ahora y ajusto `docker-compose.yml` para usarlo.

📦 TPI Backend – Grupo 114
Sistema de Gestión de Logística de Contenedores

Universidad Tecnológica Nacional – Facultad Regional Córdoba
Materia: Backend de Aplicaciones
Año: 2025

🧑‍🤝‍🧑 Integrantes

[Nombres del Grupo 114]
(Completarlo con los nombres reales)

🧭 Descripción del Proyecto

Este Trabajo Práctico Integrador implementa un sistema backend distribuido basado en microservicios, diseñado para gestionar la logística de contenedores en una empresa de transporte.

El sistema permite administrar:

Solicitudes de transporte de contenedores

Tarifas asociadas a rutas y tramos

Gestión de clientes, operadores y transportistas

Administración de camiones y depósitos

La infraestructura completa se orquesta desde este repositorio mediante Docker Compose, incluyendo:

4 microservicios independientes

Bases de datos PostgreSQL aisladas

Servidor de autenticación Keycloak

API Gateway para unificación del backend

Aplicación Frontend (Vite + React)

🏛 Arquitectura General

El proyecto sigue una arquitectura basada en microservicios, donde cada MS es completamente independiente:

Microservicio	Funcionalidad	Puerto
MS-Solicitudes	Solicitudes, rutas, tramos	8085
MS-Usuarios	Usuarios, clientes, transportistas	8082
MS-Tarifas	Tarifas y valores base	8083
MS-Camiones	Camiones y depósitos	8084

Todos los microservicios se comunican exclusivamente a través del API Gateway.

🌐 API Gateway

El gateway unifica todas las rutas bajo:

http://localhost:8080/

Rutas expuestas:
/usuarios/**         
/clientes/**        
/transportistas/**  

/tarifas/**

/camiones/**
/depositos/**

/solicitudes/**
/tramos/**
/rutas/**


Además incluye:

Token Relay (integración con Keycloak)

Configuración global de CORS

Encabezados personalizados

Ruteo y filtrado reactivo

🔐 Autenticación – Keycloak

Se utiliza Keycloak 24 como Identity Provider.

URL:

http://localhost:8081


Credenciales de administración:

Usuario: admin
Password: admin


El realm se importa automáticamente desde:

/keycloak/realms/

🐳 Ejecución del Proyecto con Docker

Este repositorio actúa como proyecto padre que orquesta todos los componentes.

1️⃣ Clonar el repositorio
git clone https://github.com/<organizacion>/TPI-Backend---Grupo-114.git
cd TPI-Backend---Grupo-114

2️⃣ Asegurarse de tener los microservicios descargados

El proyecto requiere que existan estas carpetas (cada una proviene de su propio repo):

MS-Solicitudes/
MS-Usuarios/
MS-Tarifas/
MS-Camiones/

3️⃣ Levantar todo el sistema
docker compose up --build -d

4️⃣ Accesos principales
Servicio	URL
API Gateway	http://localhost:8080

Keycloak	http://localhost:8081

pgAdmin	http://localhost:5050

MS-Usuarios	http://localhost:8082

MS-Tarifas	http://localhost:8083

MS-Camiones	http://localhost:8084

MS-Solicitudes	http://localhost:8085
📁 Estructura del Repositorio
/
├── gateway/                  → API Gateway (Spring Cloud Gateway)
├── frontend/                 → Aplicación web (React + Vite)
├── MS-Solicitudes/           → (repo externo)
├── MS-Usuarios/              → (repo externo)
├── MS-Tarifas/               → (repo externo)
├── MS-Camiones/              → (repo externo)
├── keycloak/                 → Realms y configuración de autenticación
├── docker-compose.yml        → Orquestación completa del sistema
├── Arquitectura C4.pdf       → Documentación arquitectónica
├── DER.pdf                   → Diagrama entidad-relación
├── swagger.json              → Endpoints del sistema
└── README.md                 → Este archivo

🛠 Tecnologías Utilizadas

Java 17 + Spring Boot 3

Spring Cloud Gateway

Spring Security + OAuth2 + JWT

Keycloak 24

PostgreSQL 15

Docker & Docker Compose

React + Vite

Maven

🏁 Estado Actual del Proyecto

✔ Infraestructura Docker funcionando
✔ Microservicios integrados
✔ API Gateway operativo
✔ Keycloak configurado
✔ Bases de datos aisladas y persistentes
⬜ Integración Frontend (en progreso según grupo)

📄 Licencia

Proyecto académico desarrollado para fines educativos dentro de la UTN-FRC.
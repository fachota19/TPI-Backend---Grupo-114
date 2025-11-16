# 🚛 TPI Backend – Grupo 114

> **Sistema de Gestión de Logística de Contenedores**

<div align="center">

**Universidad Tecnológica Nacional – Facultad Regional Córdoba**  
Materia: Backend de Aplicaciones | Año 2025

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## 👥 Integrantes

**Grupo 114**

- [Nombre Integrante 1]
- [Nombre Integrante 2]
- [Nombre Integrante 3]

---

## 📖 Descripción del Proyecto

Sistema backend distribuido basado en **microservicios** para gestionar la logística de contenedores en una empresa de transporte. Implementa una arquitectura moderna, escalable y resiliente utilizando las mejores prácticas de desarrollo.

### 🎯 Funcionalidades Principales

- 📋 **Gestión de Solicitudes** - Administración completa de solicitudes de transporte
- 💰 **Sistema de Tarifas** - Cálculo dinámico de tarifas por rutas y tramos
- 👥 **Gestión de Usuarios** - Clientes, operadores y transportistas
- 🚚 **Administración de Flota** - Control de camiones y depósitos
- 🔐 **Autenticación Centralizada** - OAuth2 con Keycloak
- 🌐 **API Unificada** - Gateway que centraliza todos los servicios

### 🏗️ Componentes del Sistema

La infraestructura se orquesta mediante **Docker Compose** e incluye:

- ✅ 4 Microservicios independientes
- ✅ Bases de datos PostgreSQL aisladas
- ✅ Servidor Keycloak para autenticación
- ✅ API Gateway unificador
- ✅ Aplicación Frontend (React + Vite)
- ✅ pgAdmin para gestión de bases de datos

---

## 🏛️ Arquitectura del Sistema

### Microservicios

| Microservicio | Funcionalidad | Puerto | Base de Datos |
|--------------|---------------|--------|---------------|
| 🚢 **MS-Solicitudes** | Gestión de solicitudes, rutas y tramos | 8085 | PostgreSQL |
| 👤 **MS-Usuarios** | Usuarios, clientes y transportistas | 8082 | PostgreSQL |
| 💵 **MS-Tarifas** | Tarifas y valores base | 8083 | PostgreSQL |
| 🚛 **MS-Camiones** | Camiones y depósitos | 8084 | PostgreSQL |

> **Nota:** Todos los microservicios se comunican exclusivamente a través del API Gateway, garantizando un punto único de entrada y control.

### Diagrama de Arquitectura

```
┌─────────────────┐
│   Frontend      │
│  (React+Vite)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Gateway   │ ◄── Keycloak (OAuth2)
│   Port: 8080    │
└────────┬────────┘
         │
    ┌────┴────┬────────┬─────────┐
    ▼         ▼        ▼         ▼
┌────────┐ ┌──────┐ ┌───────┐ ┌──────────┐
│Solicits│ │Tarifas│ │Usuarios│ │Camiones  │
│  8085  │ │ 8083 │ │  8082  │ │   8084   │
└───┬────┘ └──┬───┘ └───┬────┘ └────┬─────┘
    │         │         │           │
    ▼         ▼         ▼           ▼
   DB        DB        DB          DB
```

---

## 🌐 API Gateway

El gateway centraliza todas las peticiones bajo una única URL base:

```
http://localhost:8080/
```

### 🔌 Endpoints Disponibles

| Ruta | Microservicio |
|------|---------------|
| `/usuarios/**` | MS-Usuarios |
| `/clientes/**` | MS-Usuarios |
| `/transportistas/**` | MS-Usuarios |
| `/tarifas/**` | MS-Tarifas |
| `/camiones/**` | MS-Camiones |
| `/depositos/**` | MS-Camiones |
| `/solicitudes/**` | MS-Solicitudes |
| `/tramos/**` | MS-Solicitudes |
| `/rutas/**` | MS-Solicitudes |

### ⚙️ Características del Gateway

- 🔑 Token Relay (integración OAuth2 con Keycloak)
- 🌍 Configuración global de CORS
- 🏷️ Headers personalizados
- 🔀 Ruteo reactivo con Spring Cloud Gateway
- 🛡️ Filtros de seguridad y validación

---

## 🔐 Autenticación con Keycloak

El sistema utiliza **Keycloak 24** como Identity Provider para gestionar la autenticación y autorización.

### 🔗 Acceso

**URL:** http://localhost:8081

**Credenciales de Administrador:**
- 👤 Usuario: `admin`
- 🔑 Password: `admin`

### 📦 Configuración

El realm se importa automáticamente desde:
```
/keycloak/realms/
```

Incluye configuración pre-establecida de:
- Clientes OAuth2
- Roles y permisos
- Usuarios de prueba
- Flujos de autenticación

---

## 🚀 Guía de Instalación y Ejecución

### 📋 Prerequisitos

- Docker 20.10+
- Docker Compose 2.0+
- Git

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/<organizacion>/TPI-Backend---Grupo-114.git
cd TPI-Backend---Grupo-114
```

### 2️⃣ Verificar Estructura de Microservicios

Asegúrate de tener las siguientes carpetas (cada una es un repositorio independiente):

```
TPI-Backend---Grupo-114/
├── MS-Solicitudes/
├── MS-Usuarios/
├── MS-Tarifas/
├── MS-Camiones/
├── gateway/
├── frontend/
└── keycloak/
```

### 3️⃣ Levantar el Sistema Completo

```bash
docker compose up --build -d
```

Este comando:
- 🔨 Construye todas las imágenes necesarias
- 🚀 Levanta todos los contenedores
- 🔗 Configura la red interna
- 💾 Inicializa las bases de datos
- ⚙️ Configura Keycloak automáticamente

### 4️⃣ Verificar que Todo Esté Funcionando

```bash
docker compose ps
```

Todos los servicios deberían mostrar estado `Up`.

---

## 🔗 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🌐 **API Gateway** | http://localhost:8080 | Punto de entrada principal |
| 🔐 **Keycloak** | http://localhost:8081 | Administración de identidad |
| 💾 **pgAdmin** | http://localhost:5050 | Administración de BD |
| 👤 **MS-Usuarios** | http://localhost:8082 | Microservicio de usuarios |
| 💵 **MS-Tarifas** | http://localhost:8083 | Microservicio de tarifas |
| 🚛 **MS-Camiones** | http://localhost:8084 | Microservicio de camiones |
| 🚢 **MS-Solicitudes** | http://localhost:8085 | Microservicio de solicitudes |

---

## 📁 Estructura del Repositorio

```
TPI-Backend---Grupo-114/
│
├── 🌐 gateway/                 # API Gateway (Spring Cloud Gateway)
├── 🎨 frontend/                # Aplicación web (React + Vite)
├── 🚢 MS-Solicitudes/          # Microservicio de solicitudes
├── 👤 MS-Usuarios/             # Microservicio de usuarios
├── 💵 MS-Tarifas/              # Microservicio de tarifas
├── 🚛 MS-Camiones/             # Microservicio de camiones
├── 🔐 keycloak/                # Configuración de autenticación
│   └── realms/                 # Definición del realm
├── 📄 docker-compose.yml       # Orquestación completa
├── 📊 Arquitectura C4.pdf      # Documentación arquitectónica
├── 🗄️ DER.pdf                  # Diagrama entidad-relación
├── 📋 swagger.json             # Especificación OpenAPI
└── 📖 README.md                # Este archivo
```

---

## 🛠️ Stack Tecnológico

### Backend
- ☕ **Java 17** - Lenguaje de programación
- 🍃 **Spring Boot 3** - Framework principal
- 🌥️ **Spring Cloud Gateway** - API Gateway
- 🔒 **Spring Security** - Seguridad
- 🎫 **OAuth2 + JWT** - Autenticación y autorización
- 🔐 **Keycloak 24** - Identity Provider

### Base de Datos
- 🐘 **PostgreSQL 15** - Base de datos relacional
- 🔧 **pgAdmin 4** - Administración de BD

### DevOps
- 🐳 **Docker** - Containerización
- 📦 **Docker Compose** - Orquestación
- 🔨 **Maven** - Gestión de dependencias

### Frontend
- ⚛️ **React 18** - Biblioteca UI
- ⚡ **Vite** - Build tool y dev server

---

## 📊 Estado del Proyecto

| Componente | Estado |
|------------|--------|
| ✅ Infraestructura Docker | Completado |
| ✅ Microservicios | Completado |
| ✅ API Gateway | Completado |
| ✅ Keycloak | Completado |
| ✅ Bases de Datos | Completado |
| 🚧 Frontend | En progreso |
| 📝 Documentación | En progreso |

---

## 📚 Documentación Adicional

- 📐 **Arquitectura C4:** Ver `Arquitectura C4.pdf`
- 🗄️ **Modelo de Datos:** Ver `DER.pdf`
- 📋 **API Documentation:** Ver `swagger.json`

---

## 🤝 Contribución

Este es un proyecto académico del Grupo 114. Para contribuir:

1. Crear una rama desde `main`
2. Realizar los cambios necesarios
3. Hacer commit con mensajes descriptivos
4. Crear un Pull Request para revisión

---

## 📝 Licencia

Proyecto académico desarrollado para fines educativos dentro de la **Universidad Tecnológica Nacional - Facultad Regional Córdoba (UTN-FRC)**.
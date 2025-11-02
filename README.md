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
- Docker y Docker Compose instalados
- JDK 17+ (para desarrollo local)
- Maven 3.9+

### ▶️ Levantar el entorno
1. Clonar este repositorio:
   ```bash
   git clone https://github.com/fachota19/TPI-Backend---Grupo-114.git
   cd TPI-Backend---Grupo-114
2. Ejecutar:
   ```bash
   docker-compose up --build


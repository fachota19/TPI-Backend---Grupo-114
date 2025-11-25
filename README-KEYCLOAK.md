🟪 PARTE 1 — Crear el Realm

Entrá a Keycloak:
👉 http://localhost:8081/admin

En el menú arriba a la izquierda → desplegá el selector de realm.

Clic en Create Realm.

Completá:

Realm name: tpi-backend
Enabled: YES


Guardar.

✔ Ya tenés tu realm.

🟪 PARTE 2 — Crear el Cliente del Frontend

En el menú izquierdo → Clients

Clic en Create Client

Completá:

Client ID: frontend-tpi
Client type: OpenID Connect
Always display in UI: ON


→ Next.

Configuración:

Client authentication: OFF   (importante)
Authorization: OFF
Standard Flow: ON
Implicit Flow: OFF
Direct Access Grants: ON
Service Accounts: OFF


→ Next.

URIs (esta parte es clave):

Valid redirect URIs:
    http://localhost:5173/*

Web origins:
    http://localhost:5173


MUY IMPORTANTE: NO uses “*” acá.
Ahora sí → Save.

✔ El frontend ya puede loguearse.

🟪 PARTE 3 — Crear Roles del Sistema

En tu TPI necesitás al menos:

cliente

transportista

operador

Menú izquierdo → Realm Roles

Clic en Add Role

Creá uno por uno:

Name: cliente
Description: Puede crear solicitudes y ver su seguimiento

Name: transportista
Description: Puede iniciar y finalizar tramos

Name: operador
Description: Administra camiones, depósitos y solicitudes


✔ Listo.

🟪 PARTE 4 — Crear Usuarios

Menú izquierdo → Users

Add User

Ejemplo:

Usuario 1 (cliente)

Username: cliente1
Email: cliente@gmail.com
Enabled: YES
Email verified: YES


Guardar.

Ir a la tab Credentials

Set password
Password: cliente123
Temporary: OFF


Guardar.

Ir a Role Mappings y asignarle:

👉 Available Roles → cliente → Add

Usuario 2 (transportista)

Username: chofer1
password: chofer123
Role: transportista


Usuario 3 (operador)

Username: admin1
password: admin123
Role: operador


✔ Listo.

🟪 PARTE 5 — Verificar que Keycloak está bien configurado

Entrar a:

👉 http://localhost:8081/realms/tpi-backend/.well-known/openid-configuration

Debe mostrar (como tu JSON):

issuer: http://localhost:8081/realms/tpi-backend
...


Abrir login desde una pestaña:

👉 http://localhost:8081/realms/tpi-backend/protocol/openid-connect/auth?client_id=frontend-tpi&redirect_uri=http://localhost:5173&response_type=code&scope=openid

Si aparece login → está perfecto.

🟪 PARTE 6 — Probar el Frontend

Cuando navegues a:

👉 http://localhost:5173

Debe:

Redirigirte a Keycloak

Iniciar sesión

Volver al frontend

Mostrar la app (y NO la X gigante)
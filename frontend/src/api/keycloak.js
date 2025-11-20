import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "tpi-backend",
  clientId: "frontend-tpi",
});

export default keycloak;

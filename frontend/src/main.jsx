import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import keycloak from './api/keycloak.js'

keycloak.init({
  onLoad: 'login-required'
}).then(authenticated => {
  if (!authenticated) {
    window.location.reload();
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

}).catch(err => {
  console.error("Keycloak init error", err);
});

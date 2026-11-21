// Développement : les appels /api/* sont redirigés vers http://localhost:8081
// par proxy.conf.json (aucun problème de CORS avec `npm start`).
export const environment = {
  production: false,
  apiUrl: ''
};

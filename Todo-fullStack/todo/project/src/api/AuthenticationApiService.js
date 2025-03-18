import { client } from "./ApiClient";

function executeBasicAuthentication(token) {
  return client.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
}

function executeJwtAuthentication(username, password) {
  return client.post(`/authenticate`, {
    username,
    password,
  });
}

export default {executeBasicAuthentication,executeJwtAuthentication} // Default export
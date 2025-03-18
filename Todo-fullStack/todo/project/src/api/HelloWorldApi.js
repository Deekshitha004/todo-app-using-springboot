// This file contains the API calls related to the HelloWorld component
import {client} from './ApiClient'
//import { executeBasicAuthentication } from "./AuthenticationApiService";
export function retrieveHelloWorld(token) {
  return client.get("/helloWorld", {
    headers: {
      Authorization: token, // Include the Basic Authentication token
    },
  });
}

function executeBasicAuthentication(token) {
    return client.get(`/basicauth`, {
      headers: {
        Authorization: token, // Include the Basic Authentication token
      },
    });
}

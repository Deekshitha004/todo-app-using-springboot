import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
      "Content-type": "application/json",
    },
  });

  export { client };
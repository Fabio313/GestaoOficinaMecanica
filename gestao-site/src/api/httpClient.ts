import axios from "axios";

const http = axios.create({
  baseURL: "http://gestao.mecanica/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

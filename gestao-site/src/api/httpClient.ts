import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:44308/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

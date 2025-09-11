// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend rodando no localhost
});

export default api;

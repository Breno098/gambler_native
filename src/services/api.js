import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;
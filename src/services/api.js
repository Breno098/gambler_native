import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://btpkq8ic.srv-45-34-12-242.webserverhost.top/api",
});

export default api;
import axios from "axios";

const API_BASE_URL = "http://192.168.68.112:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export default api;
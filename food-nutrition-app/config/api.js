import axios from "axios";

// const API_BASE_URL = "http://192.168.68.112:8000";
// const API_BASE_URL = "http://10.188.34.203:8000";     // for phone network
const API_BASE_URL = "https://nutrifyu-backend.onrender.com";     // for deployed backend

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

export default api;
import axios from "axios";
// some default configs
const API_ENDPOINT = "http://localhost:5000/fast-admin";
const apiClient = axios.create({
  baseURL: API_ENDPOINT,
});

export default apiClient;

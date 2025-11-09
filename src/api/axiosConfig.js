import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;



const api = axios.create({
  baseURL: `${API_BASE_URL}`, // URL backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
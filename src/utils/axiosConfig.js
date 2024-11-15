// src/utils/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust based on your backend URL
});

export default api;
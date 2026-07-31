
import axios from 'axios';

// Видаляємо стару логіку baseURL
// axios.defaults.baseURL = 'https://notehub-api.goit.study/api'

// Створюємо інстанс axios
const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true, 
});
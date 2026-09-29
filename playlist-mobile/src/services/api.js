import axios from 'axios';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// "localhost" solo funciona en navegador. En emulador Android hay que usar 10.0.2.2.
// En dispositivo físico, reemplaza por la IP de tu PC en la red local.
function resolveBaseUrl() {
  if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
    return 'http://10.0.2.2:3000/api';
  }
  return 'http://localhost:3000/api';
}

const api = axios.create({
  baseURL: resolveBaseUrl(),
});

// Requisito 8: header Authorization centralizado.
// Como Preferences es async, el interceptor también lo es (axios lo soporta).
api.interceptors.request.use(async (config) => {
  const { value: token } = await Preferences.get({ key: 'accessToken' });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await Preferences.remove({ key: 'accessToken' });
      await Preferences.remove({ key: 'user' });
    }
    return Promise.reject(error);
  },
);

export default api;

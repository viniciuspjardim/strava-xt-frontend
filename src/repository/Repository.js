import axios from 'axios';
import { store } from '../store/store';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  params: {}
});

instance.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

export default instance;
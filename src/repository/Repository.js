import axios from 'axios';
import { store } from '../store/store';

const baseDomain = 'http://localhost:3000';
const baseURL = `${baseDomain}/api`;

let headers;
const token = store.state.auth.token;
if(token) {
  headers = { 'x-auth-token': token };
  console.log('token');
}
else {
  console.log('no token');
}

export default axios.create({ baseURL, headers });
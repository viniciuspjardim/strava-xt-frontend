import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.interceptors.push((request, next) => {
  const authToken = store.state.jwtEncoded;
  if(authToken) {
    request.headers.set('x-auth-token', authToken);
  }
  next();
});

Vue.http.options.root = 'http://localhost:3000/api';
const router = new VueRouter({ routes, mode: 'history' });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

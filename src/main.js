import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = 'http://localhost:3000/api';
const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    auth: {
      token: null,
      athlete: null
    },
    activities: [],
    activitiesFilter: {
      page: 1,
      maxDate: null,
      minDate: null
    }
  }
});
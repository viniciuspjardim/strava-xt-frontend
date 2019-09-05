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
  },
  getters: {
    isLoggedIn: state => {
      if(state.auth.token) return true;
      else return false;
    },
    athlete: state => {
      return state.auth.athlete;
    },
    activities: state => {
      return state.activities;
    }
  },
  mutations: {
    login: (state, payload) => {
      state.auth.token = payload.token;
      state.auth.athlete = payload.athlete;
    },
    logout: state => {
      state.auth.token = null;
      state.auth.athlete = null;
    },
    setActivities: (state, payload) => {
      state.activities = payload;
    }
  }
});
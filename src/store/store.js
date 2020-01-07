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
    },
    message: {
      text: null,
      type: null,
      visible: false
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
    },
    message: state => {
      return state.message;
    }
  },
  mutations: {
    initialiseStore(state) {
			if(localStorage.getItem('auth')) {
				Object.assign(state.auth, JSON.parse(localStorage.getItem('auth')));
			}
		},
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
    },
    showMessage: (state, payload) => {
      state.message.text = payload.text;
      state.message.type = payload.type | 'info';
      state.message.visible = true;
      console.log(state.message);
    },
    clearMessage: state => {
      state.message.visible = false;
    }
  }
});

store.subscribe((mutation, state) => {
  if(mutation.type === 'login' || mutation.type === 'logout') {
    localStorage.setItem('auth', JSON.stringify(state.auth));
  }
});
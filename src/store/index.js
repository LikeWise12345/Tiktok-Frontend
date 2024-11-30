import Vue from 'vue';
import Vuex from 'vuex';
import apiClient from '../axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await apiClient.post('/auth/login/', credentials);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
    },
    async signup({ commit }, userData) {
      const response = await apiClient.post('/auth/signup/', userData);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
    },
  },
});

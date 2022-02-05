import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      fullName: "Seif Gharres",
    },
  },
  getters: {
    isAuth: (state) => !!state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    logout({ commit }) {
      commit("setUser", null);
      router.push("/login");
    },
  },
  modules: {},
});

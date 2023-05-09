import { createStore } from "vuex";
import axios from "axios";

const store = new createStore({
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const response = await axios.get(`http://localhost:3100/api/user/get-info`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const user = response.data;
      commit("setUser", user);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});
export default store;

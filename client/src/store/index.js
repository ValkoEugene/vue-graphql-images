import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "../main";
import { GET_POSTS } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: true,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getPosts: async ({ commit }) => {
      try {
        commit("setLoading", true);
        const { data } = await apolloClient.query({
          query: GET_POSTS,
        });
        commit("setPosts", data.getPosts);
      } catch (error) {
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
  },
  modules: {},
});

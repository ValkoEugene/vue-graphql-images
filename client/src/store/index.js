import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "../main";
import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from "../queries";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: true,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getCurrentUser: async ({ commit }) => {
      try {
        commit("setLoading", true);
        const { data } = await apolloClient.query({
          query: GET_CURRENT_USER,
        });
        console.log(data.getCurrentUser);
        commit("setUser", data.getCurrentUser);
      } catch (error) {
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
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
    signinUser: async ({ dispatch }, payload) => {
      try {
        const { data } = await apolloClient.mutate({
          mutation: SIGNIN_USER,
          variables: payload,
        });
        const { token } = data.signinUser;
        localStorage.setItem("token", token);

        await dispatch("getCurrentUser");
        console.log("router push /");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
    user: (state) => state.user,
  },
  modules: {},
});

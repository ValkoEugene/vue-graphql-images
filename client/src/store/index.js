import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "../main";
import {
  GET_POSTS,
  SIGNIN_USER,
  SIGNUP_USER,
  GET_CURRENT_USER,
  ADD_POST,
} from "../queries";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null,
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
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
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
        commit("setError", error);
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
        commit("setError", error);
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
    addPost: async ({ commit }, payload) => {
      try {
        commit("setLoading", true);
        const { data } = await apolloClient.mutate({
          mutation: ADD_POST,
          variables: payload,
        });
        console.log(data.addPost);
        // commit("setPosts", data.getPosts);
      } catch (error) {
        commit("setError", error);
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
    signinUser: async ({ dispatch, commit }, payload) => {
      try {
        commit("setLoading", true);
        commit("setError", null);

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
        commit("setError", error);
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
    signupUser: async ({ dispatch, commit }, payload) => {
      try {
        commit("setLoading", true);
        commit("setError", null);

        const { data } = await apolloClient.mutate({
          mutation: SIGNUP_USER,
          variables: payload,
        });
        const { token } = data.signupUser;
        localStorage.setItem("token", token);

        await dispatch("getCurrentUser");
        console.log("router push /");
        router.push("/");
      } catch (error) {
        commit("setError", error);
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
    signout: async ({ commit }) => {
      try {
        commit("setUser", null);
        localStorage.setItem("token", "");
        await apolloClient.resetStore();
        router.push("/signin");
      } catch (error) {
        commit("setError", error);
      }
    },
  },
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
    user: (state) => state.user,
    error: (state) => state.error,
    authError: (state) => state.authError,
  },
  modules: {},
});

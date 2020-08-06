import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // auth token for requests
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "");
    }

    // operation add token for auth header of requests
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },
  onError: ({ graphQlErrors, networkError }) => {
    if (networkError) {
      console.dir("networkError", networkError);
    }

    if (graphQlErrors) {
      for (const err of graphQlErrors) {
        console.dir("graphQlErrors", err);
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    const token = localStorage.getItem("token");
    const user = this.$store.state.user;

    if (token && user) {
      return;
    }

    console.log("created middleware", token, user);

    // execute getCurrentUser query
    token
      ? this.$store.dispatch("getCurrentUser")
      : this.$router.push("/signup");
  },
}).$mount("#app");

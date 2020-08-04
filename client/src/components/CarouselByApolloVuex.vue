<template>
  <v-container>
    <div v-if="loading">loading...</div>

    <caurosel v-else :posts="data.getPosts" />
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";
import { mapGetters } from "vuex";

export default {
  name: "CauroselByApolloQuery",
  components: {
    Caurosel: () => import("./Caurosel.vue"),
  },
  computed: {
    ...mapGetters(["posts", "loading"]),
  },
  created() {
    this.$store.dispatch("getPosts");
  },
};
</script>

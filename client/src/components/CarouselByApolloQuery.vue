<template>
  <v-container>
    <ApolloQuery :query="GET_POSTS">
      <template #default="{ result: { loading, data, error  } }">
        <div v-if="loading || !data">loading...</div>

        <div v-else-if="error">{{ error.message }}</div>

        <caurosel v-else :posts="data.getPosts" />
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { GET_POSTS } from "../queries";

export default {
  name: "CauroselByApolloQuery",
  components: {
    Caurosel: () => import("./Caurosel.vue"),
  },
  data: () => ({
    GET_POSTS,
  }),
};
</script>

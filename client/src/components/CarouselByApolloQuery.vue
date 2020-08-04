<template>
  <v-container>
    <ApolloQuery :query="getPostsQuery">
      <template #default="{ result: { loading, data, error  } }">
        <div>
          {{ loading }}
        </div>
        <div v-if="loading || !data">loading...</div>

        <div v-else-if="error">{{ error.message }}</div>

        <caurosel v-else :posts="data.getPosts" />
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "CauroselByApolloQuery",
  components: {
    Caurosel: () => import("./Caurosel.vue"),
  },
  data: () => ({
    getPostsQuery: gql`
      query getPosts {
        getPosts {
          _id
          title
          imageUrl
          description
        }
      }
    `,
  }),
};
</script>

<style scoped>
.carousel__title {
  background: rgb(0 0 0 / 69%);
  position: absolute;
  width: 100%;
  bottom: 0px;
  text-align: center;
  padding-bottom: 40px;
}
</style>

<template>
  <v-container>
    <CauroselByApolloQuery />
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    CauroselByApolloQuery: () => import("./CarouselByApolloQuery.vue"),
  },
  mounted() {
    this.handleGetCarouselPosts();
  },
  methods: {
    handleGetCarouselPosts() {
      this.$store.dispatch("getPosts");
    },
  },
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

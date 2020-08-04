<template>
  <v-flex xs12>
    <v-carousel v-bind="{ cucle: true }" interval="3000">
      <v-carousel-item
        v-for="post in posts"
        :key="post._id"
        :src="post.imageUrl"
      >
        <h1 class="carousel__title">{{ post.title }}</h1>
      </v-carousel-item>
    </v-carousel>
  </v-flex>
</template>

<script>
export default {
  name: "Caurosel",
  props: {
    posts: {
      type: Array,
      required: true,
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

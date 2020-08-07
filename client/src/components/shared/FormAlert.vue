<template>
  <v-alert type="error" :value="true" dismissible>
    <h2>
      {{ message }}
    </h2>
  </v-alert>
</template>

<script>
export default {
  name: "FormAlert",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>

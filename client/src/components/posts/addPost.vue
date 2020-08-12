<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-row wrap>
      <v-col xs12 sm6 offset-sm3>
        <h1>Add Post</h1>
      </v-col>
    </v-row>

    <v-row wrap>
      <v-col xs12 sm6 offset-sm3>
        <v-form ref="form">
          <v-text-field
            v-model="title"
            placeholder="Post title"
            type="text"
            :rules="[requiredRule]"
          />

          <v-text-field
            v-model="imageUrl"
            placeholder="Image title"
            type="text"
            :rules="[requiredRule]"
          />

          <v-select
            v-model="categories"
            :items="['Art', 'Education', 'Travel']"
            :rules="[requiredRule]"
            label="Categories"
            multiple
          />

          <v-textarea
            v-model="description"
            :rules="[requiredRule]"
            label="Description"
          />

          <v-row>
            <v-col xs12>
              <v-btn
                :loading="loading"
                color="accent"
                type="button"
                @click="addPost"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddPost",
  data: () => ({
    title: "post",
    imageUrl:
      "https://habrastorage.org/webt/6h/fr/sj/6hfrsjxff-_9at1g9u2xhdlcqom.png",
    description: "desc",
    categories: [],
  }),
  computed: {
    ...mapGetters(["loading", "user"]),
  },
  methods: {
    requiredRule(v) {
      if (Array.isArray(v)) {
        return !!v.length || "Field is required";
      }

      return !!v || "Field is required";
    },
    addPost() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.dispatch("addPost", {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        categories: this.categories,
        creatorId: this.user._id,
      });

      this.$router.push("/");
    },
  },
};
</script>

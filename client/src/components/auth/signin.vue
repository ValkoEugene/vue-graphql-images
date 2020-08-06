<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-row wrap>
      <v-col xs12 sm6 offset-sm3>
        <h1>Welcom Back!</h1>
      </v-col>
    </v-row>

    <v-row wrap>
      <v-col xs12 sm6 offset-sm3>
        <v-card color="primary" dark>
          <v-container>
            <v-form ref="form">
              <v-text-field
                v-model="username"
                prepend-icon="face"
                type="text"
                :rules="[(v) => !!v || 'Field is required']"
              />
              <v-text-field
                v-model="password"
                prepend-icon="extension"
                type="password"
                :rules="[(v) => !!v || 'Field is required']"
              />

              <v-row>
                <v-col xs12>
                  <v-btn color="accent" type="button" @click="signinUser">
                    Signin
                  </v-btn>
                  <h3>
                    Dont have an account
                    <v-btn link text to="/signup">
                      Signup
                    </v-btn>
                  </h3>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data: () => ({
    username: "",
    password: "",
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async signinUser() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

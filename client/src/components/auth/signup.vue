<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-row wrap>
      <v-col xs12 sm6 offset-sm3>
        <h1>Create account!</h1>
      </v-col>
    </v-row>

    <v-row v-if="error" wrap>
      <v-col sx12 sm6 offset-sm3>
        <form-alert :message="error.message" color="error" />
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
                :rules="usernameRules"
              />
              <v-text-field
                v-model="email"
                prepend-icon="email"
                type="email"
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                prepend-icon="extension"
                type="password"
                :rules="passwordRules"
              />
              <v-text-field
                v-model="passwordConfirm"
                prepend-icon="gavel"
                type="password"
                :rules="passwordConfirmRules"
              />

              <v-row>
                <v-col xs12>
                  <v-btn
                    :loading="loading"
                    color="accent"
                    type="button"
                    @click="signunUser"
                  >
                    Signup
                  </v-btn>
                  <h3>
                    Alreade have account
                    <v-btn link text to="/signin">
                      Signin
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
  name: "SignUp",
  components: {
    FormAlert: () => import("../shared/FormAlert.vue"),
  },
  data: () => ({
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
    usernameRules: [
      (v) => !!v || "Field is required",
      (v) => v.length >= 3 || "Min 3 char",
    ],
    emailRules: [
      (v) => !!v || "Field is required",
      (v) => /.@+./.test(v) || "Email must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Field is required",
      (v) => v.length >= 4 || "Min 4 char",
    ],
  }),
  computed: {
    ...mapGetters(["error", "loading"]),
    passwordConfirmRules() {
      return [
        (v) => !!v || "Field is required",
        (v) => {
          const notValid = v && this.password && v !== this.password;
          return !notValid || "Passwords Dont Match";
        },
      ];
    },
  },
  methods: {
    signunUser() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.dispatch("signupUser", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

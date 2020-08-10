<template>
  <v-app style="background: #e3e3ee">
    <v-navigation-drawer v-model="sideNav" :width="300" app temprory fixed>
      <v-list color="primary" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav" />

        <router-link to="/" tag="span" style="cursor: pointer;">
          Vue GraphQL images
        </router-link>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="item in sideNavItems"
          :key="item.link"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card flat tile>
      <v-toolbar color="primary" dense>
        <v-app-bar-nav-icon @click="toggleSideNav" />

        <v-toolbar-title>Vue GraphQL images</v-toolbar-title>

        <v-spacer />

        <v-text-field
          fixed
          name="post-search"
          prepend-icon="search"
          placeholder="Search posts"
          color="accent"
          single="line"
          hide-details
        />

        <v-spacer />

        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            v-for="item in headerButtonItems"
            :key="item.link"
            :to="item.link"
            text
          >
            <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <v-btn v-if="user" text to="/profile">
            <v-icon class="hidden-sm-only">account_box</v-icon>
            <v-badge>
              <template #badge>
                <span>
                  1
                </span>
              </template>
              Profile
            </v-badge>
          </v-btn>

          <v-btn v-if="user" text @click="signout">
            <v-icon class="hidden-sm-only">
              exit_to_app
            </v-icon>
            Signout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>

        <v-snackbar
          v-model="authSnackbar"
          :timeout="2000"
          color="success"
          bottom
          left
        >
          <v-icon class="mr-3">check_circle</v-icon>
          You are now signed in!
          <v-btn dark text @click="authSnackbar = false">
            Close
          </v-btn>
        </v-snackbar>

        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          :timeout="2000"
          color="error"
          bottom
          left
        >
          <v-icon class="mr-3">cancel</v-icon>
          {{ authError.message }}
          <v-btn dark text to="/signin">
            Signin
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    sideNav: false,
    authSnackbar: false,
    authErrorSnackbar: false,
  }),
  watch: {
    user(value, old) {
      if (!old && value) {
        this.authSnackbar = true;
      }
    },
    authError(value, old) {
      if (!old && value) {
        this.authErrorSnackbar = true;
      }
    },
  },
  computed: {
    ...mapGetters(["user", "authError"]),
    headerButtonItems() {
      const items = [];

      items.push({ icon: "chat", title: "Posts", link: "/posts" });

      if (!this.user) {
        items.push({ icon: "lock_open", title: "Sign In", link: "/signin" });
        items.push({ icon: "create", title: "Sign Up", link: "/signup" });
      }

      return items;
    },
    sideNavItems() {
      const items = [];

      items.push({ icon: "chat", title: "Posts", link: "/posts" });

      if (!this.user) {
        items.push({ icon: "lock_open", title: "Sign In", link: "/signin" });
        items.push({ icon: "create", title: "Sign Up", link: "/signup" });
      } else {
        items.push({ icon: "stars", title: "Create Post", link: "/post/add" });
        items.push({ icon: "account_box", title: "Profile", link: "/profile" });
      }

      return items;
    },
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    signout() {
      this.$store.dispatch("signout");
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>

<template>
  <v-app style="background: #e3e3ee">
    <v-navigation-drawer v-model="sideNav" width="300" app temprory fixed>
      <v-toolbar color="primary" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav" />

        <router-link to="/" tag="span" style="cursor: pointer;">
          <h1>Vue GraphQL images</h1>
        </router-link>
      </v-toolbar>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="item in headerButtonItems"
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
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    sideNav: false,
    headerButtonItems: [
      { icon: "chat", title: "Posts", link: "/posts" },
      { icon: "lock_open", title: "Sign In", link: "/signin" },
      { icon: "create", title: "Sign Up", link: "/signup" },
    ],
  }),
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
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

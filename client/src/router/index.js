import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("../components/posts/posts.vue"),
  },
  {
    path: "/post/add",
    name: "PostsAdd",
    component: () => import("../components/posts/addPost.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/auth/signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../components/auth/signin.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/auth/profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

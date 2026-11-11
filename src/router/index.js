import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
  // base: "http://localhost:5174",
  // screens are switched by hash in Home.vue, which also handles scrolling
  scrollBehavior() {
    return false;
  },
});

export default router;

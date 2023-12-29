import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    console.log("scrolling");
    console.log(to);
    let elm;
    if (to.hash) {
      elm = document.querySelector(to.hash);
    }

    // always scroll to top
    return { top: elm?.offsetTop || 0, behavior: "smooth" };
  },
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/home',
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Yuncun",
    name: "Yuncun",
    component: () => import("@/views/Yuncun.vue")
  },
  {
    path: "/Video",
    name: "Video",
    component: () => import("@/views/Video.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
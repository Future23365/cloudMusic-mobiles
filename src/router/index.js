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
    children: [
      {
        path: "Playlist",
        name: "Playlist",
        component: () => import("@/components/Playlist.vue")
      }
    ]
  },
  {
    path: "/Yuncun",
    name: "Yuncun",
    component: () => import("@/views/Yuncun.vue"),
    children: [
      {
        path: "Hotwall",
        name: "Hotwall",
        component: () => import("@/components/Hotwall.vue")
      }
      
    ]
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

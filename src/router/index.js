import Vue from "vue";
import VueRouter from "vue-router";
import Enter from "@/views/Enter.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/Home',
  },
  {
    path: "/Home",
    component: Enter,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "Yuncun",
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
        path: "Video",
        name: "Video",
        component: () => import("@/views/Video.vue")
      },
    ]
  },
  {
    path: "/Playlist",
    name: "Playlist",
    component: () => import("@/components/Playlist")
  }
];

const router = new VueRouter({
  routes
});

export default router;

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
  },
  {
    path: "/Toplist",
    name: "Toplist",
    component: () => import("@/components/Toplist")
  },
  {
    path: "/Detail",
    name: "Detail",
    component: () => import("@/components/Detail")
  },
  {
    path: "/Playpage",
    name: "Playpage",
    component: () => import("@/components/Playpage")
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("@/components/Search"),
    children: [
      {
        path: "SearchResult",
        name: "SearchResult",
        component: () => import("@/components/SearchResult")
      }
    ]
  },
  {
    path: "/VideoPlay",
    name: "VideoPlay",
    component: () => import("@/components/VideoPlay")
  }
];

const router = new VueRouter({
  routes
});

export default router;

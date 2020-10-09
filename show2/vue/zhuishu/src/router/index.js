import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),

    children: [
      {
        path: "bookstore",
        name: "Bookstore",
        component: () => import("../views/mainview/Bookstore.vue"),
      },
      {
        path: "bookrack",
        name: "Bookrack",
        component: () => import("../views/mainview/Bookrack.vue"),
      },
      {
        path: "ranking",
        name: "Ranking",
        component: () => import("../views/mainview/Ranking.vue"),
      },
      {
        path: "my",
        name: "My",
        component: () => import("../views/mainview/My.vue"),
      },
    ],
  },
  {
    path:"/bookmsg",
    name:"Bookmsg",
    component:() => import("../views/Bookmsg.vue")
  },
  {
    path:"/bookdetail",
    name:"Bookdetail",
    component:() => import("../views/Bookdetail.vue")
  },
  {
    path:"/topdetail",
    name:"Topdetail",
    component:() => import("../views/Topdetail.vue")
  },
  {
    path:"/search",
    name:"Search",
    component:() => import("../views/Search.vue")
  },{
    path:'/login',
    name:"Login",
    component:() => import('../views/Login.vue')
  },  
  {
    path: "*",
    redirect: {
      name: "Ranking",
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

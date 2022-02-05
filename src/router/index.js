import Vue from "vue";
import VueRouter from "vue-router";
// pages
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Resource from "../views/resource/Index.vue";
import List from "../views/resource/List.vue";
import Create from "../views/resource/Create.vue";
import Show from "../views/resource/Show.vue";
import Edit from "../views/resource/Edit.vue";
import NotFound from "../views/NotFound.vue";
// guards
import isAuth from "../guards/isAuth";
import isNotAuth from "../guards/isNotAuth";
import resourceExists from "../guards/resourceExists";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: isNotAuth,
  },
  {
    path: "/",
    component: Home,
    beforeEnter: isAuth,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/resources/:resourceId",
        component: Resource,
        beforeEnter: resourceExists,
        children: [
          { path: "", name: "List", component: List },
          {
            path: "create",
            name: "Create",
            component: Create,
          },
          {
            path: "show/:itemId",
            name: "Show",
            component: Show,
          },
          {
            path: "edit/:itemId",
            name: "Edit",
            component: Edit,
          },
        ],
      },
      {
        path: "*",
        name: "NotFound",
        component: NotFound,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

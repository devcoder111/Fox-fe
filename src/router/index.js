import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes";
import { authStore } from "../store/modules/auth"; 

Vue.use(Router);

const router = new Router({
  routes: routes,
  mode: "history",
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((m) => !m.meta.publicRoute)) {
    var publicRouteNames = ['SignIn'];
    var token = localStorage.getItem('token') ? localStorage.getItem('token'): "";
    if(to.name == "Grower Registration") {
      next();
      return;
    }
    
    if (!token && !publicRouteNames.includes(to.name)) {
      next({ path: "/signin" });
      return;
    }
  }
  next();
})

export default router
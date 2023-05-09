import { createWebHistory, createRouter } from "vue-router";
import login from "../views/LoginForm.vue";
import register from "../views/registerForm.vue";
import profile from "../views/profilePage.vue";
import services from "../views/servicesPage.vue";
import buyPackage from "../views/buyPackage.vue";
import transLogs from "../views/transactionsLog.vue";
import forgotPass from "../views/forgotPass.vue";
import resetPass from "../views/resetPass.vue";
import useServices from "../views/useServices.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/forgot-pass",
    name: "forgotPass",
    component: forgotPass,
  },
  {
    path: "/reset-password",
    name: "resetPass",
    component: resetPass,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/services",
    name: "services",
    component: services,
    meta: { requiresAuth: true },
  },
  {
    path: "/buyPackage",
    name: "buyPackage",
    component: buyPackage,
    meta: { requiresAuth: true },
  },
  {
    path: "/transactionsLogs",
    name: "transactionsLogs",
    component: transLogs,
    meta: { requiresAuth: true },
  },
  {
    path: "/useServices",
    name: "useServices",
    component: useServices,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.meta?.requiresAuth && !token) {
    router.push({ path: "/login" });
  }
  return next();
});
export default router;

import { createRouter, createWebHistory } from "@ionic/vue-router";

// Will uncomment,  when you have more routes

// const ifAuthenticated = (to, from, next) => {
//   if (localStorage.getItem("eh-token")) {
//     next();
//   } else {
//     next({ name: "LoginPage" });
//   }
// };

// const ifNotAuthenticated = (to, from, next) => {
//   if (!localStorage.getItem("eh-token")) {
//     next();
//   } else {
//     next({ name: "Home" });
//   }
// };

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("../views/Home.vue"),
    // beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/Login.vue"),
    // beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

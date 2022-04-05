import { createRouter, createWebHistory } from "@ionic/vue-router";

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem("eh-token")) {
    next();
  } else {
    next({ name: "LoginPage" });
  }
};

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("eh-token")) {
    next();
  } else {
    next({ name: "SelectWorkspacePage" });
  }
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/select-workspace",
    name: "SelectWorkspacePage",
    component: () => import("../views/SelectWorkspace.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("../views/Home.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/my-jobs",
    name: "MyJobsPage",
    component: () => import("../views/MyJobs.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () => import("../views/Profile.vue"),
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

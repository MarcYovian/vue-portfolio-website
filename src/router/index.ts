import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Achievements from "../views/Achievements.vue";
import Contacts from "../views/Contacts.vue";
import Home from "../views/Home.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import Projects from "../views/Projects.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/achievements",
    name: "Achievements",
    component: Achievements,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/project/:slug",
    name: "ProjectDetail",
    component: ProjectDetail,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;

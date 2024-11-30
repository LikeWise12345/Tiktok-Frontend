import { createRouter, createWebHistory } from "vue-router";

// Import components
import UserSignup from "@/components/Auth/UserSignup.vue";
import UserLogin from "@/components/Auth/UserLogin.vue"
import AppHome from "@/views/AppHome.vue";
import UserDashboard from "@/components/UserDashboard.vue";
import VideoUpload from "@/components/VideoUpload.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/signup",
    name: "UserSignup",
    component: UserSignup,
  },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashboard,
  },
  {
    path: "/upload-video",
    name: "VideoUpload",
    component: VideoUpload,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

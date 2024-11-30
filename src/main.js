import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import axios from "axios";

const app = createApp(App);

app.use(router); // Attach the router to the app
app.mount("#app");

// Set up the CSRF token globally for every Axios request
axios.interceptors.request.use((config) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  });



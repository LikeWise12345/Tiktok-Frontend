import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import axios from "axios";

const app = createApp(App);
app.use(router);
app.mount("#app");

// Function to fetch CSRF token from Django API
async function fetchCsrfToken() {
  try {
    console.log("Fetching CSRF token...");
    const response = await axios.get("http://127.0.0.1:8000/api/csrf/", {
      withCredentials: true, // Required for Django cookies
    });

    console.log("CSRF Response:", response.data); // Debugging

    if (response.data.csrfToken) {
      console.log("✅ CSRF Token Received:", response.data.csrfToken);
      axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken; // Store globally
    } else {
      console.error("❌ CSRF token missing in response.");
    }
  } catch (error) {
    console.error("❌ CSRF Token fetch error:", error);
  }
}

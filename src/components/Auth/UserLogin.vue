<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- TikTok-like logo or title -->
      <div class="auth-logo">
        <img src="@/assets/tiktok-logo.png" alt="TikTok Logo" class="logo" />
        <h1 class="auth-title">Log In</h1>
      </div>

      <!-- Login form -->
      <form @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="auth-input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="auth-input"
        />
        <button type="submit" class="auth-button">Log In</button>
      </form>

      <!-- Error message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Sign-up link -->
      <p class="auth-switch">
        Don’t have an account?
        <router-link to="/signup" class="auth-link">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      csrfToken: "", // Store CSRF token
    };
  },
  methods: {
    async fetchCsrfToken() {
      try {
        // Request CSRF token from Django API
        const response = await axios.get("http://127.0.0.1:8000/api/csrf/", {
          withCredentials: true, // Important: Allows cookies to be sent
        });

        console.log("CSRF Response:", response.data); // Debugging

        // Extract CSRF token
        if (response.data.csrfToken) {
          this.csrfToken = response.data.csrfToken;
          console.log("CSRF Token Set:", this.csrfToken);
        } else {
          throw new Error("CSRF token missing in response.");
        }
      } catch (error) {
        console.error("CSRF Token fetch error:", error);
        this.errorMessage = "Failed to fetch CSRF token. Please refresh.";
      }
    },

    async login() {
      try {
        // Ensure CSRF token is fetched before login
        if (!this.csrfToken) {
          await this.fetchCsrfToken();
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/login/",
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              "X-CSRFToken": this.csrfToken, // Send CSRF token in header
            },
            withCredentials: true, // Ensure Django receives cookies
          }
        );

        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
          this.errorMessage = "";
          alert("Login successful!");
          this.$router.push("/dashboard");
        } else {
          this.errorMessage = "Login failed: " + response.data.error;
        }
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
      }
    },
  },
  created() {
    this.fetchCsrfToken(); // Fetch CSRF token when component loads
  },
};
</script>



<style scoped>
/* Container styling */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #fe2c55, #ff6b6b);
}

/* Card styling */
.auth-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

/* Logo and title styling */
.auth-logo {
  margin-bottom: 1.5rem;
}

.auth-logo .logo {
  width: 80px;
  height: auto;
  margin-bottom: 1rem;
}

.auth-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

/* Input field styling */
.auth-input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.auth-input:focus {
  border-color: #fe2c55;
}

/* Button styling */
.auth-button {
  background: #fe2c55;
  color: white;
  border: none;
  padding: 12px 15px;
  font-size: 18px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
}

.auth-button:hover {
  background: #d81c3b;
}

/* Error message styling */
.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 1rem;
}

/* Sign-up link styling */
.auth-switch {
  margin-top: 1.5rem;
  font-size: 14px;
  color: #666;
}

.auth-link {
  color: #fe2c55;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.auth-link:hover {
  color: #d81c3b;
}
</style>

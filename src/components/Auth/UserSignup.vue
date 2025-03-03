<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- TikTok-like logo or title -->
      <div class="auth-logo">
        <img src="@/assets/tiktok-logo.png" alt="TikTok Logo" class="logo" />
        <h1 class="auth-title">Sign Up</h1>
      </div>

      <!-- Sign-up form -->
      <form @submit.prevent="signup">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="auth-input"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="auth-input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="auth-input"
        />
        <button type="submit" class="auth-button">Sign Up</button>
      </form>

      <!-- Error message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Log-in link -->
      <p class="auth-switch">
        Already have an account?
        <router-link to="/login" class="auth-link">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserSignup",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post("http://localhost:8000/api/signup/", {
          email: this.email,
          username: this.username,
          password: this.password,
        });

        // Assuming you get a success response back
        if (response.data.success) {
          this.$router.push("/login"); // Redirect to login page after successful signup
        } else {
          this.errorMessage = "Signup failed, please try again!";
        }
      } catch (error) {
        console.error("Signup error", error);
        if (error.response) {
          // Server responded with an error
          this.errorMessage =
            error.response.data.message || "Signup failed. Please try again!";
        } else {
          // Network or other issues
          this.errorMessage = "Network error. Please check your connection.";
        }
      }
    },
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
  background: linear-gradient(135deg, #fe2c55, #ff6b6b); /* TikTok-like gradient */
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
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Log In</h1>
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
      <p class="auth-switch">
        Don’t have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
// Import Axios correctly
import axios from 'axios';

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Send login request to Django API
        const response = await axios.post("http://localhost:8000/api/login/", {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {
          // Store JWT token if login is successful
          localStorage.setItem('access_token', response.data.access_token);
          alert("Login successful!");
          this.$router.push("/dashboard");  // Redirect to dashboard
        } else {
          alert("Login failed: " + response.data.error);  // Provide error message from response
        }
      } catch (error) {
        console.error("Login error:", error);  // Log the error for debugging
        if (error.response) {
          // Display a more specific error message
          alert("Login failed: " + (error.response.data.error || 'Please try again.'));
        } else if (error.request) {
          // Handle case where no response was received from the server
          alert("No response from server. Please check your network connection.");
        } else {
          // Handle any other errors
          alert("Error: " + error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Same styles as UserSignup.vue for consistency */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
}
.auth-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}
.auth-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.auth-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.auth-button {
  background: #fe2c55;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
}
.auth-button:hover {
  background: #d81c3b;
}
.auth-switch {
  margin-top: 1rem;
}
.auth-switch a {
  color: #fe2c55;
  font-weight: bold;
  text-decoration: none;
}
</style>

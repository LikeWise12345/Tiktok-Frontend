<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Sign Up</h1>
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
      <p class="auth-switch">
        Already have an account?
        <router-link to="/login">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 

  data() {
    return {
      email: '',
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://localhost:8000/api/signup/', {
          email: this.email,
          username: this.username,
          password: this.password,
        });

        // Assuming you get a success response back
        if (response.data.success) {
          this.$router.push("/login");  // Redirect to login page after successful signup
        } else {
          this.errorMessage = "Signup failed, please try again!";
        }
      } catch (error) {
        console.error("Signup error", error);
        if (error.response) {
          // Server responded with an error
          this.errorMessage = error.response.data.message || "Signup failed. Please try again!";
        } else {
          // Network or other issues
          this.errorMessage = "Network error. Please check your connection.";
        }
      }
    }
  }
};
</script>

<style scoped>
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

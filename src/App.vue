<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-items">
        <router-link to="/upload-video" class="nav-link" exact>
          <i class="fas fa-home"></i>
          <span>Upload Video</span>
        </router-link>
        <router-link to="/dashboard" class="nav-link">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/login" class="nav-link">
          <i class="fas fa-sign-in-alt"></i>
          <span>Login</span>
        </router-link>
        <router-link to="/signup" class="nav-link">
          <i class="fas fa-user-plus"></i>
          <span>Sign Up</span>
        </router-link>
      </div>
    </nav>

    <!-- Route View (Dynamic Content) -->
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Global Styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

/* Navbar Styles */
.navbar {
  background-color: #000;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.3);
}

.nav-items {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link span {
  font-size: 12px;
  margin-top: 5px;
}

.nav-link:hover {
  color: #ff2d55;
  transform: scale(1.1);
}

.nav-link i {
  font-size: 22px;
}

@media (max-width: 600px) {
  .nav-items {
    flex-direction: column;
    align-items: center;
  }
}
</style>



<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-items">
        <router-link to="/upload-video" class="nav-link" exact>
          <i class="fas fa-upload"></i>
          <span>Upload</span>
        </router-link>
        <router-link to="/dashboard" class="nav-link">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/login" class="nav-link">
          <i class="fas fa-user"></i>
          <span>Profile</span>
        </router-link>
      </div>
    </nav>

    <!-- Route View (Dynamic Content) -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Global Styles */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

/* Navbar Styles */
.navbar {
  background-color: #fff; /* White background like TikTok */
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-top: 1px solid #e0e0e0; /* Light border at the top */
}

.nav-items {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 500px; /* Limit width for better spacing */
}

.nav-link {
  color: #666; /* Default icon color */
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link span {
  font-size: 12px;
  margin-top: 5px;
  color: #666; /* Default text color */
}

.nav-link:hover {
  color: #000; /* Darker color on hover */
  transform: scale(1.05); /* Slight scale effect */
}

.nav-link.router-link-active {
  color: #ff2d55; /* TikTok-like red for active link */
}

.nav-link.router-link-active span {
  color: #ff2d55; /* TikTok-like red for active link text */
}

.nav-link i {
  font-size: 22px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .nav-items {
    flex-direction: row; /* Keep items in a row for mobile */
    justify-content: space-around; /* Evenly space items */
  }

  .nav-link {
    font-size: 12px; /* Smaller font size for mobile */
  }

  .nav-link i {
    font-size: 18px; /* Smaller icons for mobile */
  }
}
</style>


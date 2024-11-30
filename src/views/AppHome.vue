<template>
  <div class="home">
    <h1>Welcome to TikTok Clone</h1>
    <div class="videos">
      <!-- Example of a video thumbnail section -->
      <div class="video-item">
        <img src="https://via.placeholder.com/200" alt="video-thumbnail" />
        <h2>Video Title</h2>
      </div>
      <div class="video-item">
        <img src="https://via.placeholder.com/200" alt="video-thumbnail" />
        <h2>Another Video</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
};
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
}

.videos {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.video-item {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  padding: 10px;
}

.video-item img {
  width: 100%;
  border-radius: 10px;
}
</style>

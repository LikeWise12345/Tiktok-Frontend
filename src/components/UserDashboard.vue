<template>
  <div class="dashboard">
    <!-- Full-screen video player -->
    <div class="video-feed">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="video-item"
        v-show="video.id === currentVideo.id"
      >
        <!-- Video player -->
        <video
          :src="video.video_file"
          class="video-player"
          autoplay
          muted
          loop
          controls
          type="video/mp4"
          @click="togglePlay"
        ></video>

        <!-- Video overlay (like TikTok's UI) -->
        <div class="video-overlay">
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
          </div>
          <div class="video-actions">
            <button @click="likeVideo(video)" class="action-btn">
              ❤️ {{ video.likes }}
            </button>
            <button @click="shareVideo(video)" class="action-btn">
              🔗 Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation buttons (swipe-like functionality) -->
    <div class="navigation-buttons">
      <button @click="prevVideo" class="nav-btn">⬅️ Previous</button>
      <button @click="nextVideo" class="nav-btn">Next ➡️</button>
    </div>
  </div>
</template>

<script>
import apiClient from "../axios";

export default {
  data() {
    return {
      videos: [], // Store video data
      currentVideoIndex: 0, // Track the current video index
      error: null, // Store error message
    };
  },
  computed: {
    // Get the current video
    currentVideo() {
      return this.videos[this.currentVideoIndex] || {};
    },
    // Filter videos based on search query (if needed)
    filteredVideos() {
      return this.videos;
    },
  },
  methods: {
    // Fetch videos from the API
    async fetchVideos() {
      try {
        const response = await apiClient.get("http://localhost:8000/api/videos/");
        this.videos = response.data;
      } catch (error) {
        console.error("Error fetching videos: ", error);
        this.error = "Error fetching videos. Please try again later.";
      }
    },
    // Navigate to the next video
    nextVideo() {
      if (this.currentVideoIndex < this.videos.length - 1) {
        this.currentVideoIndex++;
      } else {
        this.currentVideoIndex = 0; // Loop back to the first video
      }
    },
    // Navigate to the previous video
    prevVideo() {
      if (this.currentVideoIndex > 0) {
        this.currentVideoIndex--;
      } else {
        this.currentVideoIndex = this.videos.length - 1; // Loop to the last video
      }
    },
    // Toggle video play/pause
    togglePlay(event) {
      const video = event.target;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    // Like a video
    likeVideo(video) {
      video.likes = (video.likes || 0) + 1;
      // You can add an API call here to update likes on the server
    },
    // Share a video
    shareVideo(video) {
      navigator.clipboard.writeText(video.video_file);
      alert("Video link copied to clipboard!");
    },
  },
  created() {
    // Fetch videos when the component is created
    this.fetchVideos();
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.video-feed {
  position: relative;
  height: 100%;
  width: 100%;
}

.video-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.video-info h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.video-info p {
  font-size: 16px;
}

.video-actions {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.navigation-buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>

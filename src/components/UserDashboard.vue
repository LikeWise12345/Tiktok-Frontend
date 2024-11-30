<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Trending Videos</h1>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search videos..."
        @input="searchVideos"
      />
    </div>

    <!-- Video list -->
    <div class="video-list">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="video-item"
        @click="openModal(video)"
      >
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
        </div>
        <!-- Video player with MP4 format -->
        <video
          :src="video.video_file"
          class="video-player"
          muted
          loop
          controls
          type="video/mp4" 
        ></video>
      </div>
    </div>

    <!-- Modal for displaying the video -->
    <div v-if="isModalOpen" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <video
          :src="selectedVideo.video_file"
          class="modal-video"
          controls
          autoplay
          type="video/mp4" 
          @error="handleVideoError"
        ></video>
        <button @click="closeModal" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../axios";

export default {
  data() {
    return {
      videos: [], // Store video data
      searchQuery: "", // Search input data
      error: null, // Store error message
      isModalOpen: false, // Whether the modal is open
      selectedVideo: null, // The selected video to show in the modal
    };
  },
  computed: {
    filteredVideos() {
      // Filter videos based on search query
      if (!this.searchQuery) {
        return this.videos;
      }
      return this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleVideoError(event) {
    console.error("Video failed to load:", event.target.src);
  },
    async fetchVideos() {
      try {
        // Clear any previous error
        this.error = null;

        // Fetch videos from the API
        const response = await apiClient.get("http://localhost:8000/api/videos/");
        console.log(response.data); // Log the response data to verify
        this.videos = response.data; // Store video data
      } catch (error) {
        console.error("Error fetching videos: ", error);
        // Set the error message to be displayed
        this.error = "Error fetching videos. Please try again later.";
      }
    },
    searchVideos() {
      // Automatically handled by computed property `filteredVideos`
    },
    openModal(video) {
      // Set the selected video and open the modal
      this.selectedVideo = video;
      this.isModalOpen = true;
    },
    closeModal() {
      // Close the modal and reset selected video
      this.isModalOpen = false;
      this.selectedVideo = null;
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
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
}

.dashboard-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  width: 80%;
  max-width: 600px;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Error message style */
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Responsive grid */
  gap: 30px;
  justify-content: center;
}

.video-item {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer; /* Make video items clickable */
}

.video-item:hover {
  transform: scale(1.05);
}

.video-info {
  padding: 15px;
}

.video-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.video-info p {
  font-size: 14px;
  color: #777;
}

.video-player {
  width: 100%;
  height: 200px; /* Height adjusted for desktop view */
  background-color: #000;
  display: block;
  border-radius: 10px;
  margin-top: 10px;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 800px;
  background-color: #000;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-video {
  width: 100%;
  height: 400px; /* Adjust to full-screen size */
  background-color: #000;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background-color: #cc0000;
}
</style>


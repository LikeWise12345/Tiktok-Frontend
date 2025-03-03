<template>
  <div class="video-upload-fullscreen">
    <meta name="csrf-token" content="{{ csrf_token }}" />
    <!-- Header Section -->
    <header class="header">
      <h1>Upload Your Video</h1>
      <p>Share your amazing content with the world! Fill in the details below to get started.</p>
    </header>

    <!-- Form Section -->
    <form class="form" @submit.prevent="uploadVideo" enctype="multipart/form-data">
      <div class="form-group">
        <label for="title">Video Title:</label>
        <input
          type="text"
          v-model="video.title"
          id="title"
          placeholder="Enter a captivating title"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          v-model="video.description"
          id="description"
          placeholder="Provide a brief overview of your video"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="hashtags">Hashtags:</label>
        <input
          type="text"
          v-model="video.hashtags"
          id="hashtags"
          placeholder="e.g., #video #upload"
        />
      </div>

      <div class="form-group file-upload">
        <label for="video_file">Upload Video File:</label>
        <div class="upload-box" @click="triggerFileInput">
          <span v-if="!videoFile">Click to upload</span>
          <span v-else>{{ videoFile.name }}</span>
          <input
            type="file"
            @change="handleFileUpload"
            accept="video/*"
            id="video_file"
            required
            ref="fileInput"
            style="display: none;"
          />
        </div>
      </div>

      <button type="submit" class="btn-upload">Upload Now</button>
    </form>

    <!-- Feedback Section -->
    <div v-if="message" :class="['message', success ? 'success' : 'error']">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      video: {
        title: "",
        description: "",
        hashtags: "",
      },
      videoFile: null,
      message: "",
      success: false,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the file input when the upload box is clicked
    },
    handleFileUpload(event) {
      this.videoFile = event.target.files[0];
    },
    async uploadVideo() {
      if (!this.videoFile) {
        this.message = "Please select a video file to upload.";
        this.success = false;
        return;
      }

      const formData = new FormData();
      formData.append("title", this.video.title);
      formData.append("description", this.video.description);
      formData.append("hashtags", this.video.hashtags);
      formData.append("video_file", this.videoFile);

      // Get CSRF token from the meta tag
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      try {
        const response = await axios.post(
          "http://localhost:8000/videos/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": csrfToken,
            },
          }
        );

        this.message = `Video uploaded successfully: ${response.data.title}`;
        this.success = true;

        // Clear the form
        this.video = {
          title: "",
          description: "",
          hashtags: "",
        };
        this.videoFile = null;
      } catch (error) {
        console.error(error);
        this.message = "Error uploading video. Please try again.";
        this.success = false;
      }
    },
  },
};
</script>

<style scoped>
/* Full-Screen Styling */
.video-upload-fullscreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #000; /* TikTok-like dark background */
  color: #fff; /* White text for contrast */
  padding: 20px;
  box-sizing: border-box;
}

/* Header Section */
.header {
  margin-bottom: 30px;
  text-align: center;
}

.header h1 {
  font-size: 36px;
  color: #fff; /* White text */
}

.header p {
  font-size: 16px;
  color: #aaa; /* Light gray text */
  margin-top: 8px;
}

/* Form Section */
.form {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff; /* White text */
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #444; /* Dark border */
  border-radius: 5px;
  font-size: 14px;
  background-color: #333; /* Dark input background */
  color: #fff; /* White text */
  transition: border-color 0.3s ease;
}

textarea {
  resize: none;
  min-height: 100px;
}

input:focus,
textarea:focus {
  border-color: #fe2c55; /* TikTok-like red color */
}

/* File Upload Section */
.file-upload .upload-box {
  border: 2px dashed #444; /* Dashed border */
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #333; /* Dark background */
  color: #aaa; /* Light gray text */
  transition: background-color 0.3s ease;
}

.file-upload .upload-box:hover {
  background-color: #444; /* Slightly lighter on hover */
}

/* Button Styling */
.btn-upload {
  background-color: #fe2c55; /* TikTok-like red color */
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-upload:hover {
  background-color: #d81c3b; /* Darker red on hover */
}

/* Feedback Message */
.message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  font-size: 14px;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
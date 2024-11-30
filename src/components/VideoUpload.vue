<template>
    <div class="video-upload-center">
     <meta name="csrf-token" content="{{ csrf_token }}">
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
  
        <div class="form-group">
          <label for="video_file">Upload Video File:</label>
          <input
            type="file"
            @change="handleFileUpload"
            accept="video/*"
            id="video_file"
            required
          />
        </div>
  
        <button type="submit" class="btn-upload">Upload Now</button>
      </form>
  
      <!-- Feedback Section -->
      <div
        v-if="message"
        :class="['message', success ? 'success' : 'error']"
      >
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
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
        try {
          const response = await axios.post("http://localhost:8000/videos/upload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": csrfToken, 
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
            },
          });
  
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
  /* Global Styling */
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    align-items: center; /* Centers content vertically */
    justify-content: center; /* Centers content horizontally */
    background-color: #f9f9f9;
    overflow: hidden; /* Prevents scrollbars from appearing */
  }
  
  /* Central Container */
  .video-upload-center {
    width: 100%;
    max-width: 500px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
  }
  
  /* Header Section */
  .header {
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 28px;
    color: #333;
  }
  
  .header p {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
  }
  
  /* Form Section */
  .form {
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
    color: #444;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
  }
  
  textarea {
    resize: none;
    min-height: 100px;
  }
  
  input:focus,
  textarea:focus {
    border-color: #007bff;
  }
  
  /* Button Styling */
  .btn-upload {
    background-color: #007bff;
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
    background-color: #0056b3;
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
  
  
  
  
<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">

    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">
        {{ message }}
      </div>
    </div>

    <div class="field">
      <div class="file is-boxed is-primary">
        <label class="file-label" placeholder="Select 3D file">

          <input type="file" ref="file" @change="selectFile" class="file-input"  />

          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload">
              </i>
            </span>
          </span>
        </label>
      </div>
    </div>

    <input type="text" v-model="text" placeholder="Name your 3D file">
    <button class="button is-info"  :disabled="uploading">
      {{ uploading ? 'Uploading...' : 'Send' }}
    </button>
  </form>
  <hr>
  <button class="button is-info display-all-objects" @click="addAllToScene">
  <span class="icon">
    <i class="fas fa-cubes"></i>
  </span>
  <span>Display All Objects </span>
</button>
  <p class="error" v-if="error">{{ error }}</p>
  <div class="posts-container">

    <div class="post" v-for="(post, index) in posts" v-bind:item="post" v-bind:index="index" v-bind:key="post._id"
      >
      <button @click="deletePost(post._id, post.post_id)"> Remove File </button>
      <p class="text">{{ post.text }}</p>
      <button class="addButton" v-on:click="addToScene2(post); addToScene(post)">Add To Scene</button>
    </div>
  </div>

</template>

<script>
import { Vector3 } from '@babylonjs/core';
import axios from 'axios';
var SceneLoader = require("@babylonjs/core").SceneLoader;
var GUI3DManager = require("@babylonjs/gui").GUI3DManager;
var NearMenu = require("@babylonjs/gui").NearMenu;
var HolographicButton = require("@babylonjs/gui").HolographicButton;
const { v4: uuidv4 } = require('uuid');

import PostService from '../PostService'

export default {
  name: "SimpleUpload",

  data() {
    return {
      file: "",
      message: "",
      error: false,
      itemName: '',
      items: [],
      posts: [],
      text: '',
      post_id: '',
      firstName: '',
      email: '',
      uploading: false

    };
  },
  async created() {
    try {
      const res = await axios.get('/api/user', { headers: { token: localStorage.getItem('token') } });
      this.firstName = res.data.user.firstName;
      this.email = res.data.user.email;
      this.posts = await PostService.getPosts(this.email);
    } catch (err) {
      this.error = err.message;
    }
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.fileExtension = this.file.name.split('.').pop().toLowerCase();
      this.error = false;
      this.message = "";
    },
    async createPost(randomId) {
      if (!this.text) {
        this.error = "Please enter some text for the post";
        return;
      }

      if (!this.file) {
        this.error = "Please select a file to upload";
        return;
      }

      if (this.fileExtension !== "glb" && this.fileExtension !== "obj") {
        this.error = "Invalid file type. Please select a 3D model file (.GLB or .OBJ file).";
        return;
      }
      const userEmail = this.email;
      const post = this.text; 
      const id = randomId;
      await PostService.insertPost(post, userEmail, id);
      this.posts = await PostService.getPosts(userEmail);
    },

    async deletePost(id, post_id) {
      const userEmail = this.email;
      // Call a Delete request to delete file from S3
      await axios.delete(`/api/uploads/${post_id}`);

      // Call a Delete request to delete the file data from MongoDB
      await PostService.deletePost(id);

      // Display new list of files
      this.posts = await PostService.getPosts(userEmail);
    },


    // PUSHING THE UPLOADED FILE TO BACKEND
    async sendFile() {
      const randomId = uuidv4();
      this.createPost(randomId);
      const userEmail = this.email;
      this.uploading = true;
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('randomId', randomId);
      console.log("file:", this.file);

      try {
        if (this.fileExtension !== "glb" && this.fileExtension !== "obj") {
          throw new Error("Invalid file type. Please select a GLB/OBJ file.");
        }
        await axios.post('/api/uploads', formData, userEmail, randomId);
        this.message = "File has been uploaded";
        this.file = "";
        this.error = false;
        this.$refs.file.value = null; // reset the input field
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
        this.error = true;
      } finally {
        this.uploading = false; // set the status back to false
      }
    },
    addToScene(post) {
      console.log();
      const importedMesh = SceneLoader.ImportMesh(
        "",
        "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",

        `${post.post_id}.obj`,
        this.$parent.scene, 
        function (newMeshes) {
          var importedMesh = newMeshes[0];
          importedMesh.position = new Vector3(5, 5, 5);
          console.log(importedMesh);
         
          var manager2 = new GUI3DManager(this.$parent.scene);

          const near2 = new NearMenu("near");
          manager2.addControl(near2);
          let follower = near2.defaultBehavior.followBehavior; 
          follower.defaultDistance = 3;
          follower.minimumDistance = 1;
          follower.maximumDistance = 5;

          const button0 = new HolographicButton("AddLight");
          
          button0.text = "Add Light";
          near2.addButton(button0);

          const button1 = new HolographicButton("RemoveLight");
          
          button1.text = "Remove Light";
          near2.addButton(button1);

          near2.isPinned = true;
        }
      )
      importedMesh.position = new Vector3(10, 10, 10);
    },
    addToScene2(post) {
      console.log();
      const importedMesh2 = SceneLoader.ImportMesh(
        "",
        "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",

        `${post.post_id}.glb`,
        this.$parent.scene, // use the scene object from your parent component
        function (newMeshes) {
          var importedMesh = newMeshes[0];
          console.log(importedMesh);

        }
      );
      importedMesh2.position = new Vector3(10, 10, 10);
    },
    addAllToScene() {
      for (let i = 0; i < this.posts.length; i++) {
        this.addToScene2(this.posts[i]);
        this.addToScene(this.posts[i]);
      }
    },
    listItem() {
      this.items.push({ name: this.itemName });
      this.itemName = '';
    }
  }
}

</script>


<style scoped>
.post {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.post p {
  margin-right: 10px;
  flex-grow: 1;
  text-align: center;
}

.post p.text {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.post button {
  width: 100px;
  border: 1px solid #22324E;
  background-color: #22324E;
  color: #FFFFFF;
}

div.container {
  max-width: 1300px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #22324E;
  background-color: #22324E;
  color: #FFFFFF;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 0.5px solid #22324E;
  background-color: #E8EBF1;
  padding: 5px 10px 5px 5px;
  margin-bottom: 10px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: #22324E;
  color: #FFFFFF;
  font-size: 13px;
}

.display-all-objects {
  background-color: #22324E;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  box-shadow: none;
  transition: background-color 0.2s ease-in-out;
}

.display-all-objects:hover {
  background-color: #375B84;
}

.display-all-objects:active {
  background-color: #22324E;
}

.display-all-objects .icon {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .display-all-objects {
    font-size: 14px;
    padding: 10px 20px;
  }
}
.display-all-objects {
  margin-bottom: 10px;
}

.addButton, button {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  margin-right: 10px;
  background-color: #22324E;
  color: #FFFFFF;
}

.addButton:hover, button:hover {
  background-color: #375B84;
}

input[type="text"] {
  font-size: 18px;
  color: #333;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

</style>

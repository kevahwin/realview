<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">

        <div v-if="message"
            :class="`message ${error ? 'is-danger' : 'is-success'}`"
            >
            <div class="message-body">
                {{message}}
            </div>
        </div>

        <div class="field">
            <div class="file is-boxed is-primary">
                <label class="file-label">

                    <input
                    type="file"
                    ref="file"
                    @change="selectFile"
                    class="file-input"
                    />

                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload">
                            </i>
                        </span>

                    </span>
                </label>
            </div>
        </div>
           
            <input type="text" id="create-post" v-model="text" placeholder="create a post">
            <button class="button is-info" v-on:click="createPost" >
                Send
            </button>
            </form>
            <hr>
            <button @click="addAllToScene">     
                Display All Objects
            </button>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
        >
        <p class="text">{{ post.text }}</p>
        <button class="addButton" v-on:click="addToScene2(post); addToScene(post)">Add To Scene</button>
      </div>
      </div>
            <ul>
  <li v-for="(item, index) in items" :key="index">
    {{ itemName }}{{ index + 1 }}
    <button @click="addToScene(index); addToScene2(index)">Add to Scene</button>
  </li>
</ul>

    
    
        
</template>

<script>
import axios from 'axios';


var SceneLoader = require("@babylonjs/core").SceneLoader;
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
        post_id: ''
    };
   },
   async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
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
    async createPost() {
    if (!this.text) {
      this.error = "Please enter some text for the post";
      return;
    }

    if (!this.file) {
      this.error = "Please select a file to upload";
      return;
    }

    if (this.fileExtension !== "glb" && this.fileExtension !== "obj") {
      this.error = "Invalid file type. Please select a GLB file.";
      return;
    }

    const post = this.text ; // set the post's ID to the uploaded file's name
    await PostService.insertPost(post);
    this.posts = await PostService.getPosts();
      },

      async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    

    // PUSHING THE UPLOADED FILE TO BACKEND
    async sendFile() {
        const formData = new FormData();
        formData.append('file', this.file);
        console.log("file:", this.file);

        try {
        
        if (this.fileExtension !== "glb" && this.fileExtension !== "obj") {
    throw new Error("Invalid file type. Please select a GLB file.");
  }
            await axios.post('/api/uploads', formData);
            this.message = "File has been uploaded";
            this.file = "";
            this.error = false;
            this.$refs.file.value = null; // reset the input field
        } catch (err) {
            console.log(err);
            this.message = err.response.data.error;
            this.error = true;
        }
    },
    addToScene(post) {
      console.log();
      SceneLoader.ImportMesh(
        "",
        "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",
        
        `${post.post_id}.obj`,
        this.$parent.scene, // use the scene object from your parent component
        function (newMeshes) {
          var importedMesh = newMeshes[0];
          console.log(importedMesh);
          // do something with the imported mesh
        }
      );
    },
    addToScene2(post) {
      console.log();
      SceneLoader.ImportMesh(
        "",
        "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",
        
        `${post.post_id}.glb`,
        this.$parent.scene, // use the scene object from your parent component
        function (newMeshes) {
          var importedMesh = newMeshes[0];
          console.log(importedMesh);
          // do something with the imported mesh
        }
      );
    },
    addAllToScene() {
        for (let i = 0; i < this.posts.length; i++) {
        this.addToScene2(this.posts[i]);
    }
    },
    listItem() {
        this.items.push({ name: this.itemName });
      this.itemName = '';
    },
    
    //Using Axios - Doesnt work
    // async addToScene(){
    //     try{
    //         await axios.get('/api/uploads/item');
    //         this.message = "Adding file to scene";
    //         this.error = false;

    //     } catch(err){
    //         console.log(err);
    //         this.message = err.response.data.error;
    //         this.error = true;
    //     }
    // }
    getItem(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5001/api/uploads/item', true);
        xhr.responseType = 'document';

        xhr.onload = function(){
            if(xhr.readyState === xhr.DONE && xhr.status === 200){
                const fileData = xhr.response;
                console.log(fileData);
            }
        };

        xhr.send();
    }
   }
}

</script>

<style scoped>

.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post p {
  margin-right: 10px;
}

.post button {
  width: 100px;
  border: 1px solid #AE98BD;
  background-color: #AE98BD;
}

div.container {
  max-width: 1300px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #AE98BD;
  background-color: #AE98BD;
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 0.5px solid #131313;
  background-color:  #f6f4fd;
  padding: 5px 10px 5px 5px;
  margin-bottom: 10px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
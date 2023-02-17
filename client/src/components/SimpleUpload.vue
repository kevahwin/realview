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
        <div class="field">
            <button class="button is-info">
                Send
            </button>
        </div>
    </form>
    <div class="field">
            <button class="button is-info" @click="getItem">
                Add to Scene
            </button>
        </div>
</template>

<script>
import axios from 'axios';
export default {
   name: "SimpleUpload",
   data() {
    return {
        file: "",
        message: "",
        error: false
    }
   },
   methods: {
    selectFile() {
        this.file = this.$refs.file.files[0];
        this.error = false;
        this.message = "";
    },
    // PUSHING THE UPLOADED FILE TO BACKEND
    async sendFile() {
        const formData = new FormData();
        formData.append('file', this.file);
        try {
            await axios.post('/api/uploads', formData);
            this.message = "File has been uploaded";
            this.file = "";
            this.error = false;
        } catch (err) {
            console.log(err);
            this.message = err.response.data.error;
            this.error = true;
        }
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
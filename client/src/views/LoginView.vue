<template>
  <div>
    <NavbarComponent />
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <div class="password-container">
            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required>
            <button type="button" class="password-toggle" @click="togglePassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <button type="submit" class="login-button">Log in</button>
      </form>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
    <div class="signup-button">
      <router-link to="/SignUpView" class="login-button">Sign Up for Free!</router-link>
    </div>
    </div>
  </template>
  
  <script>
  import NavbarComponent from '../components/NavbarComponent.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      submitForm() {
        this.login();
        alert('You are logged in!')
      },
      login() {
        let user = {
          email: this.email,
          password: this.password
        }
        axios.post('/api/login', user)
          .then(res => {
            if (res.status === '200') {
              localStorage.setItem('token', res.data.token);
              console.log(res)
            }
          }, err => {
            console.log(err.response);
            this.error = err.response.data.error;
          })
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      }
    },
    components: {
      NavbarComponent
    }
  }
  </script>
<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 1rem;
  border: 1px solid #22324E;
  border-radius: 5px;
  background-color: #fff;
}
.form-group {
  margin-bottom: 1rem;
}
.login-button {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #22324E;
  color: #fff;
  border: none;
  transition: all 0.2s ease-in-out;
}
.login-button:hover {
  background-color: #304C5A;
  transform: scale(1.1);
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #22324E;
  font-weight: bold;
}
input[type="text"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #22324E;
  border-radius: 5px;
  font-size: 1rem;
}
.password-container {
  position: relative;
}
.signup-button {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.signup-button a {
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #22324E;
  color: #fff;
  border: none;
  transition: all 0.2s ease-in-out;
}
.signup-button a:hover {
  background-color: #304C5A;
  transform: scale(1.1);
}
input[type="password"] {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #22324E;
  border-radius: 5px;
  font-size: 1rem;
}
.password-toggle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  color: #22324E;
  font-size: 1rem;
  cursor: pointer;
}
</style>
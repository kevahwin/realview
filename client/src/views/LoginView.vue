<template>
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Log in</button>
      </form>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
    <div class="signup-button">
      <button type="submit">Sign Up for Free!</button>
    </div>
  </template>
  
  <script>
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
      }
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
  
  button[type="submit"] {
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
  
  button[type="submit"]:hover {
    background-color: #304C5A;
    transform: scale(1.1);
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
    text-align: center;
  }
  </style>
<template>
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Log in</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: null
      }
    },
    methods: {
      submitForm() {
        // You can implement your login functionality here.
        // For example, you can make an API call to a backend to verify the user's credentials.
        if (this.username === 'example' && this.password === 'password') {
          // Successful login, do something like redirect to another page
          alert('You are logged in!')
        } else {
          // Invalid credentials, display an error message
          this.errorMessage = 'Invalid username or password.'
        }
      }
    }
  }
  </script>
  
  <style>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"],
  input[type="password"] {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  button[type="submit"] {
    display: block;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>
  
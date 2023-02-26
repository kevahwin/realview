<template>
  <div>
    <NavbarComponent />
    <div class="signup-form">
      <h1>Sign Up</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstName">First name:</label>
          <input type="text" id="firstName" v-model="firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last name:</label>
          <input type="text" id="lastName" v-model="lastName" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
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
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <div class="password-container">
            <input id="confirmPassword" v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required>
            <button type="button" class="password-toggle" @click="toggleConfirmPassword">
              {{ showConfirmPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <button type="submit" class="login-button">Sign up</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import router from '../router/index.js'
import axios from 'axios'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    submitForm() {
      if (this.firstName && this.lastName && this.email && this.password && this.confirmPassword && this.password === this.confirmPassword) {
        // Successful sign-up, do something like redirect to another page
        this.signup();
        alert('Thank you for signing up!')
        router.push('LoginView');
      } else {
        // Incomplete fields or passwords don't match, display an error message
        this.errorMessage = !this.password ? 'Please enter a password.' : !this.confirmPassword ? 'Please confirm your password.' : 'Passwords do not match.'
      }
    },
    signup() {
      let newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      axios.post('/api/signup', newUser)
        .then(res => {
          console.log(res);
          this.error = '';
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error;
        })
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  },
  components: {
      NavbarComponent
  }
}
</script>
<style scoped>
.signup-form {
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
input[type="email"],
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
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #22324E;
  font-size: 0.8rem;
  cursor: pointer;
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

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>

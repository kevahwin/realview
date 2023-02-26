<template>
  <div>
    <NavbarComponent />
    <div class="signup-form">
      <h1>Sign Up</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
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
export default {
  data() {
    return {
      username: '',
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
      if (this.username && this.email && this.password && this.confirmPassword && this.password === this.confirmPassword) {
        // Successful sign-up, do something like redirect to another page
        alert('Thank you for signing up!')
      } else {
        // Incomplete fields or passwords don't match, display an error message
        this.errorMessage = !this.password ? 'Please enter a password.' : !this.confirmPassword ? 'Please confirm your password.' : 'Passwords do not match.'
      }
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

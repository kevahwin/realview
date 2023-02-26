<template>
    <div class="app-container">
      <NavbarComponent />
      <MainComp />
      <router-link to="/LoginView">
        <button class="btn btn-primary">Login to upload files</button>
      </router-link>
    </div>
  </template>
  
  <script>
  import MainComp from '../components/MainComp.vue';
  import NavbarComponent from '../components/NavbarComponent.vue';
  
  export default {
    name: 'App',
    components: {
      MainComp,
      NavbarComponent,
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    background-color: #ffffff;
    height: 100vh;
    width: 100vw;
  }
  
  .btn-primary {
    background-color: #22324E;
    color: #fff;
    padding: 6px 20px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 20px;
    border: none;
    margin-top: 10px;
    transition: all 0.2s ease-in-out;
  }
  
  .btn-primary:hover {
    background-color: #304C5A;
    transform: scale(1.1);
  }
  </style>
  
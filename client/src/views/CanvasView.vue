<template>
    <div class="app-container">
      <NavbarComponent />
      <DemoComp />
      <router-link to="/LoginView">
        <div class="centered">
          <button class="btn btn-primary float-button">Login to upload files</button>
        </div>
        
      </router-link>
    </div>
  </template>
  
  <script>
  import DemoComp from '../components/DemoComp.vue'
  import NavbarComponent from '../components/NavbarComponent.vue';
  
  export default {
    name: 'App',
    components: {
      DemoComp,
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

  .float-button {
  position: fixed;
  bottom: 15px;
  right: 40%;
  left: 40%;
  z-index: 9999;
}
.centered{
  position: relative;
  left: auto;
  right: auto;
}

@media (max-width: 767px) {
  .btn-primary {
    font-size: 16px;
    padding: 6px 15px;
  }

  .float-button {
  position: fixed;
  bottom: 15px;
  right: 20%;
  left: 20%;
  z-index: 9999;
}
}
</style>
  
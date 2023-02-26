<template>
    <div>
      <NavbarComponent />
      <MainComp />
      <SimpleUpload />  
      <!-- <ToolBar /> -->
  
      
    </div>
  
  </template>
  
  <script>
  
  
  import MainComp from '../components/MainComp.vue'
  import NavbarComponent from '../components/NavbarComponent.vue'
  import SimpleUpload from '../components/SimpleUpload.vue'
  // import ToolBar from '../components/ToolBar.vue'
  
  export default {
    name: 'App',
    components: {
      MainComp,
      NavbarComponent,
      SimpleUpload
      // ToolBar,
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  </style>
  
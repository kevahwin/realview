<template>
<div>
  <Signup />
  <NavbarComponent />
  <!-- <SideMenuComponent /> -->
  <MainComp />
  <SimpleUpload />
  <!-- <router-view /> -->
</div> 
</template>

<script>


import MainComp from './components/MainComp.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import SimpleUpload from './components/SimpleUpload.vue'
import Signup from './components/Signup.vue'
// import SideMenuComponent from './components/SideMenuComponent.vue'

export default {
  name: 'App',
  components: {
    Signup,
    SimpleUpload,
    // SideMenuComponent,
    MainComp,
    NavbarComponent
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
  margin-top: 60px;
}
</style>

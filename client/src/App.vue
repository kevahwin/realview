<template>
  <div>
   

    <router-link to="/LoginView">Login</router-link>
    <router-link to="/HomeView">Home</router-link>

  
    <router-view/>

    
  </div>

</template>

<script>



export default {
  name: 'App',
  components: {

  }
}
</script>



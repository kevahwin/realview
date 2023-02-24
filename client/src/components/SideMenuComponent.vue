<template>
    <div class="hamburger-menu">
      <div class="menu-icon" @click="showMenu = !showMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="menu-overlay" v-show="showMenu" @click="showMenu = false"></div>
      <div class="menu">
        <div class="menu-header">
          <h2>Menu</h2>
        </div>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li v-if="loggedIn">
            <button @click="logout">Logout</button>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li v-if="posts.length > 0">
            <h3>Posts</h3>
            <ul>
              <li v-for="post in posts" :key="post.id">
                <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="main" :class="{ shifted: showMenu }">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  
 // import { mapGetters } from 'vuex';
//   import PostComponent from './PostComponent.vue';
  
  export default {
    name: 'SideMenuComponent',
    // components: {
    //   PostComponent,
    // },
    data() {
      return {
        showMenu: false,
        posts: [],
      };
    },
    computed: {
     // ...mapGetters(['loggedIn']),
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await fetch('/api/posts');
          const data = await response.json();
          this.posts = data;
        } catch (error) {
          console.error(error);
        }
      },
      async logout() {
        try {
          const response = await fetch('/api/logout', {
            method: 'POST',
          });
          const data = await response.json();
          if (data.success) {
            this.$store.commit('setLoggedIn', false);
            this.$router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>
  .hamburger-menu {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .menu-icon {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50px;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .menu-icon span {
    background-color: black;
    border-radius: 10px;
    display: block;
    height: 3px;
    margin: 3px 0;
    transition: transform 0.2s, opacity 0.2s;
    width: 30px
  }  

</style>
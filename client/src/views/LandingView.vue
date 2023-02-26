<template>
    <div class="landing-page">
      <div class="logo">
        <h1 class="logo-text">RealView</h1>
      </div>
      <p class="description">VR Application for 3D Model Visualisation.</p>
      <router-link to="/CanvasView" class="cta-btn">Enter VR</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  };
  </script>
  
  <style scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, #2e4053, #233446, #192b3e, #101f35, #06162d);
  }

  .logo {
    text-align: center;
  }
  
  .logo-text {
    font-size: 72px;
    margin-bottom: 40px;
    color: #ffffff;
  }
  
  .description {
    font-size: 24px;
    margin-bottom: 40px;
    color: #ffffff;
    text-align: center;
  }
  
  .cta-btn {
    display: inline-block;
    background-color: #ffffff;
    color: #2e4053;
    padding: 10px 25px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
  }
  
  .cta-btn:hover {
    background-color: #2e4053;
    color: #ffffff;
    transform: scale(1.1);
  }
</style>

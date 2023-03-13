<template>
    <div>
      <canvas></canvas>
    </div>
  </template>
  
<script>
  import { demoScene } from '@/mainComp/demoScene';
  export default {
    name: 'demoComp',
    mounted() {
      const canvas = document.querySelector("canvas");
      new demoScene(canvas);
    }
  }
</script>
  
<style scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
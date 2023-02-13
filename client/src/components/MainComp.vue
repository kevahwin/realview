<template>
  <div>
    <h3>Software Engineering Group Project</h3>
    <canvas></canvas>
    

  </div>
</template>

<script>
import { mainScene } from '@/mainComp/mainScene';
export default {
  name: 'mainComp',
  mounted() {
    const canvas = document.querySelector("canvas");
    new mainScene(canvas);
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>
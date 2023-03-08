<template>
  <div>
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

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
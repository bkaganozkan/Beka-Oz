<template>
  <div id="app">
    <MainScene />
  </div>
</template>

<script>
import MainScene from "./components/ThreeJS/MainScene.vue";

export default {
  name: "App",
  components: {
    MainScene,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

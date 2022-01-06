<template>
  <div id="app">
    <MainScene />
    <BottomFolderContainer />
  </div>
</template>

<script>
import MainScene from "./components/ThreeJS/MainScene.vue";
import BottomFolderContainer from "./components/Containers/BottomFolderContainer";

export default {
  name: "App",
  components: {
    MainScene,
    BottomFolderContainer,
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
body {
  margin: 0px !important;
}
</style>

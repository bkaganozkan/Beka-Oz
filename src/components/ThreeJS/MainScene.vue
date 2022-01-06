<template>
  <div class="main-scene-container">
    <ModelSidebar :show="sceneSidebar" />
    <div class="main-scene">
      <canvas ref="main-scene-canvas" class="main-scene-canvas" />
    </div>
  </div>
</template>
<script>
import MainScene from "@/_helpers/ThreeJS/MainScene";
import ModelSidebar from "../Containers/ModelSidebar";

import { Box, Plane } from "@/_helpers/ThreeJS/Objects";

export default {
  name: "MainScene",
  components: {
    ModelSidebar,
  },
  data() {
    return {
      SceneComponents: null,
      PhysicWorld: null,
      renderer: null,

      // Model Sidebar show
      sceneSidebar: false,
    };
  },

  created() {
    this.SceneComponents = new MainScene();
  },

  mounted() {
    this.$nextTick(() => {
      this.SceneComponents.SetCanvas(this.$refs["main-scene-canvas"]);
      var PlaneObject = new Plane(true);
      var box = new Box(true);
      var box1 = new Box(true);
      var box2 = new Box(true);
      box.setPosition(0, 2, 0);
      box1.setPosition(2, 2, 0);
      box2.setPosition(-2, 2, 0);

      this.SceneComponents.AddObject(PlaneObject);
      this.SceneComponents.AddObject(box);

      box.MoveFunction();

      this.SceneComponents.AddObject(box1);
      this.SceneComponents.AddObject(box2);

      // RUN Scene
      this.SceneComponents.RunScene();

      // Resize-Responsive Page
      var onWindowResize = () => {
        this.SceneComponents.camera.aspect =
          window.innerWidth / window.innerHeight;
        this.SceneComponents.camera.updateProjectionMatrix();
        this.SceneComponents.renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
        this.SceneComponents.render();
      };
      window.addEventListener("resize", onWindowResize, false);
    });
  },


  methods:{
    
  }
};
</script>

<style lang="scss" scoped>
.main-scene-container {
  display: flex;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  min-height: 75vh;
  border: 3px solid red;
  
  // overflow-y: unset;
}
.main-scene {
  position: relative;
  width: -webkit-fill-available !important;
}
.main-scene-canvas {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>

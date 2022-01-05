<template>
  <div class="main-scene-container">
    <canvas ref="main-scene-canvas" class="main-scene-canvas" />
  </div>
</template>

<script>
import MainScene from "@/_helpers/ThreeJS/MainScene";

import Object3D, { Box, Plane } from "@/_helpers/ThreeJS/Objects";

export default {
  name: "MainScene",
  data() {
    return {
      SceneComponents: null,
      PhysicWorld: null,
      renderer: null,
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
};
</script>

<style lang="scss" scoped>
.main-scene-container {
  width: 100vw;
  height: 100vh;
}
.main-scene-canvas {
  width: 100%;
  height: 100%;
}
</style>

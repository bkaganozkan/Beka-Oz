<template>
  <div class="main-scene-container">
    <canvas ref="main-scene-canvas" class="main-scene-canvas" />
  </div>
</template>

<script>
import MainScene from "./MainScene.js";
import SceneObject from "./Objects/SceneObject";

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

    this.PhysicWorld = this.SceneComponents.GetPhysicWorld();

    var ScenePlaneObject = new SceneObject("Plane", null, true).CreatePlane(
      5,
      5
    );
    this.PhysicWorld.addBody(ScenePlaneObject.userData.physicBody);

    this.SceneComponents.AddObject(ScenePlaneObject);
  },

  mounted() {
    this.$nextTick(() => {
      this.SceneComponents.SetCanvas(this.$refs["main-scene-canvas"]);
      var BoxObject = new SceneObject("Box_1", null, true).CreateBox();
      this.PhysicWorld.addBody(BoxObject.userData.physicBody);
      this.SceneComponents.AddObject(BoxObject);
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

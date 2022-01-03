import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import SceneObject from "./Objects/SceneObject";

class MainScene {
  static SceneObjects = [];
  static delta;
  // static PhysicWorld = null
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x808080);
    this.camera;
    this.renderer;
    this.orbitControl;
    this.dragControl;
    this.clock = new THREE.Clock();   

    // World Gravity/ Physics Options
    this.world = new CANNON.World();
    this.world.gravity.set(0, -10, 0);

    this.cannonDebugRenderer = new CannonDebugger(this.scene, this.world);
  }

  SetCanvas(value) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: value,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.SetCamera();
    this.SetOrbitControl(this.camera, this.renderer.domElement);
    // console.log(value);
  }

  SetCamera() {
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 3, 6);
  }

  SetOrbitControl(camera, domElement) {
    this.orbitControl = new OrbitControls(camera, domElement);
  }

  AddObject(Object) {
    MainScene.SceneObjects.push(Object);
    this.scene.add(Object);
  }

  GetPhysicWorld() {
    return this.world;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  updateCubeCoordinates(boxObject) {
    boxObject.position.set(
      boxObject.userData.physicBody.position.x,
      boxObject.userData.physicBody.position.y,
      boxObject.userData.physicBody.position.z
    );
    boxObject.quaternion.set(
      boxObject.userData.physicBody.quaternion.x,
      boxObject.userData.physicBody.quaternion.y,
      boxObject.userData.physicBody.quaternion.z,
      boxObject.userData.physicBody.quaternion.w
    );
  }

  getDeltaTime() {
     
    this.delta = Math.min(this.clock.getDelta(), 0.1);
    this.world.step(this.delta);
  }

  RunScene() {
    var animate = () => {
      requestAnimationFrame(animate);

      this.getDeltaTime();
      
      // SceneObject.MoveShape("Box_1");

      this.cannonDebugRenderer.update();
      this.render();
    };

    animate();
  }
}

export default MainScene;

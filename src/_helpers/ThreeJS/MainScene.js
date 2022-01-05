import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
// import ParentObject from "@/_helpers/ThreeJS/ParentObject";

class MainScene {
  static SceneObjects = [];
  static DraggableObjects = [];
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

  // Controls

  DisableCollusion(Sobject) {
    let object = MainScene.SceneObjects.filter(
      (object) => object.object == Sobject
    );
    object[0].physicEnable = false;
  }
  EnableCollusion(Sobject) {
    let object = MainScene.SceneObjects.filter(
      (object) => object.object == Sobject
    );
    object[0].setCollusion();
    object[0].physicEnable = true;
  }

  SwitchOrbitDraggableControl() {
    this.SetOrbitControl(this.camera, this.renderer.domElement);
    this.SetDragControl(this.camera, this.renderer.domElement);

    this.dragControl.addEventListener("dragstart", (event) => {
      this.DisableCollusion(event.object);
      this.orbitControl.dispose();
    });
    this.dragControl.addEventListener("dragend", (event) => {
      this.SetOrbitControl(this.camera, this.renderer.domElement);
      this.EnableCollusion(event.object);
    });
  }

  SetOrbitControl(camera, domElement) {
    this.orbitControl = new OrbitControls(camera, domElement);
  }

  SetDragControl(camera, domElement) {
    let DraggableObjects = MainScene.DraggableObjects.map(
      (dragObject) => dragObject.object
    );
    this.dragControl = new DragControls(DraggableObjects, camera, domElement);
    // console.log(MainScene.DraggableObjects);
  }

  // #######################################################################################

  AddObject(Object) {
    MainScene.SceneObjects.push(Object);
    Object.userData.draggable ? MainScene.DraggableObjects.push(Object) : null;
    this.scene.add(Object.object);
    Object.physicEnable ? this.world.addBody(Object.collusion) : null;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  getDeltaTime() {
    this.delta = Math.min(this.clock.getDelta(), 0.1);
    this.world.step(this.delta);
  }

  RunScene() {
    this.SwitchOrbitDraggableControl();

    var animate = () => {
      requestAnimationFrame(animate);

      this.getDeltaTime();
      MainScene.SceneObjects.map((object) => {
        object.updateMeshCoordinate();
      });
      // this.cannonDebugRenderer.update();
      this.render();
    };

    animate();
  }
}

export default MainScene;

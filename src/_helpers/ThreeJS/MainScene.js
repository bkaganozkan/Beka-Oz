import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import ParentObject from "./Objects/ParentObject";

class MainScene {
  static SceneObjects = [];
  static DraggableObjects = [];
  static delta;
  static camera;
  // static PhysicWorld = null
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x808080);

    this.orbitControl;
    this.renderer;

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

  GetObjectByMesh(Sobject) {
    let object = MainScene.SceneObjects.filter(
      (object) => object.object === Sobject
    )[0];
    return object;
  }

  // ############################### CAMERA CONTROL ##########################

  SwitchOrbitDraggableControl() {
    this.SetOrbitControl(this.camera, this.renderer.domElement);
    this.SetDragControl(this.camera, this.renderer.domElement);

    this.dragControl.addEventListener("dragstart", (event) => {
      let Pobject = this.GetObjectByMesh(event.object);
      Pobject.DisableCollusion();
      this.orbitControl.dispose();
    });
    this.dragControl.addEventListener("dragend", (event) => {
      this.SetOrbitControl(this.camera, this.renderer.domElement);
      let Pobject = this.GetObjectByMesh(event.object);
      Pobject.EnableCollusion();
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

    let transform = ParentObject.TransformObject();
    transform.raycaster.setFromCamera(transform.mouse, this.camera);

    // calculate objects intersecting the picking ray
    const intersects = transform.raycaster.intersectObjects(
      this.scene.children
    );

    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
    }
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

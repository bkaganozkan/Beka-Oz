import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Vec3 } from "cannon-es";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import MainScene from "../MainScene";

class Object3D {
  static SceneObjects = [];
  constructor(
    physicEnable = false,
    collusion = null,
    object = null,
    userData = {
      tansformController: null,
    }
  ) {
    this.object = object;
    this.physicEnable = physicEnable;
    this.collusion = collusion;
    this.userData = userData;
    this.userData.draggable = true;
  }

  collusionInit() {
    this.physicEnable
      ? (this.collusion.position = new Vec3(
          this.object.position.x,
          this.object.position.y,
          this.object.position.z
        ))
      : null;
  }

  updateMeshCoordinate() {
    this.physicEnable
      ? this.object.position.set(
          this.collusion.position.x,
          this.collusion.position.y,
          this.collusion.position.z
        )
      : null;
    this.physicEnable
      ? this.object.quaternion.set(
          this.collusion.quaternion.x,
          this.collusion.quaternion.y,
          this.collusion.quaternion.z,
          this.collusion.quaternion.w
        )
      : null;
  }
  setPosition(x, y, z) {
    this.object.position.set(x, y, z);
    this.collusionInit();
  }

  DisableCollusion() {
    this.physicEnable = false;
  }
  EnableCollusion() {
    this.setCollusion();
    this.physicEnable = true;
  }

  setCollusion() {
    this.collusion.position = new Vec3(
      this.object.position.x,
      this.object.position.y,
      this.object.position.z
    );
  }

  // Move Function -- Ameteur #########################################
  MoveFunction(forward = "KeyW", back = "KeyS", right = "KeyD", left = "KeyA") {
    document.addEventListener("keypress", (event) => {
      if (event.code === forward) {
        (() => {
          this.DisableCollusion();
          this.object.position.z -= 0.1;
          this.EnableCollusion();
        })();
      }
      if (event.code === back) {
        (() => {
          this.DisableCollusion();
          this.object.position.z += 0.1;
          this.EnableCollusion();
        })();
      }
      if (event.code === right) {
        (() => {
          this.DisableCollusion();
          this.object.position.x += 0.1;
          this.EnableCollusion();
        })();
      }
      if (event.code === left) {
        (() => {
          this.DisableCollusion();
          this.object.position.x -= 0.1;
          this.EnableCollusion();
        })();
      }
    });
  }
  static TransformObject() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    var v = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    return { raycaster, mouse };
  }
}

export default Object3D;

import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Vec3 } from "cannon-es";
// import MainScene from "@/components/ThreeJS/MainScene";

class Object3D {
  static SceneObjects = [];
  constructor(
    physicEnable = false,
    collusion = null,
    object = null,
    userData = {}
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

  setCollusion() {
    this.collusion.position = new Vec3(
      this.object.position.x,
      this.object.position.y,
      this.object.position.z
    );
  }
}

// static MoveShape(name) {
//   const selectedObject = MainScene.SceneObjects.filter(
//     (object) => object.userData.info.name == name
//   )[0];
//   if (selectedObject) {
//     selectedObject.position.x += 0.01;
//     selectedObject.position.y += 0.01;
//   } else {
//     console.log("Obje Bulunmadı");
//   }
// }

export default Object3D;

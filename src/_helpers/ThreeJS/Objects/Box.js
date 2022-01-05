import * as THREE from "three";
import * as CANNON from "cannon-es";
import Object3D from "./ParentObject";

class Box extends Object3D {
  constructor(physicEnable, size_x = 1, size_y = 1, size_z = 1) {
    super(physicEnable);
    const boxGeometry = new THREE.BoxGeometry(size_x, size_y, size_z);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    this.object = boxMesh;
    // Enable Physics by CANNON
    if (this.physicEnable) {
      const boxShape = new CANNON.Box(
        new CANNON.Vec3(size_x / 2, size_y / 1, size_z / 1)
      );
      const boxBody = new CANNON.Body({ mass: 1 });
      boxBody.addShape(boxShape);
      boxBody.position.x = boxMesh.position.x;
      boxBody.position.y = boxMesh.position.y;
      boxBody.position.z = boxMesh.position.z;
      this.collusion = boxBody;
      
    }
  }
}

export default Box;

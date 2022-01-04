import * as THREE from "three";
import * as CANNON from "cannon-es";
import Object3D from "./ParentObject";

class Plane extends Object3D {
  constructor(physicEnable, object, size_x = 10, size_y = 10) {
    super(physicEnable);
    this.userData.draggable = false
    const planeGeometry = new THREE.PlaneGeometry(size_x, size_y);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4d4d4d,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.receiveShadow = true;
    planeMesh.userData.info = { name: this.name };
    this.object = planeMesh;

    if (this.physicEnable) {
      const planeShape = new CANNON.Box(
        new CANNON.Vec3(size_x / 2, size_y / 2, 0.1)
      );
      const planeBody = new CANNON.Body({ mass: 0 });
      planeBody.addShape(planeShape);
      planeBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );
      this.collusion = planeBody;
    }
  }
}

export default Plane;

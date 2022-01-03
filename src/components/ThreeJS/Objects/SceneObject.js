import * as THREE from "three";
import * as CANNON from "cannon-es";
import MainScene from "../MainScene";

class SceneObject extends THREE.Object3D {
  static SceneObjects = [];
  constructor(name = "", object = null, physicEnable = false) {
    super();
    this.object = object;
    this.name = name;
    this.physicEnable = physicEnable;
  }

  CreatePlane(size_x = 1, size_y = 1) {
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
      const planeShape = new CANNON.Plane();
      const planeBody = new CANNON.Body({ mass: 1 });
      planeBody.addShape(planeShape);
      planeBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );
      this.object.userData.physicBody = planeBody;
    }
    return this.object;
  }

  CreateBox(size_x = 1, size_y = 1, size_z = 1) {
    const boxGeometry = new THREE.BoxGeometry(size_x, size_y, size_z);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = 1;
    boxMesh.userData.info = { name: this.name };
    this.object = boxMesh;
    // this.object.visible = false;
    if (this.physicEnable) {
      const boxShape = new CANNON.Box(
        new CANNON.Vec3(size_x / 2, size_y / 2, size_z / 2)
      );
      const boxBody = new CANNON.Body({ mass: 1 });
      boxBody.addShape(boxShape);
      boxBody.position.x = boxMesh.position.x;
      boxBody.position.y = boxMesh.position.y;
      boxBody.position.z = boxMesh.position.z;
      this.object.userData.physicBody = boxBody;
      console.log(this.object);
    }
    return this.object;
  }

  static MoveShape(name) {
    const selectedObject = MainScene.SceneObjects.filter(
      (object) => object.userData.info.name == name
    )[0];
    console.log(selectedObject);
    if (selectedObject) {
      selectedObject.position.x += 0.01;
      selectedObject.position.y += 0.01;
    } else {
      console.log("Obje Bulunmadı");
    }
  }
}

export default SceneObject;

import * as THREE from 'three'

export default class Plane {
    constructor(app, width, height, color, direction, rotationFLag = true) {
        this.app = app;

        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.pivot = new THREE.Object3D();
        this.pivot.add(this.mesh);

        this.childrens = [];

        this.rotationFLag = rotationFLag;

        this.app.scene.add(this.pivot);

        this.width = width;
        this.height = height;

        this.direction = direction;
    }

    setRotation(axis, angle) {
        if (this.rotationFLag) this.pivot.rotation.setFromRotationMatrix(new THREE.Matrix4().makeRotationAxis(axis, angle));
    }

    setMeshPosition() {
        const parentDirectionVector = new THREE.Vector3(this.parent.width, this.parent.height, 0);
        const pivotPosition = parentDirectionVector.multiply(this.direction);

        this.pivot.position.add(pivotPosition);

        const meshDirectionVector = new THREE.Vector3(this.width, this.height, 0);
        const meshPosition = meshDirectionVector.multiply(this.direction)

        this.mesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
    }

    makeParent(parent) {
        this.parent = parent;
        if (this.parent) this.parent.makeChildren(this);
    }

    makeChildren(child) {
        this.childrens.push(child);
        this.pivot.add(child.pivot);

        const parentDirectionVector = new THREE.Vector3(this.width, this.height, 0);
        const pivotPosition = parentDirectionVector.multiply(this.direction);

        child.pivot.position.set(pivotPosition.x, pivotPosition.y, pivotPosition.z)
    }

    getPivotPosition() {
        return this.pivot.position.clone();
    }

    getMeshPosition() {
        return this.mesh.position.clone();
    }

    getMeshGlobalPosition() {
        return this.pivot.position.clone().add(this.mesh.position.clone())
    }
}
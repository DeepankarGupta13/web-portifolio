// Import Three.js if you haven't already
import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry for a circle
const circleGeometry = new THREE.PlaneGeometry(0.1, 0.1);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const bufferGeometry = new THREE.InstancedBufferGeometry();
bufferGeometry.copy(circleGeometry)

// Create an instancedMesh
const circleCount = 10;
const circleMesh = new THREE.InstancedMesh(circleGeometry, circleMaterial, circleCount);

// Position and scale each instance
for (let i = 0; i < circleCount + 1; i++) {
  const T = new THREE.Object3D();
  // const matrix = new THREE.Matrix4();
  // matrix.setPosition(0, i+7, 0); // Adjust the position as needed
  T.position.set(0, i * 0.1, 0);
  T.scale.y = 0.1;
  T.scale.x = i * 2;

  T.updateMatrix();
  circleMesh.setMatrixAt(i, T.matrix);
  circleMesh.instanceMatrix.needsUpdate = true;
  // lineMesh.setMatrixAt(i, matrix);
}

scene.add(circleMesh);

// Set camera position
camera.position.z = 5;

// Create an animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // // Rotate the instances (optional)
  // circleMesh.rotation.x += 0.01;
  // circleMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

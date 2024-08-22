// Create a scene, camera, and renderer
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();

let model;

loader.load('http://localhost:5174/humaniod1.glb', function(gltf) {
  model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1);
  scene.add(model);
}, undefined, function(error) {
  console.error(error);
});

// Render loop: here we can add animations
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Handle window resizing doesnt break on resizing the window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
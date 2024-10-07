import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const midpoint1 = new THREE.Vector3(0, 0, 0);
const midpoint2 = new THREE.Vector3(0, 3, 5);

const linePoints = [midpoint1, midpoint2];

const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
const lineMesh = new THREE.Mesh(lineGeom, lineMat);
scene.add(lineMesh);
console.log('scene: ', scene);

// Position the camera
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();


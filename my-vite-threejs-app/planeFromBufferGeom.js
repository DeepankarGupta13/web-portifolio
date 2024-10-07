import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Define vertices for the plane (two triangles to form a quad)
// The plane is in the X-Y plane with Z = 0
const plane1 = createPlaneFromBufferGeom(new Float32Array([
  // First triangle
  -1.0,  1.0,  0.0,  // Top left
  -1.0, -1.0,  0.0,  // Bottom left
   1.0,  1.0,  0.0,  // Top right

  // Second triangle
   1.0,  1.0,  0.0,  // Top right
  -1.0, -1.0,  0.0,  // Bottom left
   1.0, -1.0,  0.0   // Bottom right
]));

const plane2 = createPlaneFromBufferGeom(new Float32Array([
  // First triangle
  2.0,  1.0,  0.0,  // Top left
  2.0, -1.0,  0.0,  // Bottom left
  4.0,  1.0,  0.0,  // Top right

  // Second triangle
  4.0,  1.0,  0.0,  // Top right
  2.0, -1.0,  0.0,  // Bottom left
  4.0, -1.0,  0.0   // Bottom right
]));

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([plane1.geometry, plane2.geometry]);

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });  // Red color

// Create a single mesh from the merged geometry
const mergedMesh = new THREE.Mesh(mergedGeometry, material);
scene.add(mergedMesh);

mergedMesh.position.z = 10;

// Position the camera
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

function createPlaneFromBufferGeom(vertices) {
  // Create the BufferGeometry and set its position attribute
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  // Create a basic material
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });  // Green color, both sides visible
  
  // Create the mesh
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  return plane;
}


import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.localClippingEnabled = true;

// Create two plane geometries (for the purpose of creating edges)
const vertices1 = new Float32Array([
    -1.0,  1.0,  0.0,  // Plane 1
    -1.0, -1.0,  0.0,
     1.0,  1.0,  0.0,

     1.0,  1.0,  0.0,
    -1.0, -1.0,  0.0,
     1.0, -1.0,  0.0
]);

const vertices2 = new Float32Array([
    1.0,  1.0,  0.0,   // Plane 2 (shifted)
    1.0, -1.0,  0.0,
    3.0,  1.0,  0.0,

    3.0,  1.0,  0.0,
    1.0, -1.0,  0.0,
    3.0, -1.0,  0.0
]);

// create plane for clipping
const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-5, 0, 0));
const planeHelper = new THREE.PlaneHelper(plane, 3, 0x00ff00);
scene.add(planeHelper);
// Create BufferGeometries for both planes
const geometry1 = new THREE.BufferGeometry();
geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));

const geometry2 = new THREE.BufferGeometry();
geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3));

const mergedPlaneGeometry = BufferGeometryUtils.mergeBufferGeometries([geometry1, geometry2]);
const material = new THREE.MeshBasicMaterial({color: 0xff0000, clippingPlanes: [plane], clipShadows: true})
const mergedMesh = new THREE.Mesh(mergedPlaneGeometry, material)

// Create EdgesGeometry for each plane (extracting only the outer edges)
const edges1 = new THREE.EdgesGeometry(geometry1, 1);  // Edges for the first plane
const edges2 = new THREE.EdgesGeometry(geometry2, 1);  // Edges for the second plane

// Merge the line geometries from the two planes
const mergedLineGeometry = BufferGeometryUtils.mergeBufferGeometries([edges1, edges2]);

// Create a material for the lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, clippingPlanes: [plane], clipShadows: true });  // Black color

// Create a single LineSegments mesh from the merged line geometry
const mergedOutline = new THREE.LineSegments(mergedLineGeometry, lineMaterial);
scene.add(mergedOutline, mergedMesh);

// Set camera position
camera.position.z = 5;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
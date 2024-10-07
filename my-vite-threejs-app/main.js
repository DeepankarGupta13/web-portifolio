import * as THREE from 'three';
import * as CSG from 'three-bvh-csg';  // Import CSG
import '../my-vite-threejs-app/style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

const brush1 = new CSG.Brush( new THREE.SphereGeometry(2.5, 32) );
brush1.updateMatrixWorld();

// const box = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.3}))
const brush2 = new CSG.Brush(new THREE.BoxGeometry(5, 5, 5));
brush2.material = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.3, transparent: true})
brush2.position.y = 3;
brush2.updateMatrixWorld();

const evaluator = new CSG.Evaluator();
const result = evaluator.evaluate( brush1, brush2, CSG.SUBTRACTION );
result.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.9, transparent: true})
console.log('result: ', result);

// render the result!

// Convert back to Three.js mesh and add to the scene
// const clippedMesh = CSG.toMesh(clippedCSG, planeMesh.matrix, planeMesh.material);
scene.add(result, brush2);

// Position the camera
camera.position.z = 20;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}
animate();

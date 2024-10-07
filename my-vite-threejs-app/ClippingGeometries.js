import * as THREE from 'three';
import * as CSG from 'three-bvh-csg';  // Import CSG
import '../my-vite-threejs-app/style.css';

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const brush1 = new CSG.Brush( new THREE.SphereGeometry() );
brush1.updateMatrixWorld();

const brush2 = new CSG.Brush( new THREE.BoxGeometry() );
brush2.position.y = 0.5;
brush2.updateMatrixWorld();

const evaluator = new CSG.Evaluator();
const result = evaluator.evaluate( brush1, brush2, CSG.SUBTRACTION );

// render the result!

// Convert back to Three.js mesh and add to the scene
// const clippedMesh = CSG.toMesh(clippedCSG, planeMesh.matrix, planeMesh.material);
scene.add(result);

// Position the camera
camera.position.z = 20;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

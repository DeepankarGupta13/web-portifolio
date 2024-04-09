import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GoogleTilesRenderer } from '3d-tiles-renderer';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const googleTilesRenderer = new GoogleTilesRenderer("AIzaSyBOVbQ7oSTZZVfg4eVzBCYifEMT-tx-5sI");
googleTilesRenderer.setLatLonToYUp(35.6586 * Math.PI / 180, 139.7454 * Math.PI / 180); // Tokyo Tower

// Note the DRACO compression files need to be supplied via an explicit source.
// We use unpkg here but in practice should be provided by the application.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/');

const loader = new GLTFLoader(googleTilesRenderer.manager);
loader.setDRACOLoader(dracoLoader);

googleTilesRenderer.manager.addHandler(/\.gltf$/, loader);
scene.add(googleTilesRenderer.group);

googleTilesRenderer.setResolutionFromRenderer(camera, renderer);
googleTilesRenderer.setCamera(camera);
googleTilesRenderer.setResolutionFromRenderer( camera, renderer );
scene.add(googleTilesRenderer.group);

function animate() {
  requestAnimationFrame(animate);
  camera.updateMatrixWorld();
  googleTilesRenderer.update();
  renderer.render(scene, camera);
}

animate();


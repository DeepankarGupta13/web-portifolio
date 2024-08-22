// Create a scene, camera, and renderer
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a basic material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Number of cubes along each axis
const numCubesPerAxis = 11;
const numCubes = numCubesPerAxis * numCubesPerAxis * numCubesPerAxis;

// Create instanced geometry
const instancedGeometry = new THREE.InstancedBufferGeometry().copy(geometry);

// Create the instanced mesh
const instancedMesh = new THREE.InstancedMesh(instancedGeometry, material, numCubes);

// Set instance positions
const dummy = new THREE.Object3D();
let index = 0;
for (let x = 0; x < numCubesPerAxis; x++) {
  for (let y = 0; y < numCubesPerAxis; y++) {
    for (let z = 0; z < numCubesPerAxis; z++) {
      dummy.position.set(x - numCubesPerAxis / 2, y - numCubesPerAxis / 2, z - numCubesPerAxis / 2);
      dummy.updateMatrix();

      dummy.position.set(x - numCubesPerAxis / 2, y - numCubesPerAxis / 2, z - numCubesPerAxis / 2);
      dummy.updateMatrix();
      dummy.rotation.x += 0.01;
      dummy.rotation.y += 0.01;
      instancedMesh.setMatrixAt(index++, dummy.matrix);

      // instancedMesh.setColorAt(index, new THREE.Color(Math.random(), Math.random(), Math.random()));
      // instancedMesh.instanceColor.needsUpdate = true;
    }
  }
}

// Add the mesh to the scene
scene.add(instancedMesh);

// Position the camera
camera.position.z = 20;

const rotationDummy = new THREE.Object3D();
// Render loop
function animate() {
  requestAnimationFrame(animate);

  // // Optional: Rotate the cube formation
  instancedMesh.rotation.y += 0.01;
  instancedMesh.rotation.x += 0.01;

  // console.log('numCubes: ', numCubes);
  // console.log('instancedMesh: ', instancedMesh.count);

  for (let index = 0; index < numCubes; index++) {
    instancedMesh.setColorAt(index, new THREE.Color(Math.random(), Math.random(), Math.random()));
    instancedMesh.instanceColor.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
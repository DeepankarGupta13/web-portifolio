// Create a scene, camera, and renderer
import * as THREE from 'three';
import { mix, range, normalWorld, oscSine, timerLocal } from 'three/nodes';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Plane geometry
const normalGeometry = new THREE.PlaneGeometry(1, 0.1);

/* create Normal mesh
// const normalMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const normalPlane = new THREE.Mesh( normalGeometry, normalMaterial );
// scene.add(normalPlane); */

/* instanced Mesh */
{
  // instanced geometry
  const instancedGeometry = new THREE.InstancedBufferGeometry();
  instancedGeometry.copy(normalGeometry);
  console.log('instancedGeometry: ', instancedGeometry);

  // Define attributes for instances (position, rotation, scale, etc.)
  const numInstances = 10; // Adjust the number of instances as needed

  // Create arrays to store instance data
  const instancePositions = new Float32Array(numInstances * 3); // 3 for x, y, z
  const instanceRotations = new Float32Array(numInstances * 4); // 4 for quaternion rotation
  const scale = new Float32Array(numInstances * 3);

  // Fill the arrays with instance data
  for (let i = 0; i < numInstances; i++) {
    // Example: Set positions for each instance
    instancePositions[i * 3] = Math.random() * 10 - 5; // Random x position between -5 and 5
    instancePositions[i * 3 + 1] = Math.random() * 10 - 5; // Random y position between -5 and 5
    instancePositions[i * 3 + 2] = Math.random() * 10 - 5; // Random z position between -5 and 5

    // Example: Set random rotations for each instance (as quaternions)
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI));
    instanceRotations.set([rotation.x, rotation.y, rotation.z, rotation.w], i * 4);
  }

  // Add attributes to the instanced geometry
  instancedGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(instancePositions, 3));
  instancedGeometry.setAttribute('instanceRotation', new THREE.InstancedBufferAttribute(instanceRotations, 4));
  // instancedGeometry.setAttribute('scale', new THREE.InstancedBufferAttribute(scale, 3));

  // Instanced mesh
  // Create an InstancedMesh
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Adjust the material as needed
  // create a material
  const material = new THREE.MeshBasicMaterial();

  // random colors between instances from 0x000000 to 0xFFFFFF
  const randomColors = range(new THREE.Color(0x000000), new THREE.Color(0xFFFFFF));

  material.colorNode = mix(normalWorld, randomColors, oscSine(timerLocal(.1)));
  const instancedMesh = new THREE.InstancedMesh(instancedGeometry, material, numInstances);
  instancedMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
  instancedGeometry.instanceCount = numInstances;

  for (let i = 0; i < 5; i++) {
    const T = new THREE.Object3D();
    // const matrix = new THREE.Matrix4();
    // matrix.setPosition(0, i+7, 0); // Adjust the position as needed
    T.position.set(0, 0, 0);
    T.scale.y = 0.1;

    T.updateMatrix();
    instancedMesh.setMatrixAt(i, T.matrix);
    instancedMesh.instanceMatrix.needsUpdate = true;
    // lineMesh.setMatrixAt(i, matrix);
}

  scene.add(instancedMesh);
}

// Set camera position
camera.position.z = 30;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the line instances (optional)
    // lineMesh.rotation.x += 0.01;
    // lineMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
// Create a scene, camera, and renderer
import * as THREE from 'three';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a line geometry
const g = new LineGeometry();
const points = [];
points.push(-1, 0, 0, 1, 0, 0);
g.setPositions(points);

const bufferGeometry = new THREE.BufferGeometry().copy(g);
// const geometry = new THREE.InstancedBufferGeometry();
// geometry.setFromPoints([
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(1, 0, 0),
//   new THREE.Vector3(0, 1, 0),
//   new THREE.Vector3(1, 1, 0),
// ]);

// const material = new LineMaterial({
//   color: new THREE.Color(0xff0000),
//   linewidth: 0.001,
//   });

const material1 = new THREE.LineBasicMaterial({
  color: 0xffff00,
  linewidth: 0.001,
  // onBeforeCompile: shader => {
  //   //console.log(shader.vertexShader);
  //   shader.vertexShader = `
  //       attribute vec3 offset;
  //       ${shader.vertexShader}
  //     `.replace(
  //     `#include <begin_vertex>`,
  //     `
  //       #include <begin_vertex>
  //       transformed += offset;
  //       `
  //   );
  //   //console.log(shader.vertexShader);
  // }
});

// Create an InstancedMesh
const line = new THREE.Line(g, material1)
scene.add(line);


const lineMesh = new THREE.InstancedMesh(bufferGeometry, material1, 5); // 5 instances
lineMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

// Set instance positions
for (let i = 0; i < 5; i++) {
    const T = new THREE.Object3D();
    // const matrix = new THREE.Matrix4();
    // matrix.setPosition(0, i+7, 0); // Adjust the position as needed
    T.position.set(0, 0, 0);
    T.scale.y = 0.1;

    T.updateMatrix();
    lineMesh.setMatrixAt(i, T.matrix);
    lineMesh.instanceMatrix.needsUpdate = true;
    // lineMesh.setMatrixAt(i, matrix);
}

// Add the line mesh to the scene
scene.add(lineMesh);

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
// Import Three.js and create a scene, camera, and renderer
// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Define your line's geometry (a simple straight line)
// const numInstances = 10; // Number of instances of the line
// const lineLength = 1;   // Length of each line segment

// const positions = new Float32Array(numInstances * 2 * 3); // Two vertices (x, y, z) per line segment
// console.log('positions: ', positions);
// const colors = new Float32Array(numInstances * 2 * 3);    // Color data (R, G, B) for each line segment
// console.log('colors: ', colors);

// const lineGeometry = new THREE.InstancedBufferGeometry();
// lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
// lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// // Define the material for your line
// const lineMaterial = new THREE.RawShaderMaterial({
//     vertexShader: `
//     precision mediump float;
//     precision mediump int;

//     uniform mat4 modelViewMatrix; // optional
//     uniform mat4 projectionMatrix; // optional

//     attribute vec3 position;
//     attribute vec4 color;

//     varying vec3 vPosition;
//     varying vec4 vColor;

//     void main()	{

//       vPosition = position;
//       vColor = color;

//       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

//     }
//     `,
//     fragmentShader: `
//     precision mediump float;
//     precision mediump int;

//     uniform float time;

//     varying vec3 vPosition;
//     varying vec4 vColor;

//     void main()	{

//       vec4 color = vec4( vColor );
//       color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

//       gl_FragColor = color;

//     }
//     `,
// });

// // Create the line mesh
// const lineMesh = new THREE.InstancedMesh(lineGeometry, lineMaterial);
// scene.add(lineMesh);

// // Set up instance data (position and color)
// const instancePosition = new THREE.Vector3();
// const instanceColor = new THREE.Color();

// for (let i = 0; i < numInstances; i++) {
//     // Set position for each instance (change this according to your requirements)
//     instancePosition.set(i * 2, 0, 0); // Spread out along the X-axis

//     // Set color for each instance (change this according to your requirements)
//     instanceColor.set(Math.random(), Math.random(), Math.random());

//     // Copy the data into the buffer arrays
//     instancePosition.toArray(positions, i * 2 * 3);
//     instanceColor.toArray(colors, i * 2 * 3);
// }

// // Update the instanced buffer geometry
// lineGeometry.attributes.position.needsUpdate = true;
// lineGeometry.attributes.color.needsUpdate = true;

// // Position and orient the camera
// camera.position.z = 5;

// // Render the scene
// const animate = () => {
//     requestAnimationFrame(animate);

//     // Rotate the line (for visualization)
//     // lineMesh.rotation.x += 0.01;
//     // lineMesh.rotation.y += 0.01;

//     renderer.render(scene, camera);
// };

// animate();



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
// console.log('g: ', g);

//now we have the 3 buffers ready, we can build a new BufferGeometry
// Create a regular BufferGeometry for the line
const lineGeometry = new THREE.BufferGeometry();

// Define the positions for the line vertices (two vertices per line segment)
const positions = new Float32Array(2 * 2 * 3); // Two vertices (x, y, z) per line segment

for (let i = 0; i < 2; i++) {
    const x = i * 5 * 2;          // Spread out along the X-axis with spacing equal to 5
    positions[i * 6] = 0;         // Vertex 1: x-coordinate
    positions[i * 6 + 1] = 0;     // Vertex 1: y-coordinate
    positions[i * 6 + 2] = 0;     // Vertex 1: z-coordinate
    positions[i * 6 + 3] = 0;     // Vertex 2: x-coordinate
    positions[i * 6 + 4] = x;             // Vertex 2: y-coordinate
    positions[i * 6 + 5] = 0;             // Vertex 2: z-coordinate
}

lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create a new InstancedBufferGeometry
const instancedLineGeometry = new THREE.InstancedBufferGeometry();

// Copy the attributes from the regular geometry to the instanced geometry
instancedLineGeometry.copy(lineGeometry);
  // bg.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  // bg.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
  // bg.setIndex( new THREE.BufferAttribute( indices, 1 ) );
// // console.log('geometry: ', g, bg);
// // const vertices = new Float32Array([
// //     -1, 0, 0,
// //     1, 0, 0,
// // ]);
// // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const vertices = [
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(10, 0, 0),
//   // new THREE.Vector3(20, 0, 0),
//   // new THREE.Vector3(30, 0, 0),
//   // new THREE.Vector3(40, 0, 0),
//   // new THREE.Vector3(50, 0, 0)
// ];

// const positions = new Float32Array(vertices.length * 3);

// for (var i = 0; i < vertices.length; i++) {

//   positions[i * 3] = vertices[i].x;
//   positions[i * 3 + 1] = vertices[i].y;
//   positions[i * 3 + 2] = vertices[i].z;

// }

// const indices = [0, 1, 1, 2, 2, 3, 4, 5];

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
// geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));


// Create a line material

// const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
const geometry = new THREE.InstancedBufferGeometry();
geometry.setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 1, 0),
]);

const material = new LineMaterial({
  color: new THREE.Color(0xff0000),
  linewidth: 0.001,
  });

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
const line = new THREE.Line(instancedLineGeometry, material1)
scene.add(line);


const lineMesh = new THREE.InstancedMesh(instancedLineGeometry, material1, 5); // 5 instances
lineMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

// Set instance positions
for (let i = 0; i < 5; i++) {
    const T = new THREE.Object3D();
    // const matrix = new THREE.Matrix4();
    // matrix.setPosition(0, i+7, 0); // Adjust the position as needed
    T.position.set(0, i, 0);
    T.scale.x = 10 + (i * 2);
    T.updateMatrix();
    lineMesh.setMatrixAt(i, T.matrix);
    lineMesh.instanceMatrix.needsUpdate = true;
    // lineMesh.setMatrixAt(i, matrix);
}
// const T = new THREE.Object3D();
// // const matrix = new THREE.Matrix4();
// // matrix.setPosition(0, i+7, 0); // Adjust the position as needed
// T.position.set(0, 5, 0);
// T.updateMatrix();
// lineMesh.setMatrixAt(0, T.matrix);
// lineMesh.instanceMatrix.needsUpdate = true;

// Add the line mesh to the scene
// scene.add(lineMesh);
// lineMesh.setPositions(positions);

// Add the line mesh to the scene
scene.add(lineMesh);

// Set camera position
camera.position.z = 15;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the line instances (optional)
    // lineMesh.rotation.x += 0.01;
    // lineMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();






// // // function getCanvas(size){
// // //   size = size || 16;
// // //   var canvas = document.createElement('canvas');
// // //   canvas.width = canvas.height = size;
// // //   var ctx = canvas.getContext('2d');
// // //   ctx.fillStyle = "#FFF";
// // //   ctx.fillRect( 0,0, size, size);
// // //   var half = size/2;
// // //   ctx.fillStyle = "#000";
// // //   ctx.fillRect( 0,0, half,half );
// // //   ctx.fillRect( half, half, half,half );
// // //   return canvas;
// // // }

// // // function init(){

// // //   //create a regular geometry
// // //   var g = new THREE.PlaneGeometry( 10,10, 1, 1 );

  


// // //   //render

// // //   var w = window.innerWidth;
// // //   var h = window.innerHeight;
// // //   var scene = new THREE.Scene();
// // //   var camera = new THREE.PerspectiveCamera( 60, w/h, 1,10000 );
// // //   camera.position.z = 100;
// // //   var renderer = new THREE.WebGLRenderer();
// // //   renderer.setSize(w,h);
// // //   renderer.setClearColor( new THREE.Color(0xDDDDDD) );
// // //   document.body.appendChild(renderer.domElement);

// // //   //create textures
// // //   var can = getCanvas(32);
// // //   var tex = new THREE.Texture( can );
// // //   tex.needsUpdate = true;
// // //   var red = new THREE.MeshBasicMaterial({color:0xFF0000, map:tex});
// // //   var blue= new THREE.MeshBasicMaterial({color:0x0033CC, map:tex});

// // //   //mesh with regular geometry
// // //   var m1 = new THREE.Mesh( g, red );
// // //   scene.add( m1 );
// // //   m1.position.x -= 10;

// // //   //mesh with bufferGeometry
// // //   var m2 = new THREE.Mesh( bg, blue );
// // //   scene.add( m2 );
// // //   m2.position.x += 10;
// // //   renderer.render(scene, camera);

// // // }

// // // window.onload = init;
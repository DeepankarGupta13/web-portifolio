import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up scene
const scene = new THREE.Scene();
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000, // Replace with your sky texture
  side: THREE.BackSide, // Render on the inside of the sphere
});

//raycaster
const raycaster = new THREE.Raycaster();

const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skySphere);
// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide,
}))
plane1.position.set(0, 0, 0)

scene.add(plane1);

const xzPlane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
}))
xzPlane.position.set(0, 0, 0)
xzPlane.rotateX(Math.PI/2)
xzPlane.rotateY(-Math.PI/4)

scene.add(xzPlane);

const panelPosition = new THREE.Vector3(0, 0, 5)
const panel = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
}))
panel.position.set(panelPosition.x, panelPosition.y, panelPosition.z);
// panel.rotateY(-Math.PI/6)
panel.rotateZ(-Math.PI/4)
scene.add(panel)

const vertices = [
  new THREE.Vector3(panelPosition.x, panelPosition.y, 5),
  new THREE.Vector3(panelPosition.x + 20, panelPosition.y, 5)
]
// const axis = new THREE.Line(
//   new THREE.BufferGeometry().setFromPoints(vertices), 
//   new THREE.LineBasicMaterial(
//     { 
//       color: 0xff0000,
//       linewidth: 5,
//     }
//   )
// )
// scene.add(axis)

const normalVertices = [
  new THREE.Vector3(panelPosition.x, panelPosition.y, panelPosition.z),
  new THREE.Vector3(panelPosition.x, panelPosition.y, panelPosition.z + 20)
]
const normal = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(normalVertices), 
  new THREE.LineBasicMaterial(
    { 
      color: 0x00ff00,
      linewidth: 5,
    }
  )
)
scene.add(normal)

const tiltedPanelAxis = [
  vertices[0],
  vertices[1].clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 4)
]
const axis = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(tiltedPanelAxis), 
  new THREE.LineBasicMaterial(
    { 
      color: 0xff0000,
      linewidth: 5,
    }
  )
)
const axisNormalVertices = [
  tiltedPanelAxis[0],
  tiltedPanelAxis[1].applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI /2)
]
const axisNormal = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(axisNormalVertices), 
  new THREE.LineBasicMaterial(
    { 
      color: 0xffff00,
      linewidth: 5,
    }
  )
)
scene.add(axisNormal)
scene.add(axis)

// axises
const xVertices = [
  new THREE.Vector3(-50, 0, 0),
  new THREE.Vector3(50, 0, 0)
]
const xaxis = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(xVertices), 
  new THREE.LineBasicMaterial(
    { 
      color: 0xff0000,
      linewidth: 10,
    }
  )
)
scene.add(xaxis)

const yVertices = [
  new THREE.Vector3(0, -50, 0),
  new THREE.Vector3(0, 50, 0)
]
const yaxis = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(yVertices), 
  new THREE.LineBasicMaterial(
    { 
      color: 0x0000ff,
      linewidth: 10,
    }
  )
)
scene.add(yaxis)

const zVertices = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 50)
]
const zaxis = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(zVertices), 
  new THREE.LineBasicMaterial(
    { 
      color: 0x00ff00,
      linewidth: 10,
    }
  )
)
scene.add(zaxis)

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();


// movement and snapping poc for DMP

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from './RotationControls';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Set up scene
const scene = new THREE.Scene();
scene.rotateX = Math.PI / 2;
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
  color: 0xADD8E6, // Replace with your sky texture
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
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
// camera.up.set(0, 0, 1);
camera.position.z = 100;


// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create box geometry
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x5C291E,
});

// Create MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({
  color: 0x5C291E, // Green color
  emissive: 0x000000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  reflectivity: 0.5,
  combine: THREE.AddOperation,
});

// Create mesh
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

const boxMesh2 = new THREE.Mesh(boxGeometry, material);
boxMesh2.position.set(10, 5, 0);
boxMesh.position.set(-10, 5, 0);
boxMesh2.userData.azimuth = Math.PI

const boxInitialQuaternion = boxMesh.quaternion.clone();

const boxmesh3 = new THREE.Mesh(boxGeometry, boxMaterial);
boxmesh3.position.set(20, 5, -10);

const boxmesh4 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 5), boxMaterial);
boxmesh4.position.set(30, 5, -10);

const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), new THREE.MeshBasicMaterial({
  color: 0x5C291E,
  side: THREE.DoubleSide,
}))
plane1.position.set(20, 5, 20)
plane1.userData.azimuth = Math.PI;

const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), new THREE.MeshBasicMaterial({
  color: 0x5C291E,
  side: THREE.DoubleSide,
}))
plane2.position.set(-20, 5, 20)
plane2.rotateY(Math.PI/3)
plane2.userData.azimuth = Math.PI/3;
plane2.userData.azimuth = Math.PI / 3;

const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), new THREE.MeshBasicMaterial({
  color: 0x5C291E,
  side: THREE.DoubleSide,
}))
plane3.position.set(-20, 5, -20)
plane3.rotateY(Math.PI/6)
plane3.userData.azimuth = Math.PI / 6

// Add mesh to the scene
// scene.add(boxMesh);

scene.add(boxMesh2);
// scene.add(boxmesh3);
// scene.add(boxmesh4);
scene.add(plane1);
scene.add(plane2);
scene.add(plane3);

const meshes = [plane1, plane2, plane3]

// ground
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xaaaaaa,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.geometry.rotateX(-Math.PI/2);
plane.position.set(0, 0, 0)

// // Rotate the box
// boxMesh.rotation.x += 10;
// boxMesh.rotation.y += 10;

// // Rotate the box
// boxMesh2.rotation.x += 10;
// boxMesh2.rotation.y += 10;


addDirectionalLights();
// addSpotLight();
// addPointLight();
addAmbientLight();

// controls.maxPolarAngle = Math.PI / 2;

function addDirectionalLights() {
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add directional light
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight1.position.set(-5, 5, 5);
  scene.add(directionalLight1);

  // Add directional light
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight2.position.set(5, -5, 5);
  scene.add(directionalLight2);

  // Add directional light
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight3.position.set(-5, -5, 5);
  scene.add(directionalLight3);

  // Add directional light
  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight4.position.set(5, 5, -5);
  scene.add(directionalLight4);

  // Add directional light
  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight5.position.set(-5, 5, -5);
  scene.add(directionalLight5);

  // Add directional light
  const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight6.position.set(5, -5, -5);
  scene.add(directionalLight6);

  // Add directional light
  const directionalLight7 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight7.position.set(-5, -5, -5);
  scene.add(directionalLight7);

  // Add directional light
  const directionalLight8 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight8.position.set(0, 0, 5);
  scene.add(directionalLight8);

  // Add directional light
  const directionalLight9 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight9.position.set(0, 0, -5);
  scene.add(directionalLight9);
}

function addSpotLight() {
  //Create a SpotLight and turn on shadows for the light
  const light = new THREE.SpotLight(0xffffff);
  light.castShadow = true; // default false
  scene.add(light);
}

function addPointLight() {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.PointLight(0xffffff, 1000, 100);
  light.position.set(0, 3, 0);
  light.castShadow = true; // default false
  scene.add(light);
}

function addAmbientLight() {
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);
}

// function changeMaterialOfCube(newMaterial) {
//   boxMesh2.material = newMaterial
// }
const _oldMaterial = () => {
  boxMesh2.material = new THREE.MeshPhysicalMaterial({
    color: 0x5C291E, // Green color
    emissive: 0x000000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
    combine: THREE.AddOperation,
  });
}
const _alterMaterial = () => {
  boxMesh2.material = new THREE.MeshPhysicalMaterial({
    color: 0x494E3B, // Green color
    emissive: 0x000000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
    opacity: 0.5,
    attenuationColor : 0x00ff00,
    sheenColor: 0xa72a2a,
    sheen: 0.5,
    sheenRoughness: 0.3,
    transparent: true,
    // combine: THREE.AddOperation,
    // envMap: THREE.CubeReflectionMapping,
  });
}
window.changeMaterial = _alterMaterial;

window.changeLambertMaterial = () => {
  boxMesh2.material = new THREE.MeshPhysicalMaterial({
    color: 0x0000ff, // Green color
    emissive: 0x000000,
    opacity: 0.5,
    reflectivity: 0.7,
    transparent: true,
    envMap: THREE.CubeReflectionMapping,
  });
}

window.oldMaterial = _oldMaterial;

let intersectingPoint = null;

const onMove = (event) => {
  const mousePoint = new THREE.Vector3()
  mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePoint.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // update the picking ray with the camera and pointer position
	raycaster.setFromCamera( mousePoint, camera );
  console.log('mousePoint: ', mousePoint);

  const group = (new THREE.Group().add(plane));
  scene.add(group)

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObject(group, true);
  console.log('intersects: ', intersects);
  if (intersects.length > 0) {
    intersectingPoint = intersects[0].point;
    console.log('intersectingPoint: ', intersectingPoint);
    boxMesh2.position.set(intersectingPoint.x, intersectingPoint.y + 5, intersectingPoint.z);
    _alterMaterial();
    snappingUsingVectors(meshes)
  }
}

const mouseDown = (event) => {
  if (intersectingPoint) {
    _oldMaterial();
    document.removeEventListener('mousemove', onMove, false);
    document.removeEventListener('mousedown', mouseDown, false);
  }
}

const moveBoxIfCloset = (mesh) => {
  const box1 = mesh;
  const box2 = boxMesh2;
  if (!box1 || !box2) return false;
  // Get the position difference between the two boxes
  const dx = box2.position.x - box1.position.x;
  const dy = box2.position.y - box1.position.y;
  const dz = box2.position.z - box1.position.z;
  console.log('box1.position.z: ', box1.position.z);
  console.log('box2.position.z: ', box2.position.z);
  const box1Scale = box1.scale
  console.log('box1Scale: ', box1Scale);
  const box2Scale = box2.scale

  // console.log('dx*dx + dy*dy + dz*dz: ', dx*dx + dy*dy + dz*dz);
  console.log('dz: ', dz);
  console.log('dy: ', dy);
  console.log('dx: ', dx);
  if ((dx*dx + dy*dy + dz*dz) > 100){
  //   // console.log('100: ');
    return false;
  }
  // Check which face of box1 is closest to box2
  else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > Math.abs(dz)) {
    // Adjust the position of box2 to align with the x-axis
    box2.position.x = box1.position.x + Math.sign(dx) * (box1.geometry.parameters.width * box1Scale.x / 2 + box2.geometry.parameters.width * box2Scale.x / 2);
  } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > Math.abs(dz)) {
    // Adjust the position of box2 to align with the y-axis
    box2.position.y = box1.position.y + Math.sign(dy) * (box1.geometry.parameters.height * box1Scale.y / 2 + box2.geometry.parameters.height * box2Scale.y / 2);
  } else if(Math.abs(dz) > Math.abs(dx) && Math.abs(dz) > Math.abs(dy)) {
    // Adjust the position of box2 to align with the z-axis
    box2.position.z = (box1.position.z + Math.sign(dz) * ((box1.geometry.parameters.depth || 0) * box1Scale.z / 2 + box2.geometry.parameters.depth * box2Scale.z / 2));
  }
  return true;
}

let roationDiff = new THREE.Quaternion();

const snappingUsingVectors = (ele) => {
  const distances = []
  const box2 = boxMesh2;
  for (let i = 0; i < ele.length; i++) {

    ele[i].material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
    })
  
    // Get the plane normal and constant from the mesh
    const normalgg = new THREE.Vector3(
      ele[i].geometry.attributes.normal.array[0],
      ele[i].geometry.attributes.normal.array[1],
      ele[i].geometry.attributes.normal.array[2]
    ).applyQuaternion(ele[i].quaternion).normalize();
  
    const planeGG = new THREE.Plane().setFromNormalAndCoplanarPoint(normalgg, ele[i].position);
  
    const distancegg = planeGG.distanceToPoint(box2.position);
    distances.push([ele[i], Math.abs(distancegg)])
  }

  distances.sort((a, b) => a[1] - b[1])

  const mesh = distances[0][0]
  const distancegg = distances[0][1]

  if (distancegg - box2.geometry.parameters.width < 0.001) {
    mesh.material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    })

    const normal = new THREE.Vector3(
      mesh.geometry.attributes.normal.array[0],
      mesh.geometry.attributes.normal.array[1],
      mesh.geometry.attributes.normal.array[2]
    ).applyQuaternion(mesh.quaternion).normalize();

    const MathPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, mesh.position);
    const distance = MathPlane.distanceToPoint(box2.position);
    let finalDelta = new THREE.Vector3();
    let deltaVector = new THREE.Vector3();
    const mouseDeltaVector = new THREE.Vector3();

    const vecAlongPlane = Math.sign(distance) > 0 ? MathPlane.normal.clone() : MathPlane.normal.clone().negate();
    vecAlongPlane.multiplyScalar(mesh.geometry.parameters.width);
    const displacement = normal.clone().normalize().multiplyScalar(box2.geometry.parameters.width / 2)
    mouseDeltaVector.subVectors(mesh.position.clone(), intersectingPoint);
    deltaVector = (vecAlongPlane.dot(mouseDeltaVector)) / vecAlongPlane.length();
    finalDelta = vecAlongPlane.clone().normalize().multiplyScalar(deltaVector);
    finalDelta.add(displacement)
    box2.position.x += finalDelta.x;
    box2.position.z += finalDelta.z;

    if ((box2.userData.azimuth !== mesh.userData.azimuth)) {
      box2.rotateY(-box2.userData.azimuth);
      box2.rotateY(mesh.userData.azimuth);
      box2.userData.azimuth = mesh.userData.azimuth;
    }

    return true;
  }

  if (box2.userData.azimuth !== Math.PI) {
    box2.rotateY(-box2.userData.azimuth);
    box2.userData.azimuth = Math.PI;
  }
  return false;
}

const light = new THREE.PointLight(0Xffff00, 10000, 20);
light.castShadow = true;
light.shadow.bias = - 0.005; 

  function generateTexture() {

    const canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;

    const context = canvas.getContext( '2d' );
    context.fillStyle = 'white';
    context.fillRect( 0, 1, 2, 1 );

    return canvas;

  }


  const texture = new THREE.CanvasTexture(generateTexture());
  texture.magFilter = THREE.NearestFilter;
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(1, 4.5);

  const geometry = new THREE.SphereGeometry(2, 32, 8);
  const material111 = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    alphaMap: texture,
    alphaTest: 0.5
  });

  const sphere = new THREE.Mesh(geometry, material111);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.position.set(0, 20, 0)
  // light.add(sphere);
  // scene.add(light);
  sphere.add(light);
  scene.add(sphere);
  sphere.visible = false;

const addSphere = () => {
  sphere.visible = true;
}

window.addMouseListnr = () => {
  console.log("plane: ", plane)
  console.log("plane1: ", plane1)
  console.log("plane2: ", plane2)
  console.log("plane3: ", plane3)

  document.addEventListener('mousemove', onMove, false);
  document.addEventListener('mousedown', mouseDown, false);
}

window.remMouseListnr = () => {
  document.removeEventListener('mousemove', onMove, false);
  document.removeEventListener('mousedown', mouseDown, false);
}

window.addSphereInScene = addSphere;

let angle = 0;
// Set up animation
const animate = () => {
  requestAnimationFrame(animate);

  sphere.position.set(20*Math.cos(angle+=0.001), 20*Math.sin(angle+=0.001), 0)

  // Render the scene
  renderer.render(scene, camera);
};
// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

const control = new TransformControls(camera, renderer.domElement);
control.addEventListener('change', animate);

control.addEventListener('dragging-changed', function (event) {

  controls.enabled = !event.value;

});


control.attach( boxMesh2 );
scene.add( control );
control.setMode( 'rotate' );

function saveArrayBuffer(buffer, filename) {
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click(); // This triggers the download
}

window.exportGLTF = () => {
  const exporter = new GLTFExporter();
  exporter.parse(
      scene, // Your Three.js scene
      function (result) {
          saveArrayBuffer(result, 'ThreejsScene.glb');
      },
      { binary: true }
  );
}

window.loadMesh = () => {

  // Instantiate a loader
  const loader = new GLTFLoader();
  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
  loader.setDRACOLoader(dracoLoader);

  // Load a glTF resource
  loader.load(
    // resource URL
    'http://localhost:8081/Gazebo5x8.gltf',
    // called when the resource is loaded
    function (gltf) {
      console.log('gltf: ', gltf.scene.children[0]);
      console.log('gltf: ', gltf);
      const object = gltf.scene.children[0];

      object.rotateX(- Math.PI / 2)
      object.position.set(10, 0, 0)

      scene.add(object);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

    },
    // called while loading is progressing
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}
// Start animation
animate();


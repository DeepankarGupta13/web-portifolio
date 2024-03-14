import * as THREE from 'three'

// THREE.Object3D.DefaultUp.set(0, 0, 1);

// three.js info box follows shape
var renderer, scene, camera, controls;
var angle = 0;
var arrow;
var rayCaster = new THREE.Raycaster();
var mouse2D = new THREE.Vector2();
var mouse3D = new THREE.Vector3();
var radius = 5;
var sphereHelper;
var octree = new THREE.Octree({
  undeferred: true
});

init();
animate();

function init() {
  // info
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.fontWeight = 'bold';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.innerHTML = "three.js - Snap with octree and findClosestPoint method";
  document.body.appendChild(info);

  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.domElement.addEventListener("mousemove", onMouseMove);

  // scene
  scene = new THREE.Scene();

  // ambient light
  var ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // directional light
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1, -0.5, 1);
  scene.add(directionalLight);

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(100, -100, 50);
  camera.up.set(0, 0, 1);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);

  // material
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    shading: THREE.FlatShading
  });

  // geometry
  var geometry = new THREE.BoxGeometry(50, 50, 50);

  // mesh
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // sphere helper
  octree.add(mesh, {
    useVertices: true
  });
}

function createSphereHelper() {
  sphereHelper = new THREE.Line(new THREE.SphereGeometry(snapDistance), new THREE.LineBasicMaterial({
    color: 0xffff00
  }));
  scene.add(sphereHelper);
}

function onMouseMove(event) {
  mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;
  rayCaster.setFromCamera(mouse2D, camera);

  var intersects = rayCaster.intersectObject(scene, true);
  var snap = null;
  if (intersects.length > 0) {
    var index = 0;
    var intersect = intersects[index];
    if (intersect) {
      var face = intersect.face;
      var point = intersect.point;
      var object = intersect.object;
      var snap = octree.findClosestVertex(point, radius);
    }
  }
  if (snap) {
    renderer.domElement.style.cursor = 'pointer';
  } else {
    renderer.domElement.style.cursor = 'no-drop';
  }
}

// render
function render() {
  renderer.render(scene, camera);
  controls.update();
}

// animate
function animate() {
  requestAnimationFrame(animate);
  render();
}

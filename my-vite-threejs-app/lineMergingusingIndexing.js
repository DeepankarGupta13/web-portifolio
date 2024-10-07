import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

var camera, scene, renderer;

init();
animate();

/*function createLinesGeometry() {
  // Line made up of 4 points in 3d space
  const lineOne = [0, 0, 0, 2, 1, 2, 2, 3, 2, 5, 4, 3]
  // Line made up of 2 points in 3d space
  const lineTwo = [1, 1, 1, 1, 2, 2]

	// Trying to understand indicies?
  const indicies = [0, 1, 2, 3, 0, 1]

  const bufferGeom = new THREE.BufferGeometry()

  const typesPos = new THREE.Float32BufferAttribute([...lineOne, ...lineTwo], 3)
  bufferGeom.setIndex(indicies)
  bufferGeom.setAttribute("position", typesPos)
  return bufferGeom
}*/
function createLinesGeometry(){
	const linesData = [
  	new THREE.Vector3(0.35, 0.5, 0),
  	new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0.5, 0),
    new THREE.Vector3(0, 0.5, 0)
  ];
  const idx = [
  
  	1, 2,
    2, 3,
    3, 4,
    4, 1, // 4,5, 5,6
    
    ];
    
  const bg = new THREE.BufferGeometry().setFromPoints(linesData);
  bg.setIndex(idx);
  return bg;
}

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 4;

    scene = new THREE.Scene();

    var geometry = createLinesGeometry();

    var lsMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 	  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

    var line = new THREE.Line( geometry, material );
    var lineSegments = new THREE.LineSegments( geometry, lsMaterial );
    //scene.add( line );
  	scene.add( lineSegments );
  
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}


import '../my-vite-threejs-app/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const group = new THREE.Group();

const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );

const geometry1 = new THREE.PlaneGeometry( 1, 1 );
const material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( geometry1, material1 );
plane1.rotateX(-Math.PI / 2)

group.add(plane1)
group.add(plane)
scene.add(group);

function exportGLTF( input ) {

  const gltfExporter = new GLTFExporter();

  const params = {
    trs: false,
    onlyVisible: true,
    binary: false,
    maxTextureSize: 4096,
  }
  const options = {
    trs: params.trs,
    onlyVisible: params.onlyVisible,
    binary: params.binary,
    maxTextureSize: params.maxTextureSize
  };

  gltfExporter.parse(
    input,
    function ( result ) {

      if ( result instanceof ArrayBuffer ) {

        saveArrayBuffer( result, 'scene.glb' );

      } else {

        const output = JSON.stringify( result, null, 2 );
        console.log( output );
        saveString( output, 'scene.gltf' );

      }

    },
    function ( error ) {

      console.log( 'An error happened during parsing', error );

    },
    options
  );

}

const link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link ); // Firefox workaround, see #6594

function save( blob, filename ) {

  link.href = URL.createObjectURL( blob );
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...

}

function saveString( text, filename ) {

  save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}

function saveArrayBuffer( buffer, filename ) {

  save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

}


window.exportGLTF_GGWP = () => {
  exportGLTF(scene)
}

const control = new OrbitControls( camera, renderer.domElement );

function animate() {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
}

animate();


const controls = new OrbitControls(camera, renderer.domElement);

// Create material for the planes
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide});
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide});

// Create two plane geometries
const geometry1 = new THREE.PlaneGeometry(5, 5);
const geometry2 = new THREE.PlaneGeometry(5, 5);

// Create the mesh for each plane
const plane1 = new THREE.Mesh(geometry1, material1);
const plane2 = new THREE.Mesh(geometry2, material2);

// Position and rotate the planes so that they intersect
plane1.position.set(0, 0, 0);
plane2.position.set(0, 0, 0);
plane2.rotation.x = -Math.PI / 3; // Rotate the second plane 90 degrees along the X-axis

// Add the planes to the scene
scene.add(plane1);
scene.add(plane2);

const midpoint1 = new THREE.Vector3(0, 0, 0);
const midpoint2 = new THREE.Vector3(10, 3, 5);

const linePoints = [midpoint1, midpoint2];

const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
const lineMat = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 1, });
const lineMesh = new THREE.Mesh(lineGeom, lineMat);
scene.add(lineMesh);
console.log('scene: ', scene);
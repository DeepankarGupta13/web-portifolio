import '../my-vite-threejs-app/style.css';
import * as SunCalc from 'suncalc';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export function toDegrees(angle) {
  return parseFloat(angle * (180 / Math.PI));
}

export function toRadian(angle) {
  return (angle * (Math.PI / 180));
}

export function getSolarNoon(latitude, longitude, date = new Date(2019, 11, 21, 12, 0, 0)) {
  return SunCalc.getTimes(date, latitude, longitude).solarNoon;
}

export function getSunPositions(
  latitude,
  longitude,
  startDate = new Date(2019, 11, 21, 9),
  originalEndDate = new Date(2019, 11, 21, 15),
  inSolarTime = true,
  minuteStep = 30,
) {
  /*
      Returns sun's azimuth and zenith in degrees between Start Date and End Date
   */

  let currentDate;
  let endDate;
  if (inSolarTime) {
      const analysisDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          12,
          0,
          0,
      );
      const solarNoon = getSolarNoon(latitude, longitude, analysisDate);
      currentDate = new Date(startDate.getTime() + (solarNoon - analysisDate));
      endDate = new Date(originalEndDate.getTime() + (solarNoon - analysisDate));
  }
  else {
      currentDate = startDate;
      endDate = originalEndDate;
  }

  const sunPositions = [];
  while (endDate >= currentDate) {
      // Suncalc gives azimuth with South as 0 and we need North as 0
      const sunPosition = SunCalc.getPosition(currentDate, latitude, longitude);
      const azimuth = toRadian((180 + toDegrees(sunPosition.azimuth)) % 360);
      const zenith = toRadian(90 - toDegrees(sunPosition.altitude));
      // const azimuth = sunPosition.azimuth;
      // const zenith = sunPosition.altitude;

      sunPositions.push([azimuth, zenith]);
      currentDate.setMinutes(currentDate.getMinutes() + minuteStep);
  }

  return sunPositions;
}

function getTilt(plane, rotationAxis, sunAzimuth, sunZenith){
  // Adjust the computation based on the azimuth convention
  const sunDirection = new THREE.Vector3(
    -Math.sin(sunAzimuth) * Math.sin(sunZenith), // Negate sin(sunAzimuth) to match the convention
    Math.cos(sunAzimuth) * Math.sin(sunZenith),  // Swap sin and cos to match the convention
    Math.cos(sunZenith)
  );

  // Step 2: Project the sun direction vector onto the plane of rotation
  // const projection = sunDirection.clone().sub(rotationAxis.clone().multiplyScalar(sunDirection.dot(rotationAxis)));
  const projection = sunDirection.clone().normalize().projectOnPlane(rotationAxis);


  // Step 3: Calculate the angle between the projected sun direction and the plane's normal vector
  // const dotProduct = // Step 3: Calculate the angle between the projected sun direction and the plane's normal
  const realAngle = projection.angleTo(new THREE.Vector3(0, 0, 1).normalize());
  const angle = toDegrees(realAngle) > 90 ? toDegrees(realAngle) - 90 : toDegrees(realAngle);
  return angle;
}

const latitude =  18.969691192471103;
const longitude = 72.81755390150109;

// panel plane
const panelPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0))

// rotation axis
const rotationAxis = new THREE.Vector3(1, 0, 0);

// sun zenith and azimuth
const sunPositions = getSunPositions(latitude, longitude);
console.log('sunPositions: ', sunPositions);

const angles = [];

for (let i = 0; i < sunPositions.length; i += 1) {
  const [sunAzimuth, sunZenith] = sunPositions[i];
  angles.push(getTilt(panelPlane, rotationAxis.normalize(), sunAzimuth, sunZenith))
}

console.log('angles: ', angles);


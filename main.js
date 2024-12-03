import "./style.css";
import { addLight } from "./helper.js";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const canvas = document.querySelector("canvas");
const accordion = document.getElementById("accordion");

const lightBtn = document.getElementById("addPointLight");
lightBtn.addEventListener("click", async () => {
  const light = new THREE.PointLight(0xffffff);
  const lightHelper = new THREE.PointLightHelper(light);
  light.position.set(5, 5, 5);
  await addLight(accordion, light, lightHelper, scene);
  scene.add(lightHelper);
  scene.add(light);
});

const ambientBtn = document.getElementById("addAmbientLight");
ambientBtn.addEventListener("click", async () => {
  const light = new THREE.AmbientLight(0xffffff);
  await addLight(accordion, light, null, scene);
  scene.add(light);
});

const scene = new THREE.Scene();

const vector = new THREE.Vector2();
// window.addEventListener("mousemove", (event) => {
//   const rect = canvas.getBoundingClientRect();
//   const rectWidth = rect.width;
//   const rectHeight = rect.height;

//   vector.x = ((event.clientX - rect.left) / rectWidth) * 2 - 1;
//   vector.y = -((event.clientY - rect.top) / rectHeight) * 2 + 1;
// });
window.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const rectWidth = rect.width;
  const rectHeight = rect.height;

  vector.x = ((event.clientX - rect.left) / rectWidth) * 2 - 1;
  vector.y = -((event.clientY - rect.top) / rectHeight) * 2 + 1;
  console.log(vector);
});

const raycaster = new THREE.Raycaster();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("background"),
});

const loader = new GLTFLoader().setPath("models");
loader.load("/autumn_house/scene.gltf", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

camera.position.setZ(30);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(vector, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const closestObject = intersects[0].object;

    scene.traverse((object) => {
      if (object.isMesh && object.material) {
        object.material.emissive?.setHex(0x000000);
      }
    });

    closestObject.material.emissive?.setHex(0xff0000);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

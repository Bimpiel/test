console.log("loaded");

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

// Create a WebGL renderer with a transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the clear color of the renderer to transparent
renderer.setClearColor(0x000000, 0); // The second parameter (alpha) is set to 0

const loader = new GLTFLoader();
let model;

loader.load('assets/scene.gltf', (gltf) => {
    model = gltf.scene;

  scene.add(model);
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Create OrbitControls and configure it
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping to camera movement
controls.dampingFactor = 0.1; // Adjust the damping factor as needed

const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the 3D model (or perform any other animations)
  if (model) {
    model.rotation.z = Math.PI / 4; // Rotate by -45 degrees (in radians) on the Z-axis

  }

  controls.update(); // Update camera position based on user input

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

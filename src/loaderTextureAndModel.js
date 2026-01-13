import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const manager = new THREE.LoadingManager();
let started = false;
const loadingDone = new Promise((resolve) => {
  manager.onStart = () => {
    started = true;
  };
  manager.onLoad = () => resolve();
  setTimeout(() => {
    if (!started) resolve();
  }, 0);
});

const loaderGLB = new GLTFLoader(manager);
const loaderTexture = new THREE.TextureLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
loaderGLB.setDRACOLoader(dracoLoader);

export { loaderGLB, loaderTexture, loadingDone };

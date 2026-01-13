import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const manager = new THREE.LoadingManager();
export const loadingDone = new Promise((resolve) => {
  manager.onLoad = () => resolve();
});


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
loaderGLB.setDRACOLoader(dracoLoader);


const loaderGLB = new GLTFLoader(manager);
const loaderTexture = new THREE.TextureLoader(manager);

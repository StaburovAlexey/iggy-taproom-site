import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const manager = new THREE.LoadingManager();
const progressListeners = new Set();
const progressState = { loaded: 0, total: 0, progress: 0 };
let started = false;

function emitProgress() {
  const snapshot = { ...progressState };
  progressListeners.forEach((listener) => listener(snapshot));
}

function updateProgress(itemsLoaded, itemsTotal) {
  const loaded = Number.isFinite(itemsLoaded)
    ? itemsLoaded
    : progressState.loaded;
  const total = Number.isFinite(itemsTotal) ? itemsTotal : progressState.total;
  progressState.loaded = loaded;
  progressState.total = total;
  progressState.progress = total > 0 ? loaded / total : progressState.progress;
  emitProgress();
}

const loadingDone = new Promise((resolve) => {
  manager.onStart = (url, itemsLoaded, itemsTotal) => {
    started = true;
    updateProgress(itemsLoaded, itemsTotal);
  };
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    updateProgress(itemsLoaded, itemsTotal);
  };
  manager.onLoad = () => {
    if (progressState.total === 0 && progressState.loaded === 0) {
      progressState.loaded = 1;
      progressState.total = 1;
    } else if (progressState.total === 0) {
      progressState.total = progressState.loaded;
    }
    progressState.progress = 1;
    emitProgress();
    resolve();
  };
  setTimeout(() => {
    if (!started) resolve();
  }, 0);
});

const loaderGLB = new GLTFLoader(manager);
const loaderTexture = new THREE.TextureLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
loaderGLB.setDRACOLoader(dracoLoader);

export function onLoadingProgress(listener) {
  if (typeof listener !== 'function') {
    return () => {};
  }
  progressListeners.add(listener);
  listener({ ...progressState });
  return () => progressListeners.delete(listener);
}

export { loaderGLB, loaderTexture, loadingDone };

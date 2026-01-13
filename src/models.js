import { loaderGLB } from './loaderTextureAndModel.js';
import * as THREE from 'three';

export function loadBar() {
  return new Promise((resolve, reject) => {
    loaderGLB.load(
      '/model/BAR-lights.glb',
      (gltf) => {
        const bar = gltf.scene;
        const lampBar = [];

        bar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name && child.name.includes('лампа_бар')) {
            lampBar.push(child);
          }
          //   if (child.name === 'стулья_бар') {
          //     child.castShadow = true;
          //     child.receiveShadow = true;
          //     child.material.side = THREE.DoubleSide;
          //     child.material.shadowSide = THREE.DoubleSide;
          //   }
        });

        lampBar.push({ position: { x: 4.35, z: 4.5, y: 3.35 } });
        lampBar.push({ position: { x: 0, z: 4.5, y: 3.35 } });

        resolve({ bar, lampBar });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

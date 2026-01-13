import { loaderGLB } from './loaderTextureAndModel.js';
import * as THREE from 'three';
import { loadTexturesMap } from './textures.js';
const material = new THREE.MeshBasicMaterial({});
export function loadBar() {
  return new Promise((resolve, reject) => {
    loaderGLB.load(
      '/model/BAR-lights.glb',
      async (gltf) => {
        const bar = gltf.scene;
        const lampBar = [];
        const lampDj = [];
        const lampTable = [];
        const lampCenter = [];
        const textures = await loadTexturesMap();
        const {
          brickWall_diff,
          interior_tiles_diff,
          wood_table_diff,
          wood_planks_dirt_1k,
          wood_planks_1k,
          brickWall_gl
        } = textures;
        bar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name && child.name.includes('лампа_бар')) {
            lampBar.push(child);
          }
          if (child.name && child.name.includes('лампа_дж')) {
            lampDj.push(child);
          }
          if (child.name && child.name.includes('лампа_стол')) {
            lampTable.push(child);
          }
          if (child.name && child.name.includes('лампа_стойка')) {
            lampCenter.push(child);
          }
          if (child.name === 'стены_бар') {
            child.material = child.material.clone();
            const wallMap = brickWall_gl.clone();
            child.material.normalMap = wallMap;
            child.material.normalMap.repeat.set(15, 3);
            child.material.normalMap.wrapS = THREE.RepeatWrapping;
            child.material.normalMap.wrapT = THREE.RepeatWrapping;
            child.material.normalMap.colorSpace = THREE.SRGBColorSpace;
            child.material.color.set(0x3e6bd6);
            child.material.roughness = 0.6;
            child.material.metalness = 0.1;
            child.material.normalMap.rotation = Math.PI * 0.5;
            child.material.needsUpdate = true;
          }
          if (child.name === 'стены_окна') {
            child.material = child.material.clone();
            child.material.map = brickWall_diff;
            child.material.map.repeat.set(6, 2);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.9;
            child.material.metalness = 0.1;
            child.material.map.rotation = Math.PI * 0.5;
            child.material.needsUpdate = true;
          }
          if (child.name === 'пол_бар') {
            child.material = child.material.clone();
            child.material.map = interior_tiles_diff;
            child.material.map.repeat.set(20, 20);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.5;
            child.material.metalness = 0.3;
            child.material.color.set(0x3e6bd6);
            child.material.map.rotation = Math.PI * 0.25;
            child.material.needsUpdate = true;
          }
          if (child?.material?.name === 'дерево') {
            child.material = child.material.clone();

            child.material.map = wood_table_diff;
            child.material.map.repeat.set(1, 2);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.castShadow = false;
            child.receiveShadow = true;
            // child.material.color.set(0x3e6bd6);
            // child.material.map.rotation = Math.PI * 0.25;
            child.material.needsUpdate = true;
          }
          if (child.name === 'пол_зал') {
            child.material = child.material.clone();
            child.material.map = wood_planks_dirt_1k;
            child.material.map.repeat.set(25, 25);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.map.rotation = Math.PI * 0.5;
            child.material.needsUpdate = true;
          }
          if (child.name.includes('колонны')) {
            child.material = child.material.clone();
            const wallMap = brickWall_diff.clone();
            child.material.map = wallMap;
            child.material.map.repeat.set(1, 4);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.material.map.rotation = Math.PI * 0.5;
            child.material.needsUpdate = true;
          }
          if (child.name.includes('стул')) {
            child.material = child.material.clone();
            child.material.color.set(0x0f0f10);
            child.material.roughness = 0.6;
            child.material.metalness = 0.3;
            child.material.needsUpdate = true;
          }
          if (child.name === 'потолок_зал') {
            console.log(child);
            child.material = child.material.clone();
            child.material.side = THREE.BackSide;
            child.material.shadowSide = THREE.BackSide;
            child.material.map = wood_planks_1k;
             child.castShadow = false;
            child.material.map.repeat.set(3, 3);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.needsUpdate = true;
          }
          if (child.name === 'потолок_бар') {
            console.log(child);
            child.material = child.material.clone();
            child.material.side = THREE.BackSide;
            child.material.shadowSide = THREE.BackSide;
            // child.material.map = wood_planks_1k;
             child.castShadow = false;
            // child.material.map.repeat.set(3, 3);
            // child.material.map.wrapS = THREE.RepeatWrapping;
            // child.material.map.wrapT = THREE.RepeatWrapping;
            // child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.color.set(0x3e6bd6);
            child.material.needsUpdate = true;
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

        resolve({ bar, lampBar, lampDj, lampTable, lampCenter });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

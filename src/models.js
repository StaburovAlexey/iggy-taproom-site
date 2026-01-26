import { loaderGLB } from './loaderTextureAndModel.js';
import * as THREE from 'three';
import { loadTexturesMap } from './textures.js';
function createWindowGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;

  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);

  grad.addColorStop(0.0, '#2f5bff');
  grad.addColorStop(0.3, '#5f7cff');
  grad.addColorStop(0.5, '#9b6cff');
  grad.addColorStop(0.7, '#ff9acb');
  grad.addColorStop(1.0, '#ffb6dc');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
const gradientTex = createWindowGradient();
export function loadBar() {
  const texturesPromise = loadTexturesMap();
  return new Promise((resolve, reject) => {
    loaderGLB.load(
      '/model/BAR.glb',
      async (gltf) => {
        const bar = gltf.scene;
        const lampBar = [];
        const lampDj = [];
        const lampTable = [];
        const lampCenter = [];
        const signLights = [];
        const textures = await texturesPromise;
        const {
          brickWall_diff,
          interior_tiles_diff,
          wood_table_diff,
          wood_planks_dirt_1k,
          wood_planks_1k,
          brickWall_gl,
          wood_planks_nor_gl_1k,
          rough_wood_diff_1k,
          wood_shutter_1k,
          rust_coarse_01_1k,
          cup_texture,
          beer_texture,
          board_beer_texture,
          menu_eat_texture,
          picture_texture_2,
          picture_texture_3,
          picture_texture_jpg,
          picture_texture_png,
          promo_texture,
          picture_texture_4,
        } = textures;
        bar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name && child.name.includes('лампа_бар')) {
            const black = child.children[0];
            const light = child.children[1];
            black.material = new THREE.MeshStandardMaterial();
            black.material.color.set(0x0f0f10);
            black.material.needsUpdate = true;
            light.material.material = new THREE.MeshStandardMaterial();
            light.material.emissive = new THREE.Color('#1b532c');

            light.material.emissiveIntensity = 1;
            light.material.map = null;
            light.material.color.set('#000000');
            light.material.transparent = true;
            light.material.opacity = 0.75;
            light.material.side = THREE.DoubleSide;
            light.castShadow = false;
            light.receiveShadow = false;
            light.material.needsUpdate = true;
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
            child.material.map.repeat.set(7, 3);
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
          if (child.name === 'стена_камин') {
            child.material = child.material.clone();
            child.material.map = rust_coarse_01_1k;
            child.material.map.repeat.set(5, 5);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
          }
          if (child?.material?.name === 'дерево') {
            child.material = new THREE.MeshStandardMaterial();
            child.material.map = wood_table_diff;
            child.material.map.repeat.set(1, 2);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.castShadow = true;
            child.receiveShadow = false;
            child.material.shadowSide = THREE.DoubleSide;
            // child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
          }
          if (child?.name === 'окно_рама') {
            child.material = child.material.clone();
            const wallMap = wood_table_diff.clone();
            child.material.map = wallMap;
            child.material.map.repeat.set(3, 3);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.castShadow = false;
            child.receiveShadow = true;
            child.material.needsUpdate = true;
          }
          if (
            child?.name === 'окно_откос' ||
            child.name === 'Полки' ||
            child.name === 'дверь-откос'
          ) {
            child.material = child.material.clone();

            child.receiveShadow = true;
            child.material.color.set(0x3e6bd6);

            child.material.needsUpdate = true;
          }
          if (child.name === 'окно_стекло') {
            const m = child.material.clone();
            m.emissive = new THREE.Color('#ffffff');
            m.emissiveMap = gradientTex;
            m.emissiveIntensity = 1.0;
            m.map = null;
            m.color.set('#000000');
            m.transparent = true;
            m.opacity = 0.55;
            m.side = THREE.DoubleSide;

            m.needsUpdate = true;
            child.material = m;
          }
          if (child.name === 'стена_дж') {
            const m = child.material.clone();
            m.map = gradientTex;
            child.material = m;
            m.needsUpdate = true;
          }
          if (
            child.name === 'пол_зал' ||
            child.name === 'подиум' ||
            child.name === 'бaрная_стойка_цилиндры'
          ) {
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
            child.material.map.repeat.set(1, 6);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.material.map.rotation = Math.PI * 0.5;
            child.material.needsUpdate = true;
          }
          if (child.name.includes('зеркало')) {
            child.material = child.material.clone();
            child.material.color.setStyle('#8783b4');

            child.material.needsUpdate = true;
          }
          if (child.name.includes('балка')) {
            child.material = child.material.clone();

            child.material.map = rough_wood_diff_1k;
            child.material.map.repeat.set(1, 4);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;

            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
            child.material.map.rotation = Math.PI * 0.5;
            if (child.name.includes('балка-бар')) {
              child.material.color.setStyle('#3e6bd6');
            }
            child.material.needsUpdate = true;
          }
          if (
            child.name.includes('стул') ||
            child.name.includes('диван') ||
            child.name.includes('сабвуфер') ||
            child.name === 'пивная_колонна' ||
            child.name === 'доска_еда' ||
            child.name === 'доска_напитки' ||
            child.name === 'дверь' ||
            child.name === 'камин' ||
            child.name === 'касса'
          ) {
            child.material = child.material.clone();
            child.material.color.set(0x0f0f10);
            child.material.roughness = 0.6;
            child.material.metalness = 0.3;
            child.material.needsUpdate = true;
          }
          if (child.name.includes('Балоны')) {
            child.material = child.material.clone();
            child.material.color.setStyle('#361d1d');
            child.material.roughness = 0.6;
            child.material.metalness = 0.3;
            child.material.needsUpdate = true;
          }
          if (child.name === 'потолок_зал') {
            child.material = child.material.clone();
            child.material.side = THREE.DoubleSide;
            child.material.shadowSide = THREE.DoubleSide;
            child.material.map = wood_planks_1k;
            child.castShadow = false;
            child.material.map.repeat.set(8, 16);
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;

            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.needsUpdate = true;
          }
          if (child.name === 'потолок_бар') {
            child.material = child.material.clone();
            child.material.side = THREE.DoubleSide;
            child.material.shadowSide = THREE.DoubleSide;
            const wallMap = wood_planks_nor_gl_1k.clone();
            child.material.normalMap = wallMap;
            child.castShadow = false;
            child.receiveShadow = false;
            child.material.normalMap.repeat.set(16, 16);
            child.material.normalMap.wrapS = THREE.RepeatWrapping;
            child.material.normalMap.wrapT = THREE.RepeatWrapping;
            child.material.normalMap.colorSpace = THREE.SRGBColorSpace;
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.normalMap.rotation = Math.PI * -0.25;
            child.material.color.set(0x3e6bd6);
            child.material.needsUpdate = true;
          }
          if (
            child?.name === 'барная_стойка' ||
            child.name === 'шкаф-мойка' ||
            child.name === 'шкаф-посуда'
          ) {
            const notWood = child.children.filter(
              (item) => item.material.name !== 'дерево',
            );
            notWood.forEach((item) => {
              item.material = new THREE.MeshStandardMaterial();
              item.material.color.setStyle('#3e6bd6');
              item.material.roughness = 1;
              item.material.metalness = 0.1;
              item.castShadow = true;
              item.receiveShadow = true;
              item.material.needsUpdate = true;
            });
          }
          if (child?.name === 'электрощиток') {
            child.material = child.material.clone();
            child.material.color.setStyle('#3e6bd6');
            child.material.needsUpdate = true;
          }
          if (
            child.name === 'столешница_сцена' ||
            child.name.includes('стол')
          ) {
            const notWood = child.children.filter(
              (item) => item.material.name !== 'дерево',
            );
            notWood.forEach((item) => {
              item.material = new THREE.MeshStandardMaterial();
              item.material.color.setStyle('#000000');
              item.material.roughness = 1;
              item.material.metalness = 0.1;
              item.material.needsUpdate = true;
            });
          }

          if (
            child.name.includes('бочка-стол') ||
            child.name.includes('бочка')
          ) {
            const barrel = child.children[0];
            const arcs = child.children[1];

            arcs.material = new THREE.MeshStandardMaterial();
            arcs.material.color.setStyle('#020202');
            arcs.castShadow = true;
            arcs.material.needsUpdate = true;

            barrel.material = new THREE.MeshStandardMaterial();
            barrel.material.map = wood_shutter_1k;
            barrel.material.map.repeat.set(3, 2);
            barrel.material.map.wrapS = THREE.RepeatWrapping;
            barrel.material.map.wrapT = THREE.RepeatWrapping;
            barrel.material.color.setStyle('#79520e');
            barrel.castShadow = true;
            barrel.receiveShadow = true;
            barrel.material.needsUpdate = true;
          }
          if (
            child.name === 'холодильник_напитки' ||
            child.name === 'холодильник-молоко'
          ) {
            const frame = child.children[0];
            frame.material = new THREE.MeshStandardMaterial();
            frame.material.roughness = 5;
            frame.material.metalness = 0.3;
            frame.material.color.setStyle('#a5a1a1');
            frame.castShadow = false;
            frame.receiveShadow = false;
            frame.material.needsUpdate = true;
            const rubber = child.children[1];
            rubber.material = new THREE.MeshStandardMaterial();
            rubber.material.roughness = 1;
            rubber.material.metalness = 0.1;
            rubber.material.color.setStyle('#000000');
            rubber.castShadow = false;
            rubber.receiveShadow = false;
            rubber.material.needsUpdate = true;
            const glass = child.children[2];
            glass.material = new THREE.MeshStandardMaterial();
            glass.material.roughness = 1;
            glass.material.metalness = 0.1;
            glass.material.color.setStyle('#8783b4');
            glass.castShadow = false;
            glass.receiveShadow = false;
            glass.material.needsUpdate = true;
          }
          if (child.name === 'вывеска_бар') {
            const iggy = child.children[1];
            const taproom = child.children[2];
            iggy.material = new THREE.MeshStandardMaterial();
            iggy.material.color.setStyle('#7fd6ff');
            iggy.material.emissive = new THREE.Color('#2fb6ff');
            iggy.material.emissiveIntensity = 2.2;
            iggy.material.needsUpdate = true;
            taproom.material = new THREE.MeshStandardMaterial();
            taproom.material.color.setStyle('#ff6aa3');
            taproom.material.emissive = new THREE.Color('#ff2f6f');
            taproom.material.emissiveIntensity = 2.2;
            taproom.material.needsUpdate = true;

            signLights.push({
              position: { x: -3.7, y: 2.4, z: 4 },
              color: 0x7fd6ff,
              intensity: 1,
              distance: 3,
            });
            signLights.push({
              position: { x: -3.7, y: 1.7, z: 4 },
              color: 0xff6aa3,
              intensity: 1,
              distance: 3,
            });
          }
          if (child.name === 'neon_dj') {
            console.log(child);
            const top = child.children[0];
            const bottom = child.children[1];
            top.material = new THREE.MeshStandardMaterial();
            top.material.color.setStyle('#7fd6ff');
            top.material.emissive = new THREE.Color('#2fb6ff');
            top.material.emissiveIntensity = 2.2;
            top.material.needsUpdate = true;
            bottom.material = new THREE.MeshStandardMaterial();
            bottom.material.color.setStyle('#ff6aa3');
            bottom.material.emissive = new THREE.Color('#ff2f6f');
            bottom.material.emissiveIntensity = 2.2;
            bottom.material.needsUpdate = true;

            signLights.push({
              position: { x: 4.6, y: 2.6, z: 0 },
              color: 0x7fd6ff,
              intensity: 1,
              distance: 3,
            });
            signLights.push({
              position: { x: 4.6, y: 2.2, z: 0 },
              color: 0xff6aa3,
              intensity: 1,
              distance: 3,
            });
          }
          if (child.name === 'кофемашина') {
            const main = child.children[0];
            const glass = child.children[2];
            const plastic = child.children[1];
            main.material = new THREE.MeshStandardMaterial({
              color: '#8498a1',
            });
            glass.material = new THREE.MeshStandardMaterial({
              color: '#8783b4',
            });
            plastic.material = new THREE.MeshStandardMaterial({
              color: '#202020',
            });
          }
          if (child.name.includes('бокалы')) {
            const material = new THREE.MeshStandardMaterial({
              transparent: true,
              map: cup_texture,
              alphaTest: 0.5,
              side: THREE.DoubleSide,
            });
            material.map.repeat.set(2, 1);
            material.map.wrapS = THREE.RepeatWrapping;
            material.map.wrapT = THREE.RepeatWrapping;
            material.map.colorSpace = THREE.SRGBColorSpace;
            material.map.rotation = Math.PI * -0.5;
            child.material = material;
            child.position.y = child.position.y - 0.05;
          }
          if (child.name.includes('пиво')) {
            beer_texture.center.set(0.5, 0.5);
            const material = new THREE.MeshStandardMaterial({
              transparent: true,
              alphaTest: 0.5,
              map: beer_texture,
              side: THREE.DoubleSide,
            });

            material.map.repeat.set(1, 1);
            material.map.wrapS = THREE.ClampToEdgeWrapping;
            material.map.wrapT = THREE.ClampToEdgeWrapping;
            material.map.colorSpace = THREE.SRGBColorSpace;
            material.map.rotation = Math.PI * -0.5;
            child.material = material;
            child.position.y = child.position.y - 0.03;
            child.scale.set(0.5, 0.2, 0.5);
            child.receiveShadow = false;
          }
          if (child.name.includes('салфетница')) {
            const paper = child.children[2];
            const wood = child.children[1];
            wood.material = new THREE.MeshStandardMaterial({
              color: '#473518',
            });
            paper.material = new THREE.MeshStandardMaterial({
              color: '#cccccc',
            });
          }
          if (child.name.includes('qr')) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#473518',
            });
          }
          if (child.name.includes('банка')) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#8a9b9c',
              opacity: 0.5,
              transparent: true,
            });
          }
          if (child.name.includes('доска_напитки')) {
            child.material = new THREE.MeshStandardMaterial({
              map: board_beer_texture,
            });
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.rotation = Math.PI * 0.5;
            child.material.map.repeat.x = -1;
          }
          if (child.name.includes('вертак')) {
            const main = child.children[0];
            const plastic = child.children[2];
            const wood = child.children[1];
            wood.material = new THREE.MeshStandardMaterial({
              color: '#ececec',
            });
            main.material = new THREE.MeshStandardMaterial({
              color: '#444444',
            });
            plastic.material = new THREE.MeshStandardMaterial({
              color: '#000000',
            });
          }
          if (child.name.includes('пульт')) {
            const main = child.children[0];
            const wood = child.children[1];
            wood.material = new THREE.MeshStandardMaterial({
              color: '#ececec',
            });
            main.material = new THREE.MeshStandardMaterial({
              color: '#000000',
            });
          }
          if (child.name === 'picture003') {
            const material = new THREE.MeshStandardMaterial({
              transparent: true,
              alphaTest: 0.5,
              map: picture_texture_png,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
            child.material.map.rotation = Math.PI * -1.5;
          }
          if (child.name === 'picture004') {
            const material = new THREE.MeshStandardMaterial({
              map: picture_texture_jpg,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
            child.material.map.rotation = Math.PI * -1.5;
          }
          if (child.name === 'picture002') {
            const material = new THREE.MeshStandardMaterial({
              map: picture_texture_2,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
            child.material.map.rotation = Math.PI * -1.5;
          }
          if (child.name === 'picture001') {
            const material = new THREE.MeshStandardMaterial({
              map: picture_texture_3,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
            child.material.map.rotation = Math.PI * -1.5;
          }
          if (child.name === 'picture') {
            const material = new THREE.MeshStandardMaterial({
              map: picture_texture_4,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
          }
          if (child.name === 'activity') {
            const material = new THREE.MeshStandardMaterial({
              map: promo_texture,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            // child.material.map.repeat.x = -1;
          }
          if (child.name === 'доска_еда') {
            const material = new THREE.MeshStandardMaterial({
              map: menu_eat_texture,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.map.repeat.x = -1;
            child.material.map.rotation = Math.PI * -1;
          }
          if (child.name === 'доски-окна') {
            const material = new THREE.MeshStandardMaterial({
              map: wood_table_diff,
              side: THREE.DoubleSide,
            });
            child.material = material;
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
      
            child.material.map.rotation = Math.PI * -1;
          }
          if (child.name.includes('батарея')) {
         
            child.material = new THREE.MeshStandardMaterial({
              color: '#350d0d',
            });
          }
        });

        lampBar.push({ position: { x: 3.35, z: 4.5, y: 3.35 } });
        lampBar.push({ position: { x: 0, z: 4.5, y: 3.35 } });

        resolve({ bar, lampBar, lampDj, lampTable, lampCenter, signLights });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

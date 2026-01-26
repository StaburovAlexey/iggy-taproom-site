import * as THREE from 'three';
import { loaderGLB } from './loaderTextureAndModel.js';
import { applyPS1Style } from './ps1.js';

const menuModelConfig = {
  beer: {
    path: '/model/beer_low_poly.glb',
    scale: { x: 0.04, y: 0.04, z: 0.04 },
    offset: { x: 0, y: -0.02, z: 0 },
  },
  food: {
    path: '/model/burger.glb',
    scale: { x: 0.03, y: 0.03, z: 0.03 },
    offset: { x: 0, y: -0.06, z: 0 },
  },
  snacks: {
    path: '/model/phistachio_in_cup.glb',
    scale: { x: 0.03, y: 0.03, z: 0.03 },
    offset: { x: 0, y: -0.01, z: 0 },
  },
};

function loadModel(path) {
  return new Promise((resolve, reject) => {
    loaderGLB.load(path, (gltf) => resolve(gltf.scene), undefined, reject);
  });
}

export async function createMenuHoverModels(scene, target) {
  const group = new THREE.Group();
  group.position.set(target.x, target.y, target.z);
  if (scene?.add) {
    scene.add(group);
  }
  const entries = await Promise.all(
    Object.entries(menuModelConfig).map(async ([key, config]) => {
      const model = await loadModel(config.path);
      model.visible = false;
      model.position.set(config.offset.x, config.offset.y, config.offset.z);
      model.scale.set(config.scale.x, config.scale.y, config.scale.z);
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      
      group.add(model);
      return [key, model];
    }),
  );
  const models = Object.fromEntries(entries);
  let activeId = null;
  const rotationSpeed = 0.5;

  const show = (id) => {
    const model = models[id];
    if (!model || activeId === id) {
      return;
    }
    Object.entries(models).forEach(([key, item]) => {
      item.visible = key === id;
    });
    activeId = id;
  };

  const hide = () => {
    if (!activeId) {
      return;
    }
    Object.values(models).forEach((item) => {
      item.visible = false;
    });
    activeId = null;
  };

  const update = (delta) => {
    if (!activeId) {
      return;
    }
    const model = models[activeId];
    if (!model) {
      return;
    }
    model.rotation.y += delta * rotationSpeed;
  };

  return { group, show, hide, update };
}

import * as THREE from 'three';
import { loaderGLB } from './loaderTextureAndModel.js';

const peopleModelsConfig = [
  {
    id: 'person_01',
    path: '/model/body-tex.glb',
    position: { x: -3.8, y: 0, z: 1 },
    rotation: { x: 0, y: Math.PI * 0.5, z: 0 },
    scale: { x: 0.95, y: 0.95, z: 0.95 },
    animation: { name: '1', speed: 1 },
    castShadow: true,
    receiveShadow: false,
    enabled: true,
  },
   {
    id: 'person_02',
    path: '/model/body1.glb',
    position: { x: 3.6, y: 0.2, z: 0 },
    rotation: { x: 0, y: Math.PI * -0.5, z: 0 },
    scale: { x: 0.95, y: 0.95, z: 0.95 },
    animation: { name: 'dj', speed: 1 },
    castShadow: true,
    receiveShadow: false,
    enabled: true,
  },
     {
    id: 'person_03',
    path: '/model/body1.glb',
    position: { x: 1.5, y: 0, z: -2.3 },
    rotation: { x: 0, y: Math.PI * -0.5, z: 0 },
    scale: { x: 0.95, y: 0.95, z: 0.95 },
    animation: { name: 'seet', speed: 1 },
    castShadow: true,
    receiveShadow: false,
    enabled: true,
  },
];

function loadGLTF(path) {
  return new Promise((resolve, reject) => {
    loaderGLB.load(path, (gltf) => resolve(gltf), undefined, reject);
  });
}

function applyTransform(model, config) {
  const position = config.position || {};
  const rotation = config.rotation || {};
  const scale = config.scale || {};
  model.position.set(position.x ?? 0, position.y ?? 0, position.z ?? 0);
  model.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
  model.scale.set(scale.x ?? 1, scale.y ?? 1, scale.z ?? 1);
}

function applyShadows(model, config) {
  const castShadow = config.castShadow !== false;
  const receiveShadow = config.receiveShadow !== false;
  model.traverse((child) => {
    if (!child.isMesh) {
      return;
    }
    child.castShadow = castShadow;
    child.receiveShadow = receiveShadow;
  });
}

function pickClip(animations, config) {
  if (!animations || animations.length === 0) {
    return null;
  }
  if (config?.name) {
    const byName = THREE.AnimationClip.findByName(animations, config.name);
    if (byName) {
      return byName;
    }
  }
  if (Number.isInteger(config?.index) && animations[config.index]) {
    return animations[config.index];
  }
  return animations[0];
}

function createAnimation(model, animations, config) {
  if (config === false) {
    return { mixer: null, action: null };
  }
  const clip = pickClip(animations, config);
  if (!clip) {
    return { mixer: null, action: null };
  }
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(clip);
  const loop = config?.loop ?? THREE.LoopRepeat;
  const repetitions = config?.repetitions ?? Infinity;
  action.setLoop(loop, repetitions);
  action.clampWhenFinished = Boolean(config?.clampWhenFinished);
  if (config?.speed != null) {
    action.timeScale = config.speed;
  }
  if (config?.startAt != null) {
    action.time = config.startAt;
  }
  if (config?.fadeIn) {
    action.fadeIn(config.fadeIn);
  }
  action.play();
  return { mixer, action };
}

async function createPersonModel(config) {
  const gltf = await loadGLTF(config.path);
  const model = gltf.scene;
 
  console.log('person', gltf);
  const id = config.id || model.name || config.path;
  model.name = id;
  applyTransform(model, config);
  applyShadows(model, config);
  const { mixer, action } = createAnimation(
    model,
    gltf.animations,
    config.animation,
  );
  return { id, model, mixer, action };
}

export async function createPeopleModels(scene, config = peopleModelsConfig) {
  const group = new THREE.Group();
  group.name = 'people';
  if (scene?.add) {
    scene.add(group);
  }
  const enabled = config.filter((item) => item.enabled !== false);
  const people = await Promise.all(
    enabled.map((item) => createPersonModel(item)),
  );
  people.forEach((item) => {
    group.add(item.model);
  });
  const mixers = people.map((item) => item.mixer).filter(Boolean);
  const update = (delta) => {
    mixers.forEach((mixer) => mixer.update(delta));
  };
  const items = Object.fromEntries(people.map((item) => [item.id, item]));
  return { group, update, items };
}

export { peopleModelsConfig };

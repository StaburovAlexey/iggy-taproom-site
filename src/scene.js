import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { goPoint } from './cameraPoint.js';
import { createDust } from './dust.js';

export function createScene(container, models) {
  const { bar, lampBar, lampDj, lampTable, lampCenter, signLights } = models;
  let resolveFirstFrame;
  const firstFrame = new Promise((resolve) => {
    resolveFirstFrame = resolve;
  });

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(1);
  const renderScale = 0.55;
  function setRendererSize() {
    const width = Math.max(1, Math.floor(container.clientWidth * renderScale));
    const height = Math.max(
      1,
      Math.floor(container.clientHeight * renderScale),
    );
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = `${container.clientWidth}px`;
    renderer.domElement.style.height = `${container.clientHeight}px`;
    renderer.domElement.style.imageRendering = 'pixelated';
  }
  setRendererSize();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  lampBar.forEach((item, index) => {
    const { x, y, z } = item.position;
    const pointlight = new THREE.PointLight(0xffd2a1, 1, 5);
    pointlight.position.set(x, y - 1.7, z);
    pointlight.shadow.mapSize.set(256, 256);
    if (index % 2 === 0) {
      pointlight.castShadow = true;
    }
    scene.add(pointlight);
  });

  lampDj.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.8, 3.5);
    pointlight.position.set(x, y - 1.6, z);
    pointlight.shadow.mapSize.set(256, 256);
    pointlight.castShadow = true;
    scene.add(pointlight);
  });
  lampTable.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.4, 5);
    pointlight.position.set(x, y - 2.2, z + 0.2);
    pointlight.shadow.mapSize.set(256, 256);

    scene.add(pointlight);
  });
  lampCenter.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.7, 5);
    pointlight.position.set(x, y - 1.9, z);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);

    scene.add(pointlight);
  });
  signLights.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(
      item.color,
      item.intensity,
      item.distance,
    );
    pointlight.position.set(x, y, -z + 0.1);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);
 
    scene.add(pointlight);
  });

  const spotLight = new THREE.SpotLight(
    0xffffff,
    4.5,
    4,
    Math.PI * 0.13,
    0.55,
    0.6,
  );
  const spotLight2 = new THREE.SpotLight(
    0xffffff,
    4.5,
    4,
    Math.PI * 0.13,
    0.55,
    0.6,
  );
  const spotLight3 = new THREE.SpotLight(
    0xffffff,
    4.5,
    4,
    Math.PI * 0.16,
    0.55,
    0.6,
  );
  const spotLight4 = new THREE.SpotLight(
    0xffffff,
    4.5,
    4,
    Math.PI * 0.16,
    0.55,
    0.6,
  );
  const spotLight5 = new THREE.SpotLight(
    0xffffff,
    4.5,
    5,
    Math.PI * 0.13,
    0.55,
    0.6,
  );
  const spotLight6 = new THREE.SpotLight(
    0xffffff,
    4.5,
    5,
    Math.PI * 0.16,
    0.55,
    0.6,
  );
  spotLight6.position.set(3.5, 3.2, 3.3);
  spotLight6.target.position.x = 3.7;
  spotLight6.target.position.y = 1.1;
  spotLight6.target.position.z = 2.5;

  scene.add(spotLight6.target);
  scene.add(spotLight6);
  spotLight5.position.set(-3, 3.2, 3.3);
  spotLight5.target.position.x = -4;
  spotLight5.target.position.y = 2.1;
  spotLight5.target.position.z = 2.5;

  scene.add(spotLight5.target);
  scene.add(spotLight5);
  spotLight4.position.set(-3, 3.2, -2.2);
  spotLight4.target.position.x = -4;
  spotLight4.target.position.y = 2.4;
  spotLight4.target.position.z = -2.3;
  spotLight4.castShadow = true;
  spotLight4.shadow.mapSize.set(256, 256);
  scene.add(spotLight4.target);
  scene.add(spotLight4);
  spotLight3.position.set(-3, 3.2, 2.2);
  spotLight3.target.position.x = -4.5;
  spotLight3.target.position.y = 2.5;
  spotLight3.target.position.z = 2.5;

  scene.add(spotLight3.target);
  scene.add(spotLight3);
  spotLight2.position.set(-3, 3.2, -1.2);
  spotLight2.target.position.x = -6;
  spotLight2.target.position.y = 1.6;

  scene.add(spotLight2.target);
  scene.add(spotLight2);
  spotLight.position.set(-3, 3.2, 1.2);
  spotLight.target.position.x = -7;
  spotLight.target.position.y = 1.3;
  spotLight.castShadow = true;
  scene.add(spotLight.target);
  scene.add(spotLight);
  scene.add(bar);
  const dust = createDust(scene);

  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    50,
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  const baseTarget = new THREE.Vector3();
  baseTarget.copy(controls.target);
  const clock = new THREE.Clock();
  controls.update();
  controls.enabled = true;
  goPoint(camera, controls, 'main', baseTarget);
  const stats = new Stats();
  stats.dom.classList.add('stats');
  container.appendChild(stats.dom);

  function onResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    setRendererSize();
  }

  window.addEventListener('resize', () => onResize());

  function animate() {
    stats.begin();
    const delta = clock.getDelta();
    const time = clock.elapsedTime;
    const wobbleX = Math.sin(time * 0.3) * 0.008;
    const wobbleY = Math.cos(time * 0.4) * 0.005;
    controls.target.set(
      baseTarget.x + wobbleX,
      baseTarget.y + wobbleY,
      baseTarget.z,
    );
    controls.update();
    dust.update(delta, time);
    renderer.render(scene, camera);
    if (resolveFirstFrame) {
      resolveFirstFrame();
      resolveFirstFrame = null;
    }
    stats.end();
    requestAnimationFrame(animate);
  }

  animate();

  const goToPoint = (namePosition) => {
    goPoint(camera, controls, namePosition, baseTarget);
  };

  return { firstFrame, goToPoint };
}

import * as THREE from 'three';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const target = new THREE.Vector3(-5, 1, 0);

export function createScene(container, models) {
  const { bar, lampBar, lampDj, lampTable, lampCenter } = models;
  let resolveFirstFrame;
  const firstFrame = new Promise((resolve) => {
    resolveFirstFrame = resolve;
  });

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(1);
  const renderScale = 0.55;
  function setRendererSize() {
    const width = Math.max(1, Math.floor(container.clientWidth * renderScale));
    const height = Math.max(1, Math.floor(container.clientHeight * renderScale));
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

  lampBar.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 1, 12);
    // const pointLightHelper = new THREE.PointLightHelper(pointlight, 0.2);
    pointlight.position.set(x, y - 1.5, z);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);
    // scene.add(pointLightHelper);
    scene.add(pointlight);
  });

  lampDj.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.8, 3.5);
    // const pointLightHelper = new THREE.PointLightHelper(pointlight, 0.2);
    pointlight.position.set(x, y - 1.6, z);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);

    // scene.add(pointLightHelper);
    scene.add(pointlight);
  });
  lampTable.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.5, 3);
    // const pointLightHelper = new THREE.PointLightHelper(pointlight, 0.2);
    pointlight.position.set(x, y - 1.9, z + 0.7);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);

    // scene.add(pointLightHelper);
    scene.add(pointlight);
  });
  lampCenter.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;
    pointlight = new THREE.PointLight(0xffd2a1, 0.4, 3);
    // const pointLightHelper = new THREE.PointLightHelper(pointlight, 0.2);
    pointlight.position.set(x, y - 1.9, z);
    pointlight.castShadow = true;
    pointlight.shadow.mapSize.set(256, 256);

    // scene.add(pointLightHelper);
    scene.add(pointlight);
  });

  const sunLight = new THREE.DirectionalLight(0xfff2d1, 1.5);
  // const sunLightHelper = new THREE.DirectionalLightHelper(sunLight, 0.2);
  sunLight.position.set(3.3, 5.3, -9.5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(256, 256);
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 20;
  sunLight.shadow.camera.top = 8;
  sunLight.shadow.camera.right = 10;
  sunLight.shadow.camera.bottom = -6;
  sunLight.shadow.camera.left = -10;
  // scene.add(sunLight);
  // scene.add(sunLightHelper);
  // const directionalLightCameraHelper = new THREE.CameraHelper(
  //   sunLight.shadow.camera,
  // );
  // scene.add(directionalLightCameraHelper);
  scene.add(bar);

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    50,
  );
  camera.position.set(-1, 2, 6);
  camera.lookAt(target);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.update();

  const clock = new THREE.Clock();
  const stats = new Stats();
  stats.dom.classList.add('stats');
  container.appendChild(stats.dom);

  const gui = new GUI({ width: 240 });

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

    renderer.render(scene, camera);
    if (resolveFirstFrame) {
      resolveFirstFrame();
      resolveFirstFrame = null;
    }
    stats.end();
    requestAnimationFrame(animate);
  }

  animate();

  return { firstFrame };
}

import * as THREE from 'three';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const target = new THREE.Vector3(0, 1, 0);

export function createScene(container, models) {
  const { bar, lampBar } = models;
  let resolveFirstFrame;
  const firstFrame = new Promise((resolve) => {
    resolveFirstFrame = resolve;
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  
 
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  lampBar.forEach((item) => {
    const { x, y, z } = item.position;
    let pointlight;

    pointlight = new THREE.PointLight(0xffffff, 1, 4);
    // const pointLightHelper = new THREE.PointLightHelper(pointlight, 0.2);
    pointlight.position.set(x, y - 0.9, z);
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
  scene.add(sunLight);
  // scene.add(sunLightHelper);
  // const directionalLightCameraHelper = new THREE.CameraHelper(
  //   sunLight.shadow.camera,
  // );
  // scene.add(directionalLightCameraHelper);
  scene.add(bar);

  const camera = new THREE.PerspectiveCamera(
    85,
    container.clientWidth / container.clientHeight,
    0.1,
    50,
  );
  camera.position.set(0, 3, 4);
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
    renderer.setSize(width, height);
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

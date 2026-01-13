import * as THREE from 'three';
import GUI from 'lil-gui';
import Stats from 'stats.js';

const target = new THREE.Vector3(0, 1, 0);

export function createScene(container) {
  let resolveFirstFrame
  const firstFrame = new Promise((resolve) => {
    resolveFirstFrame = resolve
  })

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    50,
  );
  camera.position.set(4.5, 3.5, 6);
  camera.lookAt(target);

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
      resolveFirstFrame()
      resolveFirstFrame = null
    }
    stats.end();
    requestAnimationFrame(animate);
  }

  animate();

  return { firstFrame }
}

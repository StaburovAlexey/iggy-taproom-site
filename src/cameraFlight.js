import * as THREE from 'three';

export function createCameraFlight(camera, clock) {
  const cameraPath = [
    {
      pos: new THREE.Vector3(2, 2.2, 4),
      look: new THREE.Vector3(-4, 1, 0),
    },
    {
      pos: new THREE.Vector3(-2.6, 1.6, 5),
      look: new THREE.Vector3(-5, 1, 0),
    },
    {
      pos: new THREE.Vector3(-4, 2.4, 1.5),
      look: new THREE.Vector3(-2, 1.7, -0.5),
    },
    {
      pos: new THREE.Vector3(-2.5, 2.8, -1.5),
      look: new THREE.Vector3(1, 1.5, -2.5),
    },
    {
      pos: new THREE.Vector3(1.5, 2.6, 1),
      look: new THREE.Vector3(-0.5, 1.9, 0),
    },
    {
      pos: new THREE.Vector3(2.5, 2, 5),
      look: new THREE.Vector3(3, 1.5, 3),
    },
   
  ];
  const cameraLoopDuration = 38;
  const cameraStart = clock.getElapsedTime();
  const cameraLook = new THREE.Vector3();

  return function updateCameraFlight() {
    const t =
      ((clock.getElapsedTime() - cameraStart) % cameraLoopDuration) /
      cameraLoopDuration;
    const segment = 1 / cameraPath.length;
    const index = Math.floor(t / segment);
    const localT = (t - segment * index) / segment;
    const from = cameraPath[index];
    const to = cameraPath[(index + 1) % cameraPath.length];
    camera.position.lerpVectors(from.pos, to.pos, localT);
    cameraLook.lerpVectors(from.look, to.look, localT);
    camera.lookAt(cameraLook);
  };
}

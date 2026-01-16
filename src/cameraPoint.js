import { Vector3 } from 'three';
const pointCameraPosition = {
  main: {
    position: { x: -1, y: 2, z: 5.5 },
    target: { x: -4, y: 1, z: 0 },
  },
  menu: {
    position: { x: -2.4, y: 1.4, z: 0 },
    target: { x: -3, y: 1.2, z: 0 },
  },
  beer: {
    position: { x: -2.4, y: 1.4, z: 0 },
    target: { x: -3, y: 1.6, z: 0 },
  },
  activity: {
    position: { x: 3.8, y: 1.8, z: 1.6 },
    target: { x: 0, y: 0, z: -1.4 },
  },
  barmen: {
    position: { x: -2.2, y: 1.5, z: 0.6 },
    target: { x: -3.5, y: 1.3, z: 0.7 },
  },
};

export function goPoint(camera, controls, namePosition) {
  const target = pointCameraPosition[namePosition].target;
  const targetVector = new Vector3(target.x, target.y, target.z);
  const point = pointCameraPosition[namePosition].position;
  camera.position.set(point.x, point.y, point.z);
  camera.lookAt(targetVector);
  controls.target.copy(targetVector);
  controls.update();
}

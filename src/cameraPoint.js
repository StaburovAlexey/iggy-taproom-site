import { Vector3 } from 'three';
import { gsap } from 'gsap';
export const pointCameraPosition = {
  main: {
    position: { x: -1, y: 2, z: 5.5 },
    target: { x: -4, y: 1, z: 0 },
  },

  menu: {
    position: { x: -2.4, y: 1.4, z: 0 },
    target: { x: -3, y: 1.1, z: 0 },
  },
  
  beer: {
    position: { x: -2.4, y: 1.4, z: 0 },
    target: { x: -3, y: 1.6, z: 0 },
  },
  eat: {
    position: { x: -2.4, y: 1.4, z: 1 },
    target: { x: -3, y: 1.65, z: 1.2 },
  },
  activity: {
    position: { x: 3.5, y: 1.8, z: 1.8 },
    target: { x: 0.5, y: 0, z: -1.4 },
    // position: { x:-0.5, y: 2, z: 3.5 },
    // target: { x: 2, y: 1, z: 1 },
  },
  barmen: {
    position: { x: -2.2, y: 1.5, z: 0.6 },
    target: { x: -3.5, y: 1.3, z: 0.7 },
  },
};

export function goPoint(camera, controls, namePosition, baseTarget = controls.target) {
  const target = pointCameraPosition[namePosition].target;
  const targetVector = new Vector3(target.x, target.y, target.z);
  const point = pointCameraPosition[namePosition].position;
  gsap.to(camera.position, {
    x: point.x,
    y: point.y,
    z: point.z,
    duration: 1.1,
    ease: 'power2.out',
    onUpdate: () => controls.update(),
  });
  gsap.to(baseTarget, {
    x: targetVector.x,
    y: targetVector.y,
    z: targetVector.z,
    duration: 1.1,
    ease: 'power2.out',
    onUpdate: () => controls.update(),
  });
}

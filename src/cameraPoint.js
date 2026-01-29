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
  music: {
    position: { x: 0, y: 1.8, z: 1.5 },
    target: { x: 4.5, y: 1, z: -1 },
  },
  barmen: {
    position: { x: -2.2, y: 1.5, z: 0.6 },
    target: { x: -3.5, y: 1.3, z: 0.7 },
  },
};

function applyControlsLimits(controls, limits = {}) {
  const state = controls.userData || {};
  if (!state.baseLimits) {
    state.baseLimits = {
      minDistance: controls.minDistance,
      maxDistance: controls.maxDistance,
      minPolarAngle: controls.minPolarAngle,
      maxPolarAngle: controls.maxPolarAngle,
      minAzimuthAngle: controls.minAzimuthAngle,
      maxAzimuthAngle: controls.maxAzimuthAngle,
    };
    controls.userData = state;
  }
  const base = state.baseLimits;
  controls.minDistance = limits.minDistance ?? base.minDistance;
  controls.maxDistance = limits.maxDistance ?? base.maxDistance;
  controls.minPolarAngle = limits.minPolarAngle ?? base.minPolarAngle;
  controls.maxPolarAngle = limits.maxPolarAngle ?? base.maxPolarAngle;
  controls.minAzimuthAngle = limits.minAzimuthAngle ?? base.minAzimuthAngle;
  controls.maxAzimuthAngle = limits.maxAzimuthAngle ?? base.maxAzimuthAngle;
  controls.update();
}

export function goPoint(
  camera,
  controls,
  namePosition,
  baseTarget = controls.target,
) {
  const pointConfig = pointCameraPosition[namePosition];
  const target = pointConfig.target;
  const targetVector = new Vector3(target.x, target.y, target.z);
  const point = pointConfig.position;
  applyControlsLimits(controls, pointConfig.limits);
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

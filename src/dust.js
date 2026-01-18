import * as THREE from 'three';

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export function createDust(scene, options = {}) {
  const {
    count = 180,
    center = { x: 0, y: 1.6, z: 0 },
    area = { x: 11, y: 4, z: 7 },
    size = 0.02,
    opacity = 0.25,
    color = 0xf6e9d4,
  } = options;

  const halfX = area.x * 0.5;
  const halfY = area.y * 0.5;
  const halfZ = area.z * 0.5;
  const minX = center.x - halfX;
  const maxX = center.x + halfX;
  const minY = center.y - halfY;
  const maxY = center.y + halfY;
  const minZ = center.z - halfZ;
  const maxZ = center.z + halfZ;

  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const drift = new Float32Array(count * 2);
  const sway = new Float32Array(count * 2);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const idx = i * 3;
    const driftIdx = i * 2;
    const px = center.x + rand(-halfX, halfX);
    const py = center.y + rand(-halfY, halfY);
    const pz = center.z + rand(-halfZ, halfZ);
    basePositions[idx] = px;
    basePositions[idx + 1] = py;
    basePositions[idx + 2] = pz;
    positions[idx] = px;
    positions[idx + 1] = py;
    positions[idx + 2] = pz;
    speeds[i] = rand(0.01, 0.035);
    drift[driftIdx] = rand(-0.015, 0.015);
    drift[driftIdx + 1] = rand(-0.015, 0.015);
    sway[driftIdx] = rand(0.01, 0.04);
    sway[driftIdx + 1] = rand(0.01, 0.04);
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();

  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const update = (delta, time = 0) => {
    for (let i = 0; i < count; i += 1) {
      const idx = i * 3;
      const driftIdx = i * 2;
      basePositions[idx] += drift[driftIdx] * delta;
      basePositions[idx + 1] += speeds[i] * delta;
      basePositions[idx + 2] += drift[driftIdx + 1] * delta;

      if (basePositions[idx + 1] > maxY) {
        basePositions[idx] = center.x + rand(-halfX, halfX);
        basePositions[idx + 1] = minY + rand(0, 0.15);
        basePositions[idx + 2] = center.z + rand(-halfZ, halfZ);
        speeds[i] = rand(0.01, 0.035);
        drift[driftIdx] = rand(-0.015, 0.015);
        drift[driftIdx + 1] = rand(-0.015, 0.015);
        sway[driftIdx] = rand(0.01, 0.04);
        sway[driftIdx + 1] = rand(0.01, 0.04);
        phases[i] = Math.random() * Math.PI * 2;
      }

      if (basePositions[idx] > maxX) {
        basePositions[idx] = minX;
      } else if (basePositions[idx] < minX) {
        basePositions[idx] = maxX;
      }

      if (basePositions[idx + 2] > maxZ) {
        basePositions[idx + 2] = minZ;
      } else if (basePositions[idx + 2] < minZ) {
        basePositions[idx + 2] = maxZ;
      }

      const swayX = Math.sin(time * 0.6 + phases[i]) * sway[driftIdx];
      const swayZ = Math.cos(time * 0.5 + phases[i]) * sway[driftIdx + 1];
      positions[idx] = basePositions[idx] + swayX;
      positions[idx + 1] = basePositions[idx + 1];
      positions[idx + 2] = basePositions[idx + 2] + swayZ;
    }
    geometry.attributes.position.needsUpdate = true;
  };

  return { points, update };
}

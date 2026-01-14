import * as THREE from 'three';
import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';

function applyPS1TextureFilters(material) {
  const textureKeys = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
  ];
  textureKeys.forEach((key) => {
    const tex = material[key];
    if (tex) {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.needsUpdate = true;
    }
  });
}

function createPS1Material(baseMaterial) {
  const ps1Material = baseMaterial.clone();
  ps1Material.flatShading = true;
  ps1Material.roughness = 1;
  ps1Material.metalness = 0;
  ps1Material.dithering = false;
  applyPS1TextureFilters(ps1Material);
  ps1Material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `
        vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
        vec4 projected = projectionMatrix * mvPosition;
        float snapScale = 40.0;
        projected.xy = floor(projected.xy * snapScale) / snapScale;
        gl_Position = projected;
      `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <output_fragment>',
      `
        float bayer[16];
        bayer[0] = 0.0; bayer[1] = 8.0; bayer[2] = 2.0; bayer[3] = 10.0;
        bayer[4] = 12.0; bayer[5] = 4.0; bayer[6] = 14.0; bayer[7] = 6.0;
        bayer[8] = 3.0; bayer[9] = 11.0; bayer[10] = 1.0; bayer[11] = 9.0;
        bayer[12] = 15.0; bayer[13] = 7.0; bayer[14] = 13.0; bayer[15] = 5.0;

        int xi = int(mod(gl_FragCoord.x, 4.0));
        int yi = int(mod(gl_FragCoord.y, 4.0));
        int bi = xi + yi * 4;
        float threshold = bayer[bi] / 16.0;

        float jitter = fract(sin(dot(gl_FragCoord.xy , vec2(12.9898,78.233))) * 43758.5453);
        threshold = mix(threshold, jitter, 0.35);

        float ps1Levels = 4.0;
        vec3 quantized = floor((outgoingLight + threshold / ps1Levels) * ps1Levels) / ps1Levels;
        gl_FragColor = vec4(quantized, diffuseColor.a);
      `,
    );
  };
  ps1Material.needsUpdate = true;
  return ps1Material;
}

export function applyPS1Style(object3d) {
  object3d.traverse((child) => {
    if (!child.isMesh) return;
    if (!child.material) return;
    const toPs1 = (material) =>
      material && material.isMaterial ? createPS1Material(material) : material;
    child.material = Array.isArray(child.material)
      ? child.material.map(toPs1)
      : toPs1(child.material);
  });
}

export function applyLowPoly(object3d, reduction = 0.1, minVertices = 200) {
  const modifier = new SimplifyModifier();
  object3d.traverse((child) => {
    if (!child.isMesh) return;
    if (!child.geometry || !child.geometry.attributes?.position) return;
    const count = child.geometry.attributes.position.count;
    if (count < minVertices) return;
    const remove = Math.floor(count * reduction);
    if (remove <= 0) return;
    child.geometry = modifier.modify(child.geometry, remove);
    child.geometry.computeVertexNormals();
  });
}

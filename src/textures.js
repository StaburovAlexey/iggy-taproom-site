import { loaderTexture } from './loaderTextureAndModel.js';

export const texturePaths = {
  brickWall_arm: '/textures/brick_wall_006_1k/brick_wall_006_arm_1k.jpg',
  brickWall_diff: '/textures/brick_wall_006_1k/brick_wall_006_diff_1k.jpg',
  brickWall_disp: '/textures/brick_wall_006_1k/brick_wall_006_disp_1k.jpg',
  brickWall_gl: '/textures/brick_wall_006_1k/brick_wall_006_nor_gl_1k.jpg',
  interior_tiles_diff: '/textures/interior_tiles_1k/interior_tiles_diff_1k.jpg',
  wood_table_diff: '/textures/wood_table_001_1k/wood_table_001_diff_1k.jpg',
  wood_planks_dirt_1k: '/textures/wood_planks_dirt_1k/wood_planks_dirt_diff_1k.jpg',
  wood_planks_1k : '/textures/wood_planks_1k/wood_planks_diff_1k.jpg',
  wood_planks_nor_gl_1k: '/textures/wood_planks_1k/wood_planks_nor_gl_1k.jpg',
  rough_wood_diff_1k: '/textures/rough_wood_1k/rough_wood_diff_1k.jpg',
  wood_shutter_1k: '/textures/wood_shutter_1k/wood_shutter_diff_1k.jpg',
  rust_coarse_01_1k: '/textures/rust_coarse_01_1k/rust_coarse_01_diff_1k.jpg',
  cup_texture: '/textures/cup_texture.png',
  beer_texture: '/textures/beer_texture.png',
  board_beer_texture: '/textures/board_beer_texture.png'
};

export function loadTexture(path) {
  return new Promise((resolve, reject) => {
    loaderTexture.load(path, (texture) => resolve(texture), undefined, reject);
  });
}

export function loadTexturesMap() {
  return Promise.all(
    Object.entries(texturePaths).map(([key, path]) =>
      loadTexture(path).then((texture) => [key, texture]),
    ),
  ).then((entries) => Object.fromEntries(entries));
}

export function setTexturePaths(paths) {
  Object.assign(texturePaths, paths);
}

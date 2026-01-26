import './style.css';
import './components/menu-panel.js';
import './components/app-preloader.js';
import './components/menu-window.js';
import './components/menu-list-window.js';
import { createScene } from './scene.js';
import { loadingDone, onLoadingProgress } from './loaderTextureAndModel.js';
import { loadBar } from './models.js';
import { applyLowPoly, applyPS1Style } from './ps1.js';
import { pointCameraPosition } from './cameraPoint.js';
import { createMenuHoverModels } from './menuHoverModels.js';
import { createPeopleModels } from './peopleModels.js';
import { warmupScene } from './warmup.js';

const app = document.body;
const preloader = document.createElement('app-preloader');
document.body.appendChild(preloader);
const stopProgress = onLoadingProgress((state) =>
  preloader.setProgress(state.progress),
);

const menuTarget = pointCameraPosition.menu.target;
const barPromise = loadBar();
const peoplePromise = createPeopleModels();
const menuHoverPromise = createMenuHoverModels(null, menuTarget);

const models = await barPromise;
applyLowPoly(models.bar, 0.01, 1500);
applyPS1Style(models.bar);
const { firstFrame, goToPoint, scene, addUpdate, renderer, camera } = createScene(app, models);
const [peopleModels, menuHoverModels] = await Promise.all([
  peoplePromise,
  menuHoverPromise,
]);
if (peopleModels?.group) {
  scene.add(peopleModels.group);
}
if (menuHoverModels?.group) {
  scene.add(menuHoverModels.group);
}
applyPS1Style(peopleModels.group, '500.0');
addUpdate(peopleModels.update);
addUpdate(menuHoverModels.update);
await warmupScene(renderer, scene, camera, [menuHoverModels?.group]);
await Promise.all([loadingDone, firstFrame]);
const menuWindow = document.createElement('menu-window');
const menuListWindow = document.createElement('menu-list-window');
let currentPoint = 'main';
menuWindow.addEventListener('navigate', (event) => {
  currentPoint = event.detail;
  goToPoint(event.detail);
  if (currentPoint !== 'menu') {
    menuHoverModels.hide();
  }
});
menuWindow.addEventListener('menu-list-open', (event) =>
  menuListWindow.open(event.detail),
);
menuWindow.addEventListener('menu-list-close', () => menuListWindow.close());
menuWindow.addEventListener('menu-hover', (event) => {
  if (currentPoint !== 'menu') {
    return;
  }
  menuHoverModels.show(event.detail);
});
menuWindow.addEventListener('menu-hover-out', () => menuHoverModels.hide());
document.body.appendChild(menuWindow);
document.body.appendChild(menuListWindow);
stopProgress();
preloader.hide();

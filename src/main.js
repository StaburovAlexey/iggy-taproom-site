import './style.css';
import './components/menu-panel.js';
import './components/app-preloader.js';
import './components/menu-window.js';
import './components/menu-list-window.js';
import { createScene } from './scene.js';
import { loadingDone } from './loaderTextureAndModel.js';
import { loadBar } from './models.js';
import { applyLowPoly, applyPS1Style } from './ps1.js';
import { pointCameraPosition } from './cameraPoint.js';
import { createMenuHoverModels } from './menuHoverModels.js';
import { createPeopleModels } from './peopleModels.js';


const app = document.body;
const preloader = document.createElement('app-preloader');
document.body.appendChild(preloader);

await loadingDone;
const models = await loadBar()
applyLowPoly(models.bar, 0.01, 1500);
applyPS1Style(models.bar);
const { firstFrame, goToPoint, scene, addUpdate } = createScene(app, models);
const peopleModels = await createPeopleModels(scene);
applyPS1Style(peopleModels.group, '300.0');
addUpdate(peopleModels.update);
const menuTarget = pointCameraPosition.menu.target;
const menuHoverModels = await createMenuHoverModels(scene, menuTarget);
addUpdate(menuHoverModels.update);
await firstFrame;
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
preloader.hide();

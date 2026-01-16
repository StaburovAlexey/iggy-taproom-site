import './style.css';
import './components/menu-panel.js';
import './components/app-preloader.js';
import './components/menu-window.js';
import { createScene } from './scene.js';
import { loadingDone } from './loaderTextureAndModel.js';
import { loadBar } from './models.js';
import { applyLowPoly, applyPS1Style } from './ps1.js';


const app = document.body;
const preloader = document.createElement('app-preloader');
document.body.appendChild(preloader);

await loadingDone;
const models = await loadBar()
applyLowPoly(models.bar, 0.01, 1500);
applyPS1Style(models.bar);
const { firstFrame, goToPoint } = createScene(app, models);
await firstFrame;
const menuWindow = document.createElement('menu-window');
menuWindow.addEventListener('navigate', (event) => goToPoint(event.detail));
document.body.appendChild(menuWindow);
preloader.hide();

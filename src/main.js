import './style.css';
import './components/menu-panel.js';
import './components/app-preloader.js';
import { createScene } from './scene.js';
import { loadingDone } from './loaderTextureAndModel.js';
import { loadBar } from './models.js';


const app = document.body;
const preloader = document.createElement('app-preloader');
document.body.appendChild(preloader);

await loadingDone;
const {bar,lampBar} = await loadBar()
createScene(app, { bar, lampBar });
preloader.hide();

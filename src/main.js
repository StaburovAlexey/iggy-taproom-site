import './style.css';
import './components/menu-panel.js';
import './components/app-preloader.js';
import './components/menu-window.js';
import './components/menu-list-window.js';
import './components/activity-window.js';
import './components/music-list-window.js';
import './components/sound-hint.js';
import { createScene } from './scene.js';
import { loadingDone, onLoadingProgress } from './loaderTextureAndModel.js';
import { loadBar } from './models.js';
import { applyLowPoly, applyPS1Style } from './ps1.js';
import { pointCameraPosition } from './cameraPoint.js';
import { createMenuHoverModels } from './menuHoverModels.js';
import { createPeopleModels } from './peopleModels.js';
import { warmupScene } from './warmup.js';
import { musicTracks } from './data/musicList.js';

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

const menuWindow = document.createElement('menu-window');
const menuListWindow = document.createElement('menu-list-window');
const activityWindow = document.createElement('activity-window');
const musicListWindow = document.createElement('music-list-window');
const soundHint = document.createElement('sound-hint');
let currentPoint = 'main';
const musicAudio = new Audio();
musicAudio.loop = true;
const baseUrl = import.meta.env.BASE_URL ?? '/';
let defaultTrack = musicTracks.find(
  (track) =>
    track.title.trim().toLowerCase() === 'country' ||
    track.file.trim().toLowerCase().includes('country'),
);
if (!defaultTrack && musicTracks.length > 0) {
  defaultTrack = musicTracks[0];
}

const tryPlayMusic = () => {
  if (!musicAudio.src) {
    return Promise.resolve();
  }
  musicAudio.muted = false;
  return musicAudio
    .play()
    .then(() => {
      soundHint.close();
    })
    .catch((error) => {
      soundHint.open();
      throw error;
    });
};

async function init() {
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

  menuWindow.addEventListener('navigate', (event) => {
    currentPoint = event.detail;
    goToPoint(event.detail);
    if (currentPoint === 'activity') {
      activityWindow.open();
    } else {
      activityWindow.close();
    }
    if (currentPoint === 'music') {
      musicListWindow.open();
    } else {
      musicListWindow.close();
    }
    if (currentPoint !== 'menu') {
      menuHoverModels.hide();
    }
  });
  menuWindow.addEventListener('menu-list-open', (event) =>
    menuListWindow.open(event.detail),
  );
  menuWindow.addEventListener('menu-list-close', () => menuListWindow.close());
  musicListWindow.addEventListener('music-select', (event) => {
    const { src } = event.detail;
    if (!src) {
      return;
    }
    if (musicAudio.src !== src) {
      musicAudio.src = src;
    }
    tryPlayMusic().catch(() => {});
    musicListWindow.setActiveTrack(event.detail);
  });
  menuWindow.addEventListener('menu-hover', (event) => {
    if (currentPoint !== 'menu') {
      return;
    }
    menuHoverModels.show(event.detail);
  });
  menuWindow.addEventListener('menu-hover-out', () => menuHoverModels.hide());

  if (defaultTrack) {
    const src = `${baseUrl}music/${defaultTrack.file}`;
    musicAudio.src = src;
    musicListWindow.setActiveTrack(defaultTrack);
    tryPlayMusic().catch(() => {});
  }

  document.body.appendChild(menuWindow);
  document.body.appendChild(menuListWindow);
  document.body.appendChild(activityWindow);
  document.body.appendChild(musicListWindow);
  document.body.appendChild(soundHint);
  soundHint.addEventListener('sound-request', () => {
    tryPlayMusic().catch(() => {});
  });
  stopProgress();
  preloader.hide();
}

init().catch(() => {});

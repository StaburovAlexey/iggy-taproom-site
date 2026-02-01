import './style.css';

import './components/app-preloader.js';
import './components/menu-window.js';
import './components/menu-list-window.js';
import './components/activity-window.js';
import './components/music-list-window.js';
import './components/sound-hint.js';
import { loadingDone, onLoadingProgress } from './loaderTextureAndModel.js';
import { musicTracks } from './data/musicList.js';
import { isSmallScreen, subscribeSmallScreen } from './utils/screen.js';

const baseUrl = import.meta.env.BASE_URL ?? '/';
const app = document.querySelector('main#app') ?? document.body;
const preloader =
  document.querySelector('app-preloader') ?? document.createElement('app-preloader');
if (!preloader.isConnected) {
  document.body.appendChild(preloader);
}
const preloaderLogo = preloader.querySelector('img.logo');
if (!preloaderLogo) {
  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.setAttribute('slot', 'logo');
  logo.src = `${baseUrl}logo.png`;
  logo.alt = 'Iggy bar';
  logo.width = 440;
  logo.height = 440;
  logo.setAttribute('fetchpriority', 'high');
  logo.decoding = 'async';
  preloader.appendChild(logo);
}
const stopProgress = onLoadingProgress((state) =>
  preloader.setProgress(state.progress),
);

const menuTarget = { x: -3, y: 1.1, z: 0.7 };

const menuWindow = document.createElement('menu-window');
const menuListWindow = document.createElement('menu-list-window');
const activityWindow = document.createElement('activity-window');
const musicListWindow = document.createElement('music-list-window');
const soundHint = document.createElement('sound-hint');
const responsiveWindows = [
  menuWindow,
  menuListWindow,
  activityWindow,
  musicListWindow,
];
const updateResponsiveLayout = (value = isSmallScreen()) => {
  for (const element of responsiveWindows) {
    if (!element) {
      continue;
    }
    if (value) {
      element.setAttribute('data-compact', '');
    } else {
      element.removeAttribute('data-compact');
    }
  }
};
updateResponsiveLayout();
subscribeSmallScreen(updateResponsiveLayout);
let currentPoint = 'main';
const musicAudio = new Audio();
musicAudio.loop = true;
musicAudio.preload = 'none';
let defaultTrack = musicTracks.find(
  (track) =>
    track.title.trim().toLowerCase() === 'country' ||
    track.file.trim().toLowerCase().includes('country'),
);
if (!defaultTrack && musicTracks.length > 0) {
  defaultTrack = musicTracks[0];
}

let musicActivated = false;
const setTrackSource = (track) => {
  if (!track?.file) {
    return false;
  }
  const src = `${baseUrl}music/${track.file}`;
  if (musicAudio.src !== src) {
    musicAudio.src = src;
  }
  return true;
};

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

const activateMusic = (track = defaultTrack) => {
  if (!track) {
    return;
  }
  musicActivated = true;
  if (setTrackSource(track)) {
    musicListWindow.setActiveTrack(track);
  }
  tryPlayMusic().catch(() => {});
};

const setupUserGesture = () => {
  const handler = () => {
    if (musicActivated) {
      return;
    }
    activateMusic();
  };
  window.addEventListener('pointerdown', handler, { once: true });
  window.addEventListener('keydown', handler, { once: true });
};

async function init() {
  const [
    { createScene },
    { loadBar },
    { applyLowPoly, applyPS1Style },
    { createMenuHoverModels },
    { createPeopleModels },
    { warmupScene },
  ] = await Promise.all([
    import('./scene.js'),
    import('./models.js'),
    import('./ps1.js'),
    import('./menuHoverModels.js'),
    import('./peopleModels.js'),
    import('./warmup.js'),
  ]);
  const barPromise = loadBar();
  const peoplePromise = createPeopleModels();
  const menuHoverPromise = createMenuHoverModels(null, menuTarget);
  const models = await barPromise;
  applyLowPoly(models.bar, 0.01, 1500);
  applyPS1Style(models.bar);
  const { firstFrame, goToPoint, scene, addUpdate, renderer, camera } = await createScene(app, models);
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
    if (currentPoint !== 'activity') {
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
    musicActivated = true;
    if (musicAudio.src !== src) {
      musicAudio.src = src;
    }
    tryPlayMusic().catch(() => {});
  });
  menuWindow.addEventListener('menu-hover', (event) => {
    if (currentPoint !== 'menu') {
      return;
    }
    menuHoverModels.show(event.detail);
  });
  menuWindow.addEventListener('menu-hover-out', () => menuHoverModels.hide());
  menuWindow.addEventListener('menu-activity-poster', () => activityWindow.open());

  setupUserGesture();

  if (defaultTrack) {
    musicListWindow.setActiveTrack(defaultTrack);
  }

  app.appendChild(menuWindow);
  app.appendChild(menuListWindow);
  app.appendChild(activityWindow);
  app.appendChild(musicListWindow);
  app.appendChild(soundHint);
  soundHint.addEventListener('sound-request', () => {
    activateMusic();
  });
  stopProgress();
  preloader.hide();
}

init().catch(() => {});

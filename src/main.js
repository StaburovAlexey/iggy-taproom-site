import './style.css'
import './components/menu-panel.js'
import './components/app-preloader.js'
import { createScene } from './scene.js'
import { loadingDone } from './loaderTextureAndModel.js'

const app = document.body
const preloader = document.createElement('app-preloader')
document.body.appendChild(preloader)

const { firstFrame } = createScene(app)

Promise.all([loadingDone, firstFrame]).then(() => preloader.hide())

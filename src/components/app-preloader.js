const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at 20% 10%, rgba(27, 31, 42, 0.92), rgba(10, 11, 16, 0.96));
      z-index: 20;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    :host(.hidden) {
      opacity: 0;
      visibility: hidden;
    }

    .panel {
      display: grid;
      gap: 12px;
      min-width: 220px;
      text-align: center;
      font-family: "Fira Sans", "Segoe UI", sans-serif;
      color: #f1f1f2;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 12px;
    }

    .logo {
      width: min(220px, 60vw);
      margin: 0 auto;
      display: block;
      animation: logoPulse 1.6s ease-in-out infinite;
    }

    @keyframes logoPulse {
      0% {
        transform: scale(1);
        opacity: 0.75;
      }
      50% {
        transform: scale(1.04);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.75;
      }
    }

    .bar {
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      width: 0%;
      border-radius: inherit;
      background: linear-gradient(90deg, #ffb14a, #ffd394, #ffb14a);
      transition: width 0.2s ease;
    }

    .value {
      font-size: 11px;
      opacity: 0.8;
    }
  </style>
  <div class="panel">
    <img class="logo" src="${import.meta.env.BASE_URL ?? '/'}logo.png" alt="Iggy bar" />
    <div>Загрузка</div>
    <div class="bar">
      <div class="fill"></div>
    </div>
    <div class="value">0%</div>
  </div>
`

class AppPreloader extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    this.fill = this.shadowRoot.querySelector('.fill')
    this.value = this.shadowRoot.querySelector('.value')
    this.setProgress(0)
  }

  setProgress(progress) {
    const safe = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0
    const percent = Math.round(safe * 100)
    if (this.fill) {
      this.fill.style.width = `${percent}%`
    }
    if (this.value) {
      this.value.textContent = `${percent}%`
    }
  }

  hide() {
    this.classList.add('hidden')
    window.setTimeout(() => this.remove(), 450)
  }
}

customElements.define('app-preloader', AppPreloader)

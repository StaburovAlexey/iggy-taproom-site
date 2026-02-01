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

    .logo-wrap {
      position: relative;
      display: grid;
      place-items: center;
      width: min(240px, 62vw);
      margin: 0 auto;
    }

    .logo-wrap::before {
      content: '';
      position: absolute;
      inset: -10%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 211, 148, 0.65), rgba(255, 177, 74, 0.15), transparent 65%);
      filter: blur(26px);
      opacity: 0.7;
      animation: haloPulse 3.2s ease-in-out infinite;
    }

    ::slotted(.logo) {
      width: 100%;
      display: block;
      animation: logoFloat 2.4s ease-in-out infinite, logoGlow 3.6s ease-in-out infinite, logoJitter 1.2s steps(2, end) infinite;
      height: auto;
      filter: drop-shadow(0 10px 28px rgba(255, 186, 92, 0.25));
      will-change: transform, filter, opacity;
    }

    @keyframes logoFloat {
      0% {
        transform: translateY(0) scale(1) rotate(0deg);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-8px) scale(1.03) rotate(-1deg);
        opacity: 1;
      }
      100% {
        transform: translateY(0) scale(1) rotate(0deg);
        opacity: 0.8;
      }
    }

    @keyframes logoGlow {
      0% {
        filter: drop-shadow(0 10px 28px rgba(255, 186, 92, 0.2));
      }
      50% {
        filter: drop-shadow(0 14px 34px rgba(255, 204, 130, 0.45));
      }
      100% {
        filter: drop-shadow(0 10px 28px rgba(255, 186, 92, 0.2));
      }
    }

    @keyframes logoJitter {
      0% {
        transform: translate3d(0, 0, 0) scale(1);
      }
      12% {
        transform: translate3d(0.6px, -0.4px, 0) scale(1.002);
      }
      24% {
        transform: translate3d(-0.5px, 0.3px, 0) scale(0.999);
      }
      36% {
        transform: translate3d(0.4px, 0.6px, 0) scale(1.001);
      }
      48% {
        transform: translate3d(-0.6px, -0.3px, 0) scale(1);
      }
      60% {
        transform: translate3d(0.3px, -0.6px, 0) scale(1.002);
      }
      72% {
        transform: translate3d(-0.4px, 0.5px, 0) scale(0.999);
      }
      84% {
        transform: translate3d(0.5px, -0.2px, 0) scale(1.001);
      }
      100% {
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes haloPulse {
      0% {
        transform: scale(0.98);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.95;
      }
      100% {
        transform: scale(0.98);
        opacity: 0.6;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .logo-wrap::before,
      ::slotted(.logo) {
        animation: none;
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
    <div class="logo-wrap">
      <slot name="logo"></slot>
    </div>
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

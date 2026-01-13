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

    .bar {
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      width: 35%;
      border-radius: inherit;
      background: linear-gradient(90deg, #ffb14a, #ffd394, #ffb14a);
      animation: loading 1.6s ease-in-out infinite;
    }

    @keyframes loading {
      0% { transform: translateX(-120%); }
      50% { transform: translateX(50%); }
      100% { transform: translateX(220%); }
    }
  </style>
  <div class="panel">
    <div>Загрузка</div>
    <div class="bar">
      <div class="fill"></div>
    </div>
  </div>
`

class AppPreloader extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  hide() {
    this.classList.add('hidden')
    window.setTimeout(() => this.remove(), 450)
  }
}

customElements.define('app-preloader', AppPreloader)

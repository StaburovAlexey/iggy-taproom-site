const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: "Fira Sans", "Segoe UI", sans-serif;
    }

    .panel {
      background: rgba(16, 18, 26, 0.78);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
      min-width: 220px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(14px);
    }

    .title {
      font-size: 14px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
    }

    .headline {
      margin: 8px 0 12px;
      font-size: 20px;
      font-weight: 600;
      color: #f6f4f2;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      padding: 6px 0;
      color: rgba(255, 255, 255, 0.82);
    }

    .badge {
      padding: 2px 10px;
      border-radius: 999px;
      background: rgba(255, 181, 66, 0.18);
      color: #ffcf7a;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  </style>
  <div class="panel">
    <div class="title">Tonight</div>
    <div class="headline">Iggy Bar</div>
    <div class="item">
      <span>Negroni</span>
      <span class="badge">New</span>
    </div>
    <div class="item">
      <span>Live Set</span>
      <span>21:30</span>
    </div>
  </div>
`

class MenuPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }
}

customElements.define('menu-panel', MenuPanel)

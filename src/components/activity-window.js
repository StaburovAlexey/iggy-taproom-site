const baseUrl = import.meta.env.BASE_URL ?? '/';
const activityImage = `${baseUrl}activity.jpg`;
const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-100%, -50%);
      z-index: 13;
      display: none;
      font-family: "Press Start 2P", "VT323", "Fira Sans", "Segoe UI", sans-serif;
      color: #f2efe8;
      text-transform: uppercase;
      pointer-events: none;
      max-height: 90vh;
    }

    :host([data-open]) {
      display: block;
      pointer-events: auto;
    }

    :host([data-compact]) {
      top: 10px;
      left: 50%;
   transform: translate(-55%, 0);
      width: min(90vw, 410px);
      max-height: 70vh;
      padding: 0 10px;
    }

    .panel {
      width: 100%;
      display: grid;
      gap: 12px;
      padding: 16px;
     
      max-height: 90vh;
      border-radius: 6px;
      background:
        linear-gradient(180deg, rgba(19, 24, 36, 0.96), rgba(7, 9, 16, 0.98)),
        repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 3px);
      border: 2px solid rgba(255, 214, 154, 0.5);
      box-shadow:
        0 0 0 2px rgba(5, 7, 12, 0.85),
        0 16px 30px rgba(0, 0, 0, 0.5);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .title {
      font-size: 10px;
      letter-spacing: 0.22em;
      color: rgba(255, 226, 177, 0.8);
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
    }

    .close {
      appearance: none;
      border: 2px solid rgba(255, 214, 154, 0.45);
      background: linear-gradient(180deg, rgba(255, 214, 154, 0.18), rgba(255, 180, 74, 0.08));
      color: inherit;
      font-size: 9px;
      letter-spacing: 0.2em;
      padding: 8px 10px;
      border-radius: 4px;
      cursor: pointer;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.85);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.6),
        0 6px 0 rgba(5, 7, 12, 0.75);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    .close:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 231, 185, 0.7);
    }

    .close:active {
      transform: translateY(3px);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.7),
        0 2px 0 rgba(5, 7, 12, 0.85);
    }

    .activity {
      width: 100%;
      border-radius: 4px;
      border: 1px solid rgba(255, 214, 154, 0.2);
    }

    img {
      width: 100%;
      height: auto;
      max-height: calc(90vh - 130px);
      display: block;
      object-fit: cover;
    }
  </style>
  <div class="panel">
    <div class="header">
      <div class="title">Мероприятия</div>
      <button type="button" class="close" data-close>Закрыть</button>
    </div>
    <div class="activity">
      <img src="${activityImage}" alt="Анонс мероприятия" loading="lazy" />
    </div>
  </div>
`;

class ActivityWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.handleClick = (event) => {
      const closeTarget = event.target.closest('[data-close]');
      if (closeTarget) {
        this.close();
      }
    };
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  open() {
    this.setAttribute('data-open', '');
  }

  close() {
    this.removeAttribute('data-open');
  }
}

customElements.define('activity-window', ActivityWindow);

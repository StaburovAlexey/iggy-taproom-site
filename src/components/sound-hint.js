const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 20;
      display: flex;
      pointer-events: auto;
      font-family: "Press Start 2P", "VT323", "Fira Sans", "Segoe UI", sans-serif;
      text-transform: uppercase;
      color: #f2efe8;
    }

    :host([data-closed]) {
      display: none;
      pointer-events: none;
    }

    .badge {
      display: grid;
      gap: 6px;
      max-width: 240px;
      padding: 12px 16px;
      border-radius: 8px;
      background:
        linear-gradient(180deg, rgba(7, 9, 16, 0.95), rgba(19, 24, 36, 0.85)),
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 2px, transparent 2px 4px);
      border: 2px solid rgba(255, 214, 154, 0.4);
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.65),
        inset 0 0 0 1px rgba(255, 214, 154, 0.25);
    }

    .label {
      font-size: 10px;
      letter-spacing: 0.2em;
      color: rgba(255, 226, 177, 0.8);
    }

    .message {
      font-size: 8px;
      letter-spacing: 0.1em;
    }

    button {
      appearance: none;
      border: 2px solid rgba(255, 214, 154, 0.45);
      background: linear-gradient(180deg, rgba(255, 214, 154, 0.18), rgba(255, 180, 74, 0.08));
      color: inherit;
      font-size: 9px;
      letter-spacing: 0.2em;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.85);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.6),
        0 6px 0 rgba(5, 7, 12, 0.75);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    button:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 231, 185, 0.7);
    }

    button:active {
      transform: translateY(3px);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.7),
        0 2px 0 rgba(5, 7, 12, 0.85);
    }
  </style>
  <div class="badge">
    <div class="label">Звук</div>
    <div class="message">Разрешите проигрывание звука в настройках и нажмите кнопку 'Включить', чтобы атмосфера звучала</div>
    <button type="button" data-action>Включить</button>
  </div>
`;

class SoundHint extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.handleClick = (event) => {
      const action = event.target.closest('[data-action]');
      if (!action) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent('sound-request', {
          bubbles: true,
        }),
      );
    };
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  open() {
    this.removeAttribute('data-closed');
  }

  close() {
    this.setAttribute('data-closed', '');
  }
}

customElements.define('sound-hint', SoundHint);

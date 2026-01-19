const backToMain = {
  id: 'back',
  label: 'Назад',
  target: 'main',
  nextMode: 'main',
};

const actionsByMode = {
  main: [
    { id: 'menu', label: 'Меню', target: 'menu', nextMode: 'menu' },
    { id: 'activity', label: 'Мероприятия', target: 'activity', nextMode: 'activity' },
    { id: 'barmen', label: 'Бармен', target: 'barmen', nextMode: 'barmen' },
  ],
  menu: [
    { id: 'beer', label: 'Пиво', target: 'menu' },
    { id: 'food', label: 'Еда', target: 'menu' },
    { id: 'snacks', label: 'Закуски', target: 'menu' },
    backToMain,
  ],
  activity: [backToMain],
  barmen: [backToMain],
};

const menuListByAction = {
  beer: 'beer',
  food: 'eat',
  snacks: 'snacks',
};

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      left: 65%;
      bottom: 35%;
      z-index: 12;
      font-family: "Press Start 2P", "VT323", "Fira Sans", "Segoe UI", sans-serif;
      color: #f2efe8;
      text-transform: uppercase;
    }

    .panel {
      display: grid;
      gap: 10px;
      padding: 14px;
      min-width: 220px;
      border-radius: 6px;
      background:
        linear-gradient(180deg, rgba(19, 24, 36, 0.96), rgba(7, 9, 16, 0.98)),
        repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 3px);
      border: 2px solid rgba(255, 214, 154, 0.5);
      box-shadow:
        0 0 0 2px rgba(5, 7, 12, 0.85),
        0 12px 24px rgba(0, 0, 0, 0.45);
    }

    .title {
      font-size: 10px;
      letter-spacing: 0.22em;
      color: rgba(255, 226, 177, 0.8);
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
    }

    .actions {
      display: grid;
      gap: 8px;
    }

    button {
      appearance: none;
      border: 2px solid rgba(255, 214, 154, 0.45);
      background: linear-gradient(180deg, rgba(255, 214, 154, 0.18), rgba(255, 180, 74, 0.08));
      color: inherit;
      font-size: 12px;
      letter-spacing: 0.18em;
      padding: 10px 12px;
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
  <div class="panel">
    <div class="title">Навигация</div>
    <div class="actions" data-actions></div>
  </div>
`;

class MenuWindow extends HTMLElement {
  constructor() {
    super();
    this.mode = 'main';
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    );
    this.actionsRoot = this.shadowRoot.querySelector('[data-actions]');
    this.getActionFromEvent = (event) => {
      const button = event.target.closest('button[data-id]');
      if (!button) {
        return null;
      }
      const action = actionsByMode[this.mode].find(
        (item) => item.id === button.dataset.id,
      );
      if (!action) {
        return null;
      }
      return { action, button };
    };
    this.handleClick = (event) => {
      const payload = this.getActionFromEvent(event);
      if (!payload) {
        return;
      }
      const { action } = payload;
      const menuListCategory = menuListByAction[action.id];
      if (menuListCategory) {
        this.dispatchEvent(
          new CustomEvent('menu-list-open', {
            detail: menuListCategory,
            bubbles: true,
          }),
        );
      } else {
        this.dispatchEvent(
          new CustomEvent('menu-list-close', {
            bubbles: true,
          }),
        );
      }
      if (action.nextMode) {
        this.mode = action.nextMode;
        this.renderActions();
      }
      if (action.target) {
        this.dispatchEvent(
          new CustomEvent('navigate', {
            detail: action.target,
            bubbles: true,
          }),
        );
      }
    };
    this.handlePointerOver = (event) => {
      const payload = this.getActionFromEvent(event);
      if (!payload) {
        return;
      }
      const { action } = payload;
      this.dispatchEvent(
        new CustomEvent('menu-hover', {
          detail: action.id,
          bubbles: true,
        }),
      );
    };
    this.handlePointerOut = (event) => {
      const payload = this.getActionFromEvent(event);
      if (!payload) {
        return;
      }
      const { action, button } = payload;
      const related = event.relatedTarget;
      if (related && button.contains(related)) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent('menu-hover-out', {
          detail: action.id,
          bubbles: true,
        }),
      );
    };
  }

  connectedCallback() {
    this.renderActions();
    this.shadowRoot.addEventListener('click', this.handleClick);
    this.shadowRoot.addEventListener('pointerover', this.handlePointerOver);
    this.shadowRoot.addEventListener('pointerout', this.handlePointerOut);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
    this.shadowRoot.removeEventListener('pointerover', this.handlePointerOver);
    this.shadowRoot.removeEventListener('pointerout', this.handlePointerOut);
  }

  renderActions() {
    const actions = actionsByMode[this.mode];
    this.actionsRoot.innerHTML = actions
      .map(
        (action) =>
          `<button type="button" data-id="${action.id}">${action.label}</button>`,
      )
      .join('');
  }
}

customElements.define('menu-window', MenuWindow);

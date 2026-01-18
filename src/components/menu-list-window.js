const menuData = {
  beer: {
    title: 'Пиво',
    items: [
      { name: 'Iggy Lager', desc: '0.5 л', price: '220 ₽' },
      { name: 'Northern Ale', desc: '0.4 л', price: '240 ₽' },
      { name: 'Dark Porter', desc: '0.33 л', price: '260 ₽' },
      { name: 'Wheat Sun', desc: '0.4 л', price: '230 ₽' },
    ],
  },
  eat: {
    title: 'Еда',
    items: [
      { name: 'Бургер Iggy', desc: 'говядина, сыр, соус', price: '420 ₽' },
      { name: 'Куриный ролл', desc: 'соус терияки', price: '340 ₽' },
      { name: 'Салат гриль', desc: 'овощи, фета', price: '310 ₽' },
      { name: 'Паста днём', desc: 'сливочный соус', price: '360 ₽' },
    ],
  },
  snacks: {
    title: 'Закуски',
    items: [
      { name: 'Картофель фри', desc: 'соус на выбор', price: '190 ₽' },
      { name: 'Начиос', desc: 'сырный дип', price: '210 ₽' },
      { name: 'Сырные палочки', desc: '6 шт', price: '250 ₽' },
      { name: 'Куриные крылья', desc: 'острый BBQ', price: '320 ₽' },
    ],
  },
};

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      left: 65%;
      bottom: 8%;
      z-index: 13;
      display: none;
      font-family: "Press Start 2P", "VT323", "Fira Sans", "Segoe UI", sans-serif;
      color: #f2efe8;
      text-transform: uppercase;
    }

    :host([data-open]) {
      display: block;
    }

    .panel {
      display: grid;
      gap: 12px;
      padding: 16px;
      min-width: 280px;
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

    .list {
      display: grid;
      gap: 10px;
    }

    .item {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      padding: 8px 10px;
      border: 1px solid rgba(255, 214, 154, 0.2);
      border-radius: 4px;
      background: rgba(5, 7, 12, 0.5);
    }

    .name {
      font-size: 11px;
      letter-spacing: 0.1em;
    }

    .desc {
      margin-top: 6px;
      font-size: 9px;
      letter-spacing: 0.12em;
      color: rgba(255, 226, 177, 0.6);
    }

    .price {
      font-size: 11px;
      letter-spacing: 0.12em;
      color: #ffcf7a;
      white-space: nowrap;
    }
  </style>
  <div class="panel">
    <div class="header">
      <div class="title" data-title>Меню</div>
      <button type="button" class="close" data-close>Назад</button>
    </div>
    <div class="list" data-list></div>
  </div>
`;

class MenuListWindow extends HTMLElement {
  constructor() {
    super();
    this.category = null;
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    );
    this.titleRoot = this.shadowRoot.querySelector('[data-title]');
    this.listRoot = this.shadowRoot.querySelector('[data-list]');
    this.handleClick = (event) => {
      const closeButton = event.target.closest('[data-close]');
      if (closeButton) {
        this.close();
      }
    };
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  open(category) {
    if (!menuData[category]) {
      return;
    }
    this.category = category;
    this.setAttribute('data-open', '');
    this.render();
  }

  close() {
    this.category = null;
    this.removeAttribute('data-open');
  }

  render() {
    const data = this.category ? menuData[this.category] : null;
    if (!data) {
      this.titleRoot.textContent = 'Меню';
      this.listRoot.innerHTML = '';
      return;
    }
    this.titleRoot.textContent = data.title;
    this.listRoot.innerHTML = data.items
      .map(
        (item) => `
          <div class="item">
            <div>
              <div class="name">${item.name}</div>
              <div class="desc">${item.desc}</div>
            </div>
            <div class="price">${item.price}</div>
          </div>
        `,
      )
      .join('');
  }
}

customElements.define('menu-list-window', MenuListWindow);

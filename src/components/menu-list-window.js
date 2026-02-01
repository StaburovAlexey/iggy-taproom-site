const menuData = {
  beer: {
    title: 'Пиво',
    items: [
      {
        name: 'Oktoberfestbier (Oka River)',
        desc: 'doppelbock - 7.5% - 0.4л',
        price: '370р',
      },
      {
        name: 'Red Shamrock (Oka River)',
        desc: 'red ale - 6% - 0.4л',
        price: '340р',
      },
      {
        name: 'Weisse (Oka River)',
        desc: 'weisse - 5% - 0.5л',
        price: '300р',
      },
      {
        name: 'Мещерский зубр (Oka River)',
        desc: 'blonde ale - 7.5% - 0.3л',
        price: '340р',
      },
      {
        name: 'Pilsner (Oka River)',
        desc: 'pils - 5% - 0.5л',
        price: '300р',
      },
      {
        name: 'Helles (Oka River)',
        desc: 'lager - 5% - 0.5л',
        price: '300р',
      },
      {
        name: 'Latte Nero (Oka River)',
        desc: 'stout - 6% - 0.4л',
        price: '330р',
      },
      {
        name: 'Iggy Hop (Oka River)',
        desc: 'IPA - 6% - 0.4л',
        price: '340р',
      },
    ],
  },
  eat: {
    title: 'Еда',
    items: [
      {
        name: 'БУРГЕР BEEF&JAM',
        desc: '(Котлета из мраморной говядины, луковый конфитюр, маринованные огурцы, кленовый майонез, соус дорблю)',
        price: '330г/560р',
      },
      {
        name: 'БУРГЕР BASIC',
        desc: '(Котлета из мраморной говядины, чеддер, маринованные огурцы, лук, соус)',
        price: '330г/530р',
      },
      {
        name: 'БУРГЕР THAI CHICKEN',
        desc: '(Куриная грудка темпура, лук фри, салат айсберг, сладкий соус чили, соус таратор, кинза)',
        price: '320г/480р',
      },
      {
        name: 'БУРГЕР KIMCHEESE',
        desc: '(Котлета из мраморной говядины, чеддер, капуста кимчи, маринованный огурец, лук, соус)',
        price: '340г/510р',
      },
      {
        name: 'ХОТ-ДОГ NYC',
        desc: '(Колбаска свино-говяжья, маринованные огурцы, кетчуп, горчица, лук фри)',
        price: '290г/410р',
      },
      {
        name: 'ХОТ-ДОГ SEATTLE STYLE',
        desc: '(Колбаска свино-говяжья, сливочный сыр, обжаренный лук, кетчуп, халапеньо)',
        price: '300г/410р',
      },
      {
        name: 'КАПУСТА КИМЧИ',
        desc: '(Пекинская капуста, маринованная в пасте кимчи, соевом соусе и кунжутном масле)',
        price: '200г/220р',
      },
      {
        name: 'КОУЛСЛО',
        desc: '(Капуста, морковь, кукуруза, соус)',
        price: '150г/220р',
      },
      {
        name: "Mac'n Cheese",
        desc: '(Паста, сырный соус, пармезан, лук фри, сухари панко)',
        price: '350г/320р',
      },
      {
        name: "Mac'n Cheese Bacon",
        desc: '(Паста, сырный соус, пармезан, бекон, лук фри, сухари панко)',
        price: '380г/360р',
      },
      {
        name: 'КАРТОФЕЛЬ ФРИ',
        desc: '(Картофель, соус тартар)',
        price: '220г/270р',
      },
      {
        name: 'КАРТОФЕЛЬ ПО-ДЕРЕВЕНСКИ',
        desc: '(Картофель, соус тартар)',
        price: '220г/290р',
      },
      {
        name: 'СЫРНЫЕ ПАЛОЧКИ',
        desc: '(Сырные палочки, соус брусника-бадьян)',
        price: '200г/450р',
      },
      {
        name: 'КУРИНЫЕ КРЫЛЬЯ',
        desc: '(Куриные крылья в панировке, соус сальса)',
        price: '280г/380р',
      },
      {
        name: 'МАРИНОВАННОЕ ЯЙЦО',
        desc: '(Свекла/маринованные огурцы/соево-коричный)',
        price: '70р/шт',
      },
    ],
  },
  snacks: {
    title: 'Закуски',
    items: [
      {
        name: 'АРАХИС НЕОЧИЩЕННЫЙ',
        desc: '(100 гр)',
        price: '200 р',
      },
      {
        name: 'ФИСТАШКИ ЖАРЕНЫЕ',
        desc: '(100 гр)',
        price: '350 р',
      },
      {
        name: 'ОЛИВКИ',
        desc: '(100 гр)',
        price: '280 р',
      },
      {
        name: 'МИНИ-САЛЯМИ',
        desc: '(100 гр)',
        price: '300 р',
      },
      {
        name: 'НАЧОС',
        desc: '(150/50 гр)',
        price: '350 р',
      },
      {
        name: 'МАРИНОВАННОЕ ЯЙЦО',
        desc: '(1 шт)',
        price: '70 р',
      },
      {
        name: 'ДЖЕРКИ',
        desc: '(50 гр)',
        price: '350 р',
      },
      {
        name: 'НАЧОС С ЧИЛИ КОН КАРНЕ',
        desc: '(75/280 гр)',
        price: '520 р',
      },
      {
        name: 'МЯСНАЯ ТАРЕЛКА',
        desc: '(гриссини, коппа, утиная грудка, брауншвейская, чоризо, оливки)',
        price: '850 р',
      },
      {
        name: 'ГРИССИНИ',
        desc: '(70 гр)',
        price: '200 р',
      },
    ],
  },
};

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
    }

    :host([data-open]) {
      display: block;
    }

    :host([data-compact]) {
      transform: translate(-50%, -50%);
    }

    :host([data-compact]) {
      top: 10px;
      transform: translate(-50%, 0);
      height: 30vh;
    }

    :host([data-compact]) .panel {
      height: 100%;
    }

    .panel {
      display: grid;
      gap: 12px;
      padding: 16px;
      min-width: 280px;
      max-height: 90vh;
      grid-template-rows: auto 1fr;
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
      overflow: auto;
      padding-right: 6px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 207, 122, 0.7) rgba(5, 7, 12, 0.55);
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

    .list::-webkit-scrollbar {
      width: 8px;
    }

    .list::-webkit-scrollbar-track {
      background: rgba(5, 7, 12, 0.55);
      border-radius: 10px;
      box-shadow: inset 0 0 0 1px rgba(255, 214, 154, 0.2);
    }

    .list::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(255, 231, 185, 0.85), rgba(255, 180, 74, 0.6));
      border-radius: 10px;
      border: 1px solid rgba(255, 214, 154, 0.4);
      box-shadow: inset 0 0 0 1px rgba(5, 7, 12, 0.35);
    }

    .list::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, rgba(255, 231, 185, 1), rgba(255, 180, 74, 0.8));
    }
  </style>
  <div class="panel">
    <div class="header">
      <div class="title" data-title>Меню</div>
      <button type="button" class="close" data-close>Закрыть</button>
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
      this.titleRoot.textContent = 'РњРµРЅСЋ';
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

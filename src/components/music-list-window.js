import { musicTracks } from '../data/musicList.js';

const baseUrl = import.meta.env.BASE_URL ?? '/';
const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-120%, -50%);
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

    .status {
      font-size: 9px;
      letter-spacing: 0.18em;
      color: rgba(255, 226, 177, 0.7);
    }

    .status span {
      color: #ffcf7a;
    }

    .list {
      display: grid;
      gap: 8px;
      max-height: 60vh;
      overflow: auto;
      padding-right: 6px;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px;
      border: 1px solid rgba(255, 214, 154, 0.2);
      border-radius: 4px;
      background: rgba(5, 7, 12, 0.5);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .item.active {
      border-color: rgba(255, 214, 154, 0.9);
      box-shadow: 0 0 0 1px rgba(255, 214, 154, 0.4);
    }

    .name {
      font-size: 11px;
      letter-spacing: 0.1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .select {
      appearance: none;
      border: 2px solid rgba(255, 214, 154, 0.45);
      background: linear-gradient(180deg, rgba(255, 214, 154, 0.18), rgba(255, 180, 74, 0.08));
      color: inherit;
      font-size: 9px;
      letter-spacing: 0.2em;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.85);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.6),
        0 6px 0 rgba(5, 7, 12, 0.75);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    .select:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 231, 185, 0.7);
    }

    .select:active {
      transform: translateY(3px);
      box-shadow:
        inset 0 0 0 2px rgba(5, 7, 12, 0.7),
        0 2px 0 rgba(5, 7, 12, 0.85);
    }
  </style>
  <div class="panel">
    <div class="header">
      <div class="title">Музыка</div>
      <button type="button" class="close" data-close>Назад</button>
    </div>
    <div class="status">Сейчас играет: <span data-now>—</span></div>
    <div class="list" data-list></div>
  </div>
`;

class MusicListWindow extends HTMLElement {
  constructor() {
    super();
    this.currentTrack = null;
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.listRoot = this.shadowRoot.querySelector('[data-list]');
    this.statusRoot = this.shadowRoot.querySelector('[data-now]');
    this.handleClick = (event) => {
      const closeTarget = event.target.closest('[data-close]');
      if (closeTarget) {
        this.close();
        return;
      }
      const selectTarget = event.target.closest('[data-select]');
      if (!selectTarget) {
        return;
      }
      const file = selectTarget.dataset.file;
      if (!file) {
        return;
      }
      const title = selectTarget.dataset.title ?? '';
      this.dispatchEvent(
        new CustomEvent('music-select', {
          detail: {
            title,
            src: `${baseUrl}music/${file}`,
          },
          bubbles: true,
        }),
      );
      this.setActiveTrack({ title, file });
    };
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  render() {
    const activeFile = this.currentTrack?.file;
    const nowText = this.currentTrack?.title ?? '—';
    if (this.statusRoot) {
      this.statusRoot.textContent = nowText;
    }
    if (this.listRoot) {
      this.listRoot.innerHTML = musicTracks
        .map((track) => {
          const isActive = track.file === activeFile;
          return `
            <div class="item${isActive ? ' active' : ''}">
              <div class="name">${track.title}</div>
              <button type="button" class="select" data-select data-file="${track.file}" data-title="${track.title}">
                ${isActive ? 'Играет' : 'Выбрать'}
              </button>
            </div>
          `;
        })
        .join('');
    }
  }

  setActiveTrack(track) {
    this.currentTrack = track ? { ...track } : null;
    this.render();
  }

  open() {
    this.render();
    this.setAttribute('data-open', '');
  }

  close() {
    this.removeAttribute('data-open');
  }
}

customElements.define('music-list-window', MusicListWindow);

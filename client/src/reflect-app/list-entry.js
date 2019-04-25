import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
const md = window.markdownit().use(window.markdownitEmoji);
// add twemojis
// (attribution req.)
md.renderer.rules.emoji = (token, idx) => {
  return twemoji.parse(token[idx].content);
};
// -> also https://github.com/commonmark/commonmark.js looks kinda nice,
//    used by https://github.com/intcreator/markdown-element

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
      padding: 5px 15px 5px 15px;
    }
    :host(.private) {
      background-color: var(--bg-private);
      color: var(--text-private);
    }
    :host(.private) a {
      color: var(--link-private);
    }
    .listentry-header {
      /*font-size: 0.8em;*/
      color: var(--text-inactive);
    }
    .listentry-body {
      /*overflow: hidden;*/
      box-sizing: border-box;
      margin: 0 15px 5px 15px;
      padding: 0 50px 5px 50px;
      border-left: 1px solid var(--text-inactive);
      /*font-size: 18px;*/
      line-height: 1.5em;
    }
    .emoji {
      height: 1.5em;
      vertical-align: middle;
    }
    .private-icon {
      vertical-align: middle;
      /*float: right;*/
    }
    a {
      color: var(--link-text);
    }
  </style>
`;

class ListEntry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    //this.get_entries();
  }
  get entry() {
    return this._entry;
  }
  set entry(entry) {
    this._entry = entry;
    this.state_update();
  }
  state_update() {
    if (!this.entry.public) {
      this.shadowRoot.host.classList.add('private');
    }
    this.update();
  }
  update() {
    //<div >
    //</div>
    render(html`${style}
      ${ this.entry.public ? html`` : html`<img class="private-icon" src="layout/icons/private_32.png">` }
      <small class="listentry-header">${this.entry.timestamp}
        <a href="#entry?id=${this.entry.id}">#entry?id=${this.entry.id}</a>
      </small>
      <div class="listentry-body">${unsafeHTML(md.render(this.entry.content.text))}</div>
      `, this.shadowRoot);
  }
}

customElements.define('list-entry', ListEntry);

import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { entries_url } from './urls.js';
import { api_req_get } from './api_request_helpers.js';
import auth from './auth.js';
import './list-entry.js';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
    }
    #entries-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  </style>
`;

class ListedEntries extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    //this.get_entries();
  }
  get url_state_obj() {
    return this._url_state_obj;
  }
  set url_state_obj(url_state_obj) {
    this._url_state_obj = url_state_obj;
    this.state_update();
  }
  async state_update() {
    //console.log("entries comp., state update");
    //console.log(this.url_state_obj.params_str);
    this.entries_obj = await api_req_get(entries_url + '?' + this.url_state_obj.params_str,
      auth.get_auth_header());
    this.update();
  }
  update() {
    //console.log(this.entries_obj.entries);
    render(html`${style}
      <ul id="entries-list">${repeat(this.entries_obj.entries, entry => entry.id, entry => html`
        <li><list-entry .entry=${entry}></list-entry></li>`)}
      </ul>`, this.shadowRoot);
  }
}

customElements.define('listed-entries', ListedEntries);

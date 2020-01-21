import { html, css, LitElement } from 'lit-element';

export class PageMain extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        text-align: center;
        position: relative;
        top: -53%;
        left: 14%;
        width: 109px;
        height: 80px;
        z-index: 2;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      logo: { type: Function },
    };
  }

  constructor() {
    super();
    this.logo = html``;
  }

  render() {
    return html`
      ${this.logo}
    `;
  }
}

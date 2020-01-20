import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { openWcLogo } from './open-wc-logo.js';

import '../../page-main/page-main.js';
import '../../page-one/page-one.js';
import { templateAbout } from './templateAbout.js';
import '../../../node_modules/webview-tile-header/webview-tile-header';

export class OpenWc extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      connectState: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
      }

      header {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #ccc;
      }

      header ul {
        display: flex;
        justify-content: space-around;
        min-width: 400px;
        margin: 0 auto;
        padding: 0;
      }

      header ul li {
        display: flex;
      }

      header ul li a {
        color: #5a5c5e;
        text-decoration: none;
        font-size: 18px;
        line-height: 36px;
      }

      header ul li a:hover,
      header ul li a.active {
        color: blue;
      }

      // main {
      //   flex-grow: 1;
        
      // }


      .main-screen {

        width: 100%;
        height: 100%;
        background-color: #3A3A3A;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1; }
        .main-screen .button-connect {
          order: 3;
          width: 328px;
          height: 56px;
          border-radius: 5px;
          font-size: 20px;
          font-weight: 400;
          color: #FFFFFF;
          background-color: #4BC3DA;
          margin: auto;
          margin-bottom: 5%; }
      
      .main-screen .text {
        order: 2;
        color: #ffffff;
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        margin-top: 53%;
        margin-left: 15%;
        margin-right: 15%;
        text-align: center; }
        body.platform-android .main-screen .text {
          margin-top: 43%; }
    `;
  }

  constructor() {
    super();
    this.page = 'main';
    this.connectState = true;
  }


  render() {
    return html`
      <header>
        <ul>
          <li>
            <a href="#main" class=${this.__navClass('main')} @click=${this.__onNavClicked}>
              Main
            </a>
          </li>
          <li>
            <a href="#pageOne" class=${this.__navClass('pageOne')} @click=${this.__onNavClicked}>
              Page One
            </a>
          </li>
          <li>
            <a href="#about" class=${this.__navClass('about')} @click=${this.__onNavClicked}>
              About
            </a>
          </li>
        </ul>
        <moduware-header 
          title="USB Flash"
          @back-button-click=${() => this._backButtonClickHandler()}
        >
        </moduware-header>
        
      </header>

      <main>
          <div id="main-screen" class="main-screen mdl-layout mdl-js-layout mdl-layout--fixed-header">
              ${this._renderPage()}
              <div class="text" id="text">Connect to module and explore files with Android File Manager</div>
              ${this.connectState ?
                html`<button class="button-connect mdl-button--raised" id="button-connect" @click=${() => this._Connect()}>Connect</button>` :
                html`<button class="button-connect mdl-button--raised" id="button-disconnect" @click=${() => this._Disconnect()}>Disconnect</button>`}
          </div>
      </main>

    `;
  }

  _renderPage() {
    return html`
          <page-main .logo=${openWcLogo}></page-main>
        `
  }

  __navClass(page) {
    return classMap({ active: this.page === page });
  }

  _backButtonClickHandler(e) {
    Moduware.v0.API.Exit();
  }

  _Connect() {
    alert("Connecting")
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', [1]);
    this.connectState = false;
  }
  _Disconnect() {
    alert("Disconnecting")
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', [1]);
    this.connectState = true;
  }
}

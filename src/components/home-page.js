/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { navigate } from '../actions/app.js';
import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { SharedStyles, PageStyles } from './shared-styles.js';
import app from '../reducers/app.js';
import './icons.js';
import { registerTranslateConfig, use, translate, get } from "@appnest/lit-translate";
import * as translation from '../translations/language.js';
import { caseModule, connectedSymbol } from './icons.js';

class HomePage extends connect(store)(PageViewElement) {

	static get properties() {
		return {
			_page: { type: String },
			_language: { type: String }
		};
	}

	static get styles() {
		return [
			// SharedStyles,
			PageStyles,
			css`
        /* #wrapper {
					overflow: hidden;
					position: absolute;
					top: 40px; right: 0;
					width: 100%;
					height: calc(100% - 40px);
				}

				body.platform-android #wrapper {
					top: 55px;
					height: calc(100% - 55px)
				} */

				#wrapper {
					height: 100%;
				}

				.page--main {
					position: absolute;
					top: 0; left: 0;
					width: 100%; height: 100%;
					background-color: #3A3A3A;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					/* z-index: 1; */
				}

				h1 {
					color: white;
					padding-top: 60px;

				}

				.page--main .svg-container {
					/* order: 1; */
					position: relative;
					top: 25%; left: 28%;
					width: 200px;
					height: 250px;
				}

				.page--main .svg-case-module {
					position: relative;
					top: 0; left: 0;
					/* background-image: url('/images/case-module.svg'); */
					width: 159px;
					height: 197px;
					z-index: 1;
				}

				/* .page--main .svg-disconnected {
					position: relative;
					top: -53%; left: 14%;
					background-image: url('../images/disconnected.svg');
					width: 108px;
					height: 129px;
					z-index: 2;
				} */

				.page--main .svg-connected {
					position: relative;
					top: -53%; left: 14%;
					/* background-image: url('/images/connected.svg'); */
					width: 109px;
					height: 129px;
					z-index: 2;
				}

				.page--main .text {
					/* order: 2; */
					color: #ffffff;
					font-size: 13px;
					font-weight: 400;
					line-height: 16px;
					margin-top: 53%;
					margin-left: 15%;
					margin-right: 15%; 
					text-align: center;
				}

				.page--main .button-connect {
					/* order: 3; */
					width: 328px;
					height: 56px;
					border-radius: 5px;
					font-size: 20px;
					font-weight: 400;
					color: #FFFFFF;
					background-color: #4BC3DA;
					margin: auto;
					margin-bottom: 5%;
				}

				.mdl-button--raised {
					background: rgba(158,158,158,.2);
					box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px rgba(0,0,0,.12);
				}

				/* .mdl-button--raised:active {
					box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
					background-color: rgba(158,158,158,.4);
				} */

				/* .mdl-button--raised:focus:not(:active) {
					box-shadow: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);
					background-color: rgba(158,158,158,.4);
				} */
      `
		];
	}

	updated(changedProperties) {
		if (changedProperties.has('_language')) {
			use(this._language);
		}
	}

	async connectedCallback() {
		registerTranslateConfig({
			loader: (lang) => Promise.resolve(translation[lang])
		});

		super.connectedCallback();
	}

	render() {
		return html`
      <div id="wrapper" class="wrapper">
      
				<div id="pageMain" class="page page--main">
					
					<div class="svg-container">
						<div id="svg-case-module" class="svg-case-module">${caseModule}</div>
						<div id="svg-disconnected" class="svg-disconnected"></div>
						<div id="svg-connected" class="svg-connected">${connectedSymbol}</div>
					</div>
					<div class="text" id="text">Connect to module and explore files with Android File Manager</div>
					<button class="button-connect mdl-button--raised" id="button-connect">Connect</button>
					<!-- <button class="button-connect mdl-button--raised hidden" id="button-disconnect">Disconnect</button> -->
					<!-- <button class="button-file-manager mdl-button--raised hidden" id="button-file-manager">Open File Manager</button> -->
				</div>

			</div>
    `;
	}

	stateChanged(state) {
		this._page = state.app.page;
		this._language = state.app.language;
	}

}

window.customElements.define('home-page', HomePage);

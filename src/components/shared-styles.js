/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from 'lit-element';

export const SharedStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    /* padding: 24px;
    background: var(--app-section-odd-color); */
    background-color: #3A3A3A;
    height: 100vh;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

`;

export const PageStyles = css`
  .page {
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
    padding: 15px;
    padding-top: var(--app-pages-padding-top);
  }  
`;



// #wrapper could be the morph-pages
// #wrapper {
//   overflow: hidden;
//   position: absolute;
//   top: 40px; right: 0;
//   width: 100 %;
//   height: calc(100 % - 40px);
// }

// body.platform - android #wrapper {
//   top: 55px;
//   height: calc(100 % - 55px)
// }
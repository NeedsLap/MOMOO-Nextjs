'use client';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  :root {
    --primary-color:#121212;
    --background-color:#F8F8F8;

    --point-light-100:#ddedf0;
    --point-color:#A9D3D9;
    --point-dark-100:#6eb7c0;
    --point-dark-200:#249ca7;
    --point-dark-300:#008893;
    --point-dark-400:#00757e;
    --point-dark-500:#006a71;
    --point-dark-600:#005b61;
    --point-dark-700:#004c51;
    --point-dark-800:#003233;

    --gray-100:#EBEBEB;
    --gray-200:#D2D2D2;
    --gray-300:#B8B8B8;
    --gray-400:#9F9F9F;
    --gray-500:#858585;
    --gray-600:#6C6C6C;
    --gray-700:#525252;
    --gray-800:#393939;
    --gray-900:#1F1F1F;

    --error-color: #DE3F35;

    --serif : var(--font-prata), serif;
    --title-font-family : var(--font-prata), var(--font-noto-sans), sans-serif;

    font-size: 62.5%;
    --title-xl: 5rem;
    --title-l: 3.2rem;
    --title-m: 2.4rem;
    --title-s: 2rem;
    --text-l: 1.6rem;
    --text-m: 1.4rem;
    --text-s: 1.2rem;

    --nav-width-pc: 256px;
    --nav-height-tablet: 80px;
    --nav-height-mobile: 48px;

    --right-padding-pc: 216px;
    --padding-top-pc: 100px;

    --column-pc : calc((100vw - var(--nav-width-pc) - 190px - var(--margin-pc) * 2 - var(--gutter-pc) * 11) / 12);
    --gutter-pc: 16px;
    --margin-pc: 28px;

    --column-tablet : calc((100vw - var(--margin-tablet) * 2 - var(--gutter-tablet) * 7) / 8);
    --gutter-tablet: 16px;
    --margin-tablet: 24px;

    --margin-mobile: 16px;

    background: var(--background-color);

    --toastify-toast-min-height: 44px;
    --toastify-toast-bottom: 0px;
    --toastify-toast-width: 100%;
    --toastify-toast-bd-radius: 0px;
    --toastify-text-color-light: white;
    --toastify-color-light: rgba(0, 0, 0, 0.9);
    --toastify-font-family: inherit;
  }

  /* #root {
    min-height: 100vh;
  }

  @media (min-width: 1025px) {
    #root {
      display: flex;
    }
  } */

  body {
    color: inherit;
    font-family: var(--font-noto-sans), sans-serif;
    line-height: 1.5;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: var(--font-noto-sans), sans-serif;
    padding: 0;
    border: none;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  dialog {
    padding: 0;
    border: none;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export default GlobalStyle;

// CSS imports
import '../styles/styles.css';
import feather from 'feather-icons';
import { stopCamera } from './utils/mediaStream.js';
import { highlightActiveNav } from './utils/index.js';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
  highlightActiveNav();
  feather.replace();
  
  window.addEventListener('hashchange', async () => {
    try {
      const video = document.querySelector('#video');
      stopCamera(video);
    } catch (error) {}
    await app.renderPage();
    highlightActiveNav();
    feather.replace();
  });
});

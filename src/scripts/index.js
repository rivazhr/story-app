import '../styles/styles.css';
import { stopCamera } from './utils/mediaStream.js';
import { highlightActiveNav, toggleHeaderVisibility, changeTitle } from './utils/index.js';
import { getActivePathname } from './routes/url-parser.js';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  const skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      const href = skipLink.getAttribute('href');
      if (href === '#main-content') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.setAttribute('tabindex', '-1'); 
          target.focus();
        }
      }
    });
  }

  changeTitle(getActivePathname());
  toggleHeaderVisibility();
  highlightActiveNav();

  window.addEventListener('hashchange', async () => {
    try {
      const video = document.querySelector('#video');
      stopCamera(video);
    } catch (error) {}
    
    await app.renderPage();
    changeTitle(getActivePathname());
    toggleHeaderVisibility();
    highlightActiveNav();
  });
});
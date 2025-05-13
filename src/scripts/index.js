import '../styles/styles.css';
import { stopCamera } from './utils/mediaStream.js';
import { highlightActiveNav, toggleHeaderVisibility, changeTitle } from './utils/index.js';
import { getActivePathname, getActiveRoute } from './routes/url-parser.js';

import App from './pages/app';
import { registerServiceWorker } from './utils';
import { isLoggedIn } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  if (!isLoggedIn() && getActiveRoute() !== '/register' && getActiveRoute() !== '/404') {
    location.hash = '#/login';
  } else if (isLoggedIn() && (getActiveRoute() === '/login' || getActiveRoute() === '/register')) {
    location.hash = '#/';
  }

  await app.renderPage();
  await registerServiceWorker();

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

    if (!isLoggedIn() && getActiveRoute() !== '/register' && getActiveRoute() !== '/404') {
      location.hash = '#/login';
    } else if (isLoggedIn() && (getActiveRoute() === '/login' || getActiveRoute() === '/register')) {
      location.hash = '#/';
    }  
    
    await app.renderPage();
    changeTitle(getActivePathname());
    toggleHeaderVisibility();
    highlightActiveNav();
  });
});
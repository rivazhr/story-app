import '../styles/styles.css';
import feather from 'feather-icons';
import { stopCamera } from './utils/mediaStream.js';
import { highlightActiveNav, toggleHeaderVisibility } from './utils/index.js';
import { getActivePathname } from './routes/url-parser.js';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
  toggleHeaderVisibility();
  highlightActiveNav();
  feather.replace();

  const currentPath = getActivePathname();
  if (currentPath !== '/login' || currentPath !== '/register') {
    try {
      document.getElementById('logout-button').addEventListener('click', (event) => {
        localStorage.removeItem('token');
        window.location.hash = '#/login'; 
      });
    } catch (error) {}
  }
  
  window.addEventListener('hashchange', async () => {
    try {
      const video = document.querySelector('#video');
      stopCamera(video);
    } catch (error) {}
    await app.renderPage();
    toggleHeaderVisibility();
    highlightActiveNav();
    feather.replace();
  });
});



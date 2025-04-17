import '../styles/styles.css';
import feather from 'feather-icons';
import { stopCamera } from './utils/mediaStream.js';
import { highlightActiveNav } from './utils/index.js';
import MapPresenter from './pages/map/MapPresenter.js';

import App from './pages/app';
import { getActiveRoute } from './routes/url-parser.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
  highlightActiveNav();
  feather.replace();

  const currentPath = window.location.hash;
  if (currentPath !== '#/login' || currentPath !== '#/register') {
    try {
      document.getElementById('logout-button').addEventListener('click', (event) => {
        localStorage.removeItem('token');
        window.location.hash = '#/login'; 
      });
    } catch (error) {}
  }

  try {
    document.getElementById('logout-button').addEventListener('click', (event) => {
      localStorage.removeItem('token');
      window.location.hash = '#/login';
    });
  } catch (error) {}
  
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



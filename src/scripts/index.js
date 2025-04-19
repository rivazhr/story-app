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
  toggleHeaderVisibility();
  highlightActiveNav();

  const currentPath = getActivePathname();
  if (currentPath == '/login' || currentPath == '/register') {
    document.body.classList.add('auth-page');
  } else {
    document.body.classList.remove('auth-page');
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
    changeTitle(getActivePathname());
    toggleHeaderVisibility();
    highlightActiveNav();
    
    const currentPath = getActivePathname();
    if (currentPath == '/login' || currentPath == '/register') {
      document.body.classList.add('auth-page');
    } else {
      document.body.classList.remove('auth-page');
      try {
        document.getElementById('logout-button').addEventListener('click', (event) => {
          localStorage.removeItem('token');
          window.location.hash = '#/login'; 
        });
      } catch (error) {}
    }
  });
});



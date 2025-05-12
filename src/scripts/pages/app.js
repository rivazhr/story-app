import routes from '../routes/routes';
import { getActivePathname, getActiveRoute } from '../routes/url-parser';
import feather from 'feather-icons';
import { isServiceWorkerAvailable, toggleNavigation } from '../utils'
import { isCurrentPushSubscriptionAvailable, subscribe, unsubscribe } from '../utils/notification-helper';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #currentPath = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#currentPath = getActivePathname();

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      })

      const logoutButton = this.#navigationDrawer.querySelector('#logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
          event.preventDefault();
          localStorage.removeItem('loginSession');
          window.location.hash = '/login';
        });
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      feather.replace();
      return;
    }

    const transition = document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      feather.replace();
    });


    transition.finished.then(() => {
      this.#currentPath = getActivePathname();

      if (this.#currentPath == '/login' || this.#currentPath == '/register') {
        document.body.classList.add('auth-page');
      } else {
        document.body.classList.remove('auth-page');
        try {
          document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.removeItem('loginSession');
            window.location.hash = '#/login'; 
          });
        } catch (error) {}
      }
    });

    transition.updateCallbackDone.then(() => {
      if(isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById('push-notification-tools');
    pushNotificationTools.innerHTML = `
      <button id="subscribe-button" class="btn btn-secondary filled">
        Subscribe
        <i data-feather="bell"></i>
      </button>
    `

    feather.replace();
    const isSubscribed = await isCurrentPushSubscriptionAvailable();

    if (isSubscribed) {
      pushNotificationTools.innerHTML = `
        <button id="unsubscribe-button" class="btn btn-secondary filled">
          Unsubscribe
          <i data-feather="bell-off"></i>
        </button>
      `;

      feather.replace();

      document.getElementById('unsubscribe-button').addEventListener('click', () => {
        unsubscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
      return;
    }

    document.getElementById('subscribe-button').addEventListener('click', () => {
      subscribe().finally(() => {
        this.#setupPushNotification();
      });
    });
  }
}

export default App;

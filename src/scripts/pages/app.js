import routes from '../routes/routes';
import { getActivePathname, getActiveRoute } from '../routes/url-parser';
import feather from 'feather-icons';

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
      this.#content.classList.add('move-out');
      await new Promise((resolve) => setTimeout(resolve, 150)); 

      this.#content.innerHTML = await page.render();
      await page.afterRender();
      feather.replace();

      this.#content.classList.remove('move-out');
      this.#content.classList.add('move-in');
    });


    transition.finished.then(() => {
      this.#currentPath = getActivePathname();
      this.#content.classList.remove('move-out', 'move-in');
    });
  }
}

export default App;

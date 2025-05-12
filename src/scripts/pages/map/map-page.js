import { getAccessToken, isLoggedIn } from '../../utils/auth.js';
import MapPresenter from './MapPresenter.js';

export default class MapPage {
  constructor() {
    this.presenter = new MapPresenter(this);
  }

  async render() {
    return `
      <section class="container map">
        <section class="title-button">
          <h1>Location</h1>
        </section>
        <div id="map"></div>
      </section>
    `;
  }

  async afterRender() {
    if (!isLoggedIn()) {
      window.location.hash = '/';
      return '';
    }

    const token = getAccessToken();
    this.presenter.createMap(token);
  }
}
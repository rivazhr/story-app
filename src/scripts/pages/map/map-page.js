import MapPresenter from './MapPresenter.js';

export default class MapPage {
  constructor() {
    this.presenter = new MapPresenter(this);
  }

  async render() {
    return `
      <section class="container">
        <h2>Location</h2>
        <div id="map"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    this.presenter.createMap();
  }
}
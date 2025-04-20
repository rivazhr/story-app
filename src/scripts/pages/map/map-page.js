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
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    this.presenter.createMap(token);
  }
}
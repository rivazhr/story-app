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
    this.presenter.createMap();
  }
}
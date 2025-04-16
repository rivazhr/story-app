// map-presenter.js (Presenter)

import MapPage from './map-page';

class MapPresenter {
  constructor() {
    this.mapPage = new MapPage();
  }

  showMapPage() {
    const content = document.querySelector('#main-content');
    content.innerHTML = ''; 
    content.appendChild(this.mapPage.render());
    this.mapPage.afterRender();
  }
}

export default MapPresenter;
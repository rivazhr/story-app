import { createMap } from '../../data/map.js';

class MapPage {
  constructor() {
    this._mapContainer = null;
  }

  render() {
    this._mapContainer = document.createElement('div');
    this._mapContainer.id = 'map'; 
    this._mapContainer.style.width = '100%';
    this._mapContainer.style.height = '500px';
    return this._mapContainer;
  }

  afterRender() {
    createMap(this._mapContainer.id);
  }
}

export default MapPage;
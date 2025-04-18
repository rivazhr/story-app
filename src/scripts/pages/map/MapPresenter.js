import { addMark, createMap } from '../../data/map.js';

export default class MapPresenter {
  constructor(view) {
    this.view = view;
  }

  createMap() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const lat = parseFloat(urlParams.get('lat'))  || -2.5489;
    const lon = parseFloat(urlParams.get('lon'))  || 118.0149;

    const map = createMap('map', [lat, lon], 18);
    addMark(map, [lat, lon])
  }
}

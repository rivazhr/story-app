import { addMark, addMarkAll, createMap } from '../../data/map.js';
import { getAllStories, getStoryDetail } from '../../data/api.js';

export default class MapPresenter {
  constructor(view) {
    this.view = view;
  }

  async createMap(token) {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = urlParams.get('id');
    if (id){
      const story = await getStoryDetail(token, id);
      
      const map = createMap('map', [story.lat, story.lon], 18);
      addMark(map, story);
    } else {
      const { listStory } = await getAllStories(token);
      const map = createMap('map');
      addMarkAll(map, listStory);
    }
  }
}

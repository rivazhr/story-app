import { showFormattedDate } from "../utils";
import { reverseGeocode } from "../data/map";

class StoryCard extends HTMLElement {
  constructor() {
    super();
  }

  set story(data) {
    this._story = data;
    this.render();
  }

  async render() {
    this.innerHTML = `
      <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}" class="story-img" />
      <section class="story-content">
        <h2 class="story-name">${this._story.name} • <span class="meta">${showFormattedDate(this._story.createdAt)}</span></h2>
        <p class="story-desc">${this._story.description}</p>
        <button class="btn map-btn" data-lat="${this._story.lat}" data-lon="${this._story.lon}">
          <i data-feather="map-pin"></i>
          <span class="location-label">Loading...</span>
        </button>
      </section>

      <script></script>
    `;

    const locationLabel = this.querySelector('.location-label');
    const location = await reverseGeocode(this._story.lat, this._story.lon);
    const mapButton = this.querySelector('.map-btn');

    if (!location) {
      locationLabel.textContent = 'Unknown Location';
      mapButton.disabled = true;
      mapButton.classList.add('disabled'); 
    } else {
      locationLabel.textContent = location;
    }

    mapButton.addEventListener('click', (e) => {
      const lat = e.currentTarget.dataset.lat;
      const lon = e.currentTarget.dataset.lon;
      
      window.location.hash = `#/map?lat=${lat}&lon=${lon}`;
    });
  }
}

customElements.define('story-card', StoryCard);
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
        <a class="map-btn" href="#/map?lat=${this._story.lat}&lon=${this._story.lon}" tabindex="0">
          <i data-feather="map-pin"></i>
          <span class="location-label">Loading...</span>
        </a>
        <h2 class="story-name">${this._story.name} • <span class="meta">${showFormattedDate(this._story.createdAt)}</span></h2>
        <p class="story-desc">${this._story.description}</p>
      </section>

      <script></script>
    `;

    const locationLabel = this.querySelector('.location-label');
    const location = await reverseGeocode(this._story.lat, this._story.lon);
    const mapButton = this.querySelector('.map-btn');

    if (!location || !this._story.lat) {
      locationLabel.textContent = 'Unknown Location';
      mapButton.disabled = true;
      mapButton.classList.add('disabled'); 
    } else {
      locationLabel.textContent = location;
    }
  }
}

customElements.define('story-card', StoryCard);
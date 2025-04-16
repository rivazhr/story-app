import { showFormattedDate } from "../utils";

class StoryCard extends HTMLElement {
  constructor() {
    super();
  }

  set story(data) {
    this._story = data;
    this.render();
  }

  render() {
    this.innerHTML = `
      <img src="${this._story.photoUrl}" alt="Photo by ${this._story.name}" class="story-img" />
      <section class="story-content">
        <h2 class="story-name">${this._story.name} • <span class="meta">${showFormattedDate(this._story.createdAt)}</span></h2>
        <p class="story-desc">${this._story.description}</p>
        <button class="btn map-btn" data-lat="${this._story.lat}" data-lng="${this._story.lng}">
          <i data-feather="map-pin"></i>
          ${this._story.location || 'Unknown Location'}
        </button>
      </section>

      <script></script>
    `;

    this.querySelector('.map-btn').addEventListener('click', (e) => {
      const lat = e.target.dataset.lat;
      const lng = e.target.dataset.lng;
      
      window.location.hash = `#/map?lat=${lat}&lng=${lng}`;
    });
  }
}

customElements.define('story-card', StoryCard);
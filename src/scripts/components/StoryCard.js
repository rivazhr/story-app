import { showFormattedDate, showToast } from "../utils";
import { reverseGeocode } from "../data/map";
import Database from '../data/database.js';
import feather from 'feather-icons';
import * as api from '../data/api.js'; 
import { getAccessToken } from "../utils/auth.js";

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
        <section class="location-bookmark">
          <a class="map-btn" href="#/map?id=${this._story.id}" tabindex="0">
            <i data-feather="map-pin"></i>
            <span class="location-label">Loading...</span>
          </a>
          <div id="save-actions-container"></div>
        </section>
        <h2 class="story-name">${this._story.name} • <span class="meta">${showFormattedDate(this._story.createdAt)}</span></h2>
        <p class="story-desc">${this._story.description}</p>
      </section>

      <script></script>
    `;

    const locationLabel = this.querySelector('.location-label');
    const location = await reverseGeocode(this._story.lat, this._story.lon);
    const mapButton = this.querySelector('.map-btn');

    if (!location || !this._story.lat || !this._story.lon) {
      locationLabel.textContent = 'Unknown Location';
      mapButton.disabled = true;
      mapButton.classList.add('disabled'); 
    } else {
      locationLabel.textContent = location;
    }

    await this.showSaveButton();
  }

  async saveStory() {
    try {
      const story = await api.getStoryDetail(getAccessToken(), this._story.id);
      (story);
      await Database.putStory(story);
      showToast('Story has been saved successfully.')
    } catch (error) {
      console.error('saveStory: error:', error);
      alert(error.message);
    }
  }

  async removeStory() {
    try {
      await Database.removeStory(this._story.id);
      showToast("Story has been removed from bookmarks");
    } catch (error) {
      console.error('removeStory: error:', error);
      alert(error.message);
    }
  }

  async showSaveButton() {
    const isSaved = await this.#isStorySaved();
    if (isSaved) {
      this.renderRemoveButton();
      return;
    }

    this.renderSaveButton();
  }

  async #isStorySaved() {
    return !!(await Database.getStoryById(this._story.id));
  }

  
  // Save or Remove Story
  renderSaveButton() {
    const container = this.querySelector('#save-actions-container');
  
    container.innerHTML = `
      <button id="story-detail-save" class="btn-icon outline">
        <i data-feather="bookmark"></i>
      </button>
    `;

    feather.replace();
  
    const saveBtn = container.querySelector('#story-detail-save');
    saveBtn.addEventListener('click', async () => {
      await this.saveStory();
      await this.showSaveButton();
    });
  }
  
  renderRemoveButton() {
    const container = this.querySelector('#save-actions-container');
  
    container.innerHTML = `
      <button id="story-detail-remove" class="btn-icon filled">
        <i data-feather="bookmark"></i>
      </button>
    `;
  
    feather.replace();
  
    const removeBtn = container.querySelector('#story-detail-remove');
    removeBtn.addEventListener('click', async () => {
      await this.removeStory();
      await this.showSaveButton();
    });
  }  
}

customElements.define('story-card', StoryCard);
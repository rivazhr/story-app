import SavedPresenter from "./SavedPresenter";
import Database from "../../data/database";

export default class SavedPage {
  #presenter;
  async render() {
    return `
      <div class="container">
        <section class="title-button">
          <h1>Saved Stories</h1>
        </section>
        <div id="story-list" class="saved"></div>
      </div>
      `;
  }

  async afterRender() {
    this.#presenter = new SavedPresenter({
      view: this,
      model: Database,
    });
    await this.#presenter.initialGalleryAndMap();
  }

  populateBookmarkedStories(message, stories) {
    if (stories.length <= 0) {
      const container = document.getElementById('story-list');
      container.innerHTML = 'Tidak ada cerita yang tersimpan.';
      return;
    }

    this.showData(stories);
  }

  showData(stories) {
    const container = document.getElementById('story-list');
    container.innerHTML = '';

    stories.forEach((story) => {
      const card = document.createElement('story-card');
      card.story = story;
      card.setAttribute('data-id', story.id);
      container.appendChild(card);
    });
  }
}
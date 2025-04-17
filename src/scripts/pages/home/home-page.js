import '../../components/StoryCard.js';
import HomePresenter from './HomePresenter.js';
import { getAllStories } from '../../data/api.js'; 

export default class HomePage {
  async render() {
    return `
      <div class="container">
        <section class="title-button">
          <h2>Home</h2>
          <a href="#/add" class="btn">
            <i data-feather="plus"></i>
            Share your Story
          </a>
        </section>
        <div id="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    const presenter = new HomePresenter({
      model: { getAllStories },  
      view: this,
    });

    await presenter.init(token);
  }

  showData(stories) {
    const container = document.getElementById('story-list');
    container.innerHTML = '';

    stories.forEach((story) => {
      const card = document.createElement('story-card');
      card.story = story;
      container.appendChild(card);
    });
  }
}
import '../../components/StoryCard.js';
import HomePresenter from './HomePresenter.js';
import { getAllStories } from '../../data/api.js'; 
import { getAccessToken, getUserName, isLoggedIn } from '../../utils/auth.js';

export default class HomePage {
  async render() {
    if (!isLoggedIn()) {
      window.location.hash = '/';
      return ''; 
    }

    return `
      <div class="container">
        <section class="title">
          <section class="text-button">
            <h1>Hello, <strong class="user-name">${ getUserName() }</strong>!</h1>
            <a href="#/add" class="btn">
              <i data-feather="plus"></i>
              Share your Story
            </a>
          </section>
          <p>Mind to share us a story today?</p>
        </section>
        <div id="story-list"></div>
      </div>
    `;
  }

  async afterRender() {
    const token = getAccessToken();
    const presenter = new HomePresenter({
      model: { getAllStories },
      view: this,
    });
    await presenter.init(token);
  }

  showData(stories) {
    const container = document.getElementById('story-list');
    if (!container) return; 
    container.innerHTML = '';

    stories.forEach((story) => {
      const card = document.createElement('story-card');
      card.story = story;
      card.setAttribute('data-id', story.id);
      container.appendChild(card);
    });
  }
}
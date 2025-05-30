import { showLoader, hideLoader } from "../../utils";

export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async init(token) {
    showLoader();
    try {
      const { listStory } = await this.#model.getAllStories(token);
      this.#view.showData(listStory);
    } catch (error) {
      alert('error: ' + error.message);
    } finally {
      hideLoader();
    }
  }
}
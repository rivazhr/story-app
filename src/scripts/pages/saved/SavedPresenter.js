export default class SavedPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialGalleryAndMap() {

    try {
      const stories = await this.#model.getAllStories();
      const message = 'Berhasil mendapatkan daftar laporan tersimpan.';
      this.#view.populateBookmarkedStories(message, stories);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      alert(error.message);
    }
  }
}
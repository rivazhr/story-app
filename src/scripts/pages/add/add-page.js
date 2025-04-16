import { AddPresenter } from './AddPresenter.js';

class AddPage {
  constructor() {
    this.presenter = new AddPresenter(this);
    this.nameInput = null;
    this.descriptionInput = null;
    this.locationInput = null;
    this.photoInput = null;
    this.submitButton = null;
  }

  render() {
    return `
      <div class="add-story-container">
        <h1>Add New Story</h1>
        <form id="add-story-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>

          <label for="description">Description:</label>
          <textarea id="description" name="description" required></textarea>

          <label for="location">Location:</label>
          <input type="text" id="location" name="location">

          <label for="photo">Photo:</label>
          <input type="file" id="photo" name="photo" accept="image/*" required>

          <button type="submit" id="submit">Add Story</button>
        </form>
      </div>
    `;
  }

  afterRender() {
    this.nameInput = document.querySelector('#name');
    this.descriptionInput = document.querySelector('#description');
    this.locationInput = document.querySelector('#location');
    this.photoInput = document.querySelector('#photo');
    this.submitButton = document.querySelector('#submit');

    this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const name = this.nameInput.value;
    const description = this.descriptionInput.value;
    const location = this.locationInput.value;
    const photo = this.photoInput.files[0];
    const token = localStorage.getItem('token');
    
    await this.presenter.addStory(token, { name, description, location, photo });
  }

  showSuccessMessage(message) {
    alert(message);
  }

  showErrorMessage(message) {
    alert(message);
  }
}

export default AddPage;
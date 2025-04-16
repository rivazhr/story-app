import { AddPresenter } from './AddPresenter.js';
import { startCamera, stopCamera, captureImage } from '../../utils/mediaStream.js';


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
      <div class="container">
        <h2>Add a New Story</h2>
        <form id="add-story-form">
          <label for="photo">Photo:</label>
          <div id="camera-wrapper">
            <video id="video" class="hidden" autoplay></video>
            <canvas id="canvas" class="hidden"></canvas>
            <button type="button" id="capture-btn" class="btn btn-secondary">
              <i data-feather="camera"></i>
              Capture Photo
            </button>
          </div>
          <input type="file" id="photo" name="photo">

          <label for="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
            
          <button type="submit" id="submit" class="btn">Post your Story</button>
        </form>
      </div>
      `;
    }
    
    afterRender() {
    this.descriptionInput = document.querySelector('#description');
    this.captureButton = document.querySelector('#capture-btn');
    this.photoInput = document.querySelector('#photo');

    // Starting camera or capture if started already
    this.captureButton.addEventListener('click', async () => {
      this.video = document.querySelector('#video');
      this.canvas = document.querySelector('#canvas');

      const isCameraOn = this.video.srcObject;

      if (isCameraOn) {
        const blob = await captureImage(this.video, this.canvas);
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        this.photoInput.files = dataTransfer.files;

        this.canvas.classList.remove('hidden');
        this.video.classList.add('hidden');

        stopCamera(this.video);
      } else {
        await startCamera(this.video);

        this.video.classList.remove('hidden');
        this.canvas.classList.add('hidden');
      }
    });
    
    this.submitButton = document.querySelector('#submit');
    this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    
    const description = this.descriptionInput.value;
    const photo = this.photoInput.files[0];
    console.log(photo);
    const token = localStorage.getItem('token');
    
    await this.presenter.addStory(token, { description, photo });
  }

  showSuccessMessage(message) {
    alert(message);
  }

  showErrorMessage(message) {
    alert(message);
  }
}

export default AddPage;
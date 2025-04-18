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
        <section class="title-button">
          <h1>Add a New Story</h1>
        </section>
        <form id="add-story-form">

          <div id="desktop-camera-wrapper" class="hidden">
            <label for="photo">Photo:</label>
            <video id="video" class="hidden" autoplay></video>
            <canvas id="canvas" class="hidden"></canvas>
            <button type="button" id="capture-btn" class="btn btn-secondary">
              <i data-feather="camera"></i>
              Capture Photo
            </button>
            <input type="file" id="photo-desktop" name="photo">
          </div>

          <div id="mobile-camera-wrapper" class="hidden">
            <label for="photo">Photo:</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id="photo-mobile"
              name="photo"
            />
          </div>
          
          <label for="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
          
          <label for="location">Location:</label>
          <input type="text" id="location" name="location" hidden>

          <input type="hidden" id="lat" name="lat">
          <input type="hidden" id="lon" name="lon">
          <div id="map"></div>
          
          <button type="submit" id="submit" class="btn">Post your Story</button>
        </form>
      </div>
    `;
  }
    
  afterRender() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    this.latInput = document.querySelector('#lat');
    this.lonInput = document.querySelector('#lon');
    this.presenter.setupMap(this.latInput, this.lonInput);

    this.descriptionInput = document.querySelector('#description');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const desktopWrapper = document.querySelector('#desktop-camera-wrapper');
    const mobileWrapper = document.querySelector('#mobile-camera-wrapper');

    if (isMobile) {
      mobileWrapper.classList.remove('hidden');
      this.photoInput = document.querySelector('#photo-mobile');
    } else {
      desktopWrapper.classList.remove('hidden');

      this.captureButton = document.querySelector('#capture-btn');
      this.video = document.querySelector('#video');
      this.canvas = document.querySelector('#canvas');
      this.photoInput = document.querySelector('#photo-desktop');

      this.captureButton.addEventListener('click', async () => {
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
    }

    this.submitButton = document.querySelector('#submit');
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.presenter.handleSubmit(this.descriptionInput.value, this.photoInput.files[0], this.latInput.value, this.lonInput.value);
    });
  }
}

export default AddPage;
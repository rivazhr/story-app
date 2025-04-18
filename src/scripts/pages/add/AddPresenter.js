import * as api from '../../data/api.js';
import { getCurrentPosition, hideLoader, showLoader } from '../../utils/index.js';
import { createMap } from '../../data/map.js';

export class AddPresenter {
  constructor(view) {
    this.view = view; 
  }

  async handleSubmit(description, photo, lat, lon) {
    showLoader();
    const token = localStorage.getItem('token');
    
    await this.addStory(token, { description, photo, lat, lon });
    hideLoader();
  }

  async setupMap(latInput, lonInput) {
    try {
      let { lat, lon } = await getCurrentPosition();

      console.log(lat, lon)

      const map = createMap('map', [lat, lon], 18);

      const marker = L.marker([lat, lon], { draggable: true }).addTo(map);

      marker.on('dragend', async () => {
        const position = marker.getLatLng();
        lat = position.lat;
        lon = position.lng;

        latInput.value = lat;
        lonInput.value = lon;
        console.log(latInput.value, lonInput.value)
      });

      latInput.value = lat;
      lonInput.value = lon;
    } catch (error) {
      console.error('Gagal mendapatkan lokasi', error);
    }
  }

  async addStory(token, { description, photo, lat, lon }) {
    const formData = new FormData();
    
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('lat', lat);
    formData.append('lon', lon);
    
    try {
      const result = await api.addStory(token, formData);
      if (!result.error) {
        this.showSuccessMessage('Story added successfully!');
        window.location.hash = '/';
      } else {
        this.showErrorMessage(error.message || 'Failed to add story. Please try again.');
      }
    } catch (error) {
      console.error(error);
      this.showErrorMessage(error.message || 'Failed to add story. Please try again.');
    } 
  }

  showSuccessMessage(message) {
    alert(message);
  }
  
  showErrorMessage(message) {
    const errorBox = document.createElement('div');
    errorBox.textContent = message;
    errorBox.style.color = 'red';
    errorBox.style.marginTop = '1rem';

    document.querySelector('#add-story-form').appendChild(errorBox);
  }
}
import * as api from '../../data/api.js';
import { getCurrentPosition, hideLoader, showLoader, compressImage } from '../../utils/index.js';
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

      const map = createMap('map', [lat, lon], 18);

      const marker = L.marker([lat, lon], { draggable: true }).addTo(map);

      marker.on('dragend', async () => {
        const position = marker.getLatLng();
        lat = position.lat;
        lon = position.lng;

        latInput.value = lat;
        lonInput.value = lon;
      });

      map.on('click', function (e) {
        const { lat: clickedLat, lng: clickedLon } = e.latlng;

        marker.setLatLng([clickedLat, clickedLon]); 
        latInput.value = clickedLat;
        lonInput.value = clickedLon;
      });

      latInput.value = lat;
      lonInput.value = lon;
    } catch (error) {
      console.error('Gagal mendapatkan lokasi', error);
    }
  }

  async addStory(token, { description, photo, lat, lon }) {
    const compressedPhoto = await compressImage(photo);

    const formData = new FormData();
    
    formData.append('description', description);
    formData.append('photo', compressedPhoto);
    formData.append('lat', lat);
    formData.append('lon', lon);
    
    try {
      const result = await api.addStory(token, formData);
      if (!result.error) {
        this.showSuccessMessage('Story added successfully!');
        window.location.hash = '/';
      } else {
        this.showErrorMessage(result.message || 'Failed to add story. Please try again.');
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
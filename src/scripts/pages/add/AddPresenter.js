import * as api from '../../data/api.js';
import { getCurrentPosition, hideLoader, showLoader } from '../../utils/index.js';

export class AddPresenter {
  constructor(view) {
    this.view = view; 
  }

  async handleSubmit(description, photo) {
    
    showLoader();
    const { lat, lon } = await getCurrentPosition();
    const token = localStorage.getItem('token');
    
    await this.addStory(token, { description, photo, lat, lon });
    hideLoader();
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
        this.showErrorMessage('Failed to add story. Please try again.');
      }
    } catch (error) {
      console.error(error);
      this.view.showErrorMessage('An error occurred while adding the story.');
    } 
  }

  showSuccessMessage(message) {
    alert(message);
  }
  
  showErrorMessage(message) {
    alert(message);
  }
}
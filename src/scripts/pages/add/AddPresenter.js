import * as api from '../../data/api.js';

export class AddPresenter {
  constructor(view) {
    this.view = view; 
  }

  async addStory(token, { name, description, location, photo }) {
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('photo', photo);
    
    try {
      const result = await api.addStory(token, formData);
      if (!result.error) {
        this.view.showSuccessMessage('Story added successfully!');
      } else {
        this.view.showErrorMessage('Failed to add story. Please try again.');
      }
    } catch (error) {
      console.error(error);
      this.view.showErrorMessage('An error occurred while adding the story.');
    }
  }
}
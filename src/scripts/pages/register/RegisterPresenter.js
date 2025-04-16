import { registerUser } from '../../data/api.js';

export default class RegisterPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleRegister(name, email, password) {
    const response = await registerUser({ name, email, password });
    if (!response.error) {
      localStorage.setItem('token', response.token);
      window.location.hash = '/';
    } else {
      this.#view.showError('Registration failed');
    }
  }
}
import { registerUser } from '../../data/api.js';
import { loginUser } from '../../data/api.js';
import { showLoader, hideLoader } from '../../utils/index.js';

export default class RegisterPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleRegister(name, email, password) {
    showLoader();
    const response = await registerUser({ name, email, password });
    if (!response.error) {
      const loginResponse = await loginUser({ email, password });
      localStorage.setItem('token', loginResponse.loginResult.token);
      hideLoader();
      window.location.hash = '/';
    } else {
      this.#view.showError('Registration failed');
    }
  }
}
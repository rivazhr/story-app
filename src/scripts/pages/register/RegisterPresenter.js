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
    try {
      await registerUser({ name, email, password });
      const loginResponse = await loginUser({ email, password });
      localStorage.setItem('token', loginResponse.loginResult.token);
      window.location.hash = '/';
    } catch (error) {
      this.#view.showError('Registration failed');
    } finally {
      hideLoader();
    }
  }
}
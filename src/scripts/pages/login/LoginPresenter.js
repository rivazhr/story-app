import { loginUser } from '../../data/api.js';
import { showLoader, hideLoader } from '../../utils/index.js';

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleLogin(email, password) {
    showLoader();
    try {
      await loginUser({ email, password });
      localStorage.setItem('token', response.loginResult.token);
      window.location.hash = '/';
    } catch (error) {
      this.#view.showError('Invalid email or password');
    } finally {
      hideLoader();
    }
  }
}
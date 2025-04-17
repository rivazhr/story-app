import { loginUser } from '../../data/api.js';
import { showLoader, hideLoader } from '../../utils/index.js';

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleLogin(email, password) {
    showLoader();
    const response = await loginUser({ email, password });
    if (!response.error) {
      localStorage.setItem('token', response.loginResult.token);
      hideLoader();
      window.location.hash = '/';
    } else {
      this.#view.showError('Invalid email or password');
    }
  }
}
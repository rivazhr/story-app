import { loginUser } from '../../data/api.js';

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleLogin(email, password) {
    const response = await loginUser({ email, password });
    if (!response.error) {
      localStorage.setItem('token', response.loginResult.token);
      window.location.hash = '/';
    } else {
      this.#view.showError('Invalid email or password');
    }
  }

  handleGuestLogin() {
    window.location.hash = '/';
  }
}
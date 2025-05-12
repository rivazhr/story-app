import { loginUser } from '../../data/api.js';
import { setSession } from '../../utils/auth.js';
import { showLoader, hideLoader } from '../../utils/index.js';

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleLogin(email, password) {
    showLoader();
    try {
      const response = await loginUser({ email, password });
      if (!response.error) {
        setSession(response);
      } else throw new Error(response.message);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      hideLoader();
    }
  }
}
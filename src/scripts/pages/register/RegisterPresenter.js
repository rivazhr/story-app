import { registerUser } from '../../data/api.js';
import { loginUser } from '../../data/api.js';
import { setSession } from '../../utils/auth.js';
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
      setSession(loginResponse);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      hideLoader();
    }
  }
}
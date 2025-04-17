import RegisterPresenter from './RegisterPresenter.js';

export default class RegisterPage {
  async render() {
    return `
      <section class="auth-container">
        <h1 class="auth-title">Register</h1>
        <form class="auth-form">
          <label for="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />

          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" required />
          <p id="register-error" role="alert" aria-live="assertive" class="error-message hidden">
            Password tidak memenuhi ketentuan
          </p>

          <button type="submit" class="auth-button">Register</button>
        </form>

        <p class="auth-note">Already have an account?</p>
        <a href="#/login" class="auth-link">Login here</a>
      </section>
    `;
  }

  async afterRender() {
    const registerForm = document.querySelector('.auth-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    passwordInput.addEventListener('input', () => {
      const passwordValue = passwordInput.value.trim();
      if (passwordValue.length < 8) {
        this.showError('Password minimal 8 karakter');
        passwordInput.setAttribute('aria-invalid', 'true');
      } else {
        this.hideError();
        passwordInput.removeAttribute('aria-invalid');
      }
    });

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      if (password.length < 8) {
        this.showError('Password harus minimal 8 karakter');
        passwordInput.setAttribute('aria-invalid', 'true');
        return;
      }

      this.hideError();
      passwordInput.removeAttribute('aria-invalid');

      const presenter = new RegisterPresenter(this);
      presenter.handleRegister(name, email, password);
    });
  }

  showError(message) {
    const errorEl = document.getElementById('register-error');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  hideError() {
    const errorEl = document.getElementById('register-error');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}
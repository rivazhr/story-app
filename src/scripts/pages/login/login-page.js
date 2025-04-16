import LoginPresenter from './LoginPresenter.js';

export default class LoginPage {
  async render() {
    return `
      <section class="auth-container">
        <h1 class="auth-title">Login</h1>
        <form class="auth-form">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />

          <button type="submit" class="auth-button">Login</button>
        </form>

        <p class="auth-note">Don't have an account yet?</p>
        <a href="#/register" class="auth-link">Register here</a>

        <p class="auth-note">Or</p>
        <button id="guest-button" class="auth-button">Login as Guest</button>
      </section>
    `;
  }

  async afterRender() {
    const loginForm = document.querySelector('.auth-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
      const presenter = new LoginPresenter(this);
      presenter.handleLogin(email, password);
    });

    const guestButton = document.getElementById('guest-button');
    guestButton.addEventListener('click', () => {
      const presenter = new LoginPresenter(this);
      presenter.handleGuestLogin();
    });
  }

  showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    document.querySelector('.auth-container').appendChild(errorMessage);
  }
}
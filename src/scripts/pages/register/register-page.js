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

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const presenter = new RegisterPresenter(this);
      presenter.handleRegister(name, email, password);
    });
  }

  showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    document.querySelector('.auth-container').appendChild(errorMessage);
  }
}
export default class AboutPage {
  async render() {
    return `
      <section class="about-container">
        <h1 class="about-title">About Us</h1>
        <p class="about-description">
          Welcome to our application! This platform is built to help you manage your stories and share experiences. 
          Our team is dedicated to providing a seamless and engaging experience for our users.
        </p>
        <h2 class="team-title">Our Team</h2>
        <ul class="team-list">
          <li class="team-member">
            <h3>Rifa Fairuz Zahra</h3>
            <p>Lead Developer</p>
          </li>
        </ul>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }
  }
}

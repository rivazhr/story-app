export default class NotFoundPage {
  async render() {
    return `
      <section class="not-found-page">
        <h1>OOPS!</h1>
        <div class="img">
          <img src="/images/not-found.svg" alt="Not Found"/>
        </div>
        <p>
          Sorry, we can't find the page :(
        </p>
        <a href="#/" class="btn btn-secondary filled">
          Back to Home
        </a>
      </section>
    `;
  }

  async afterRender() {
  }
};
import { getActivePathname } from '../routes/url-parser.js';

export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function highlightActiveNav() {
  const currentPath = getActivePathname();
  const navLinks = document.querySelectorAll('#nav-list a');

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href').replace('#', '');

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
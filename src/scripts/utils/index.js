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

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung di browser ini'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log('Lokasi pengguna:', lat, lon);
        resolve({ lat, lon });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function showLoader() {
  document.getElementById('loading-indicator').classList.remove('hidden');
}

export function hideLoader() {
  document.getElementById('loading-indicator').classList.add('hidden');
}
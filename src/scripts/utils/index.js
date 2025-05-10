import { getActivePathname } from '../routes/url-parser.js';

export function changeTitle(route) {
  const routes = {
    '/': 'LuluTalk',
    '/about': 'LuluTalk | About',
    '/add': 'LuluTalk | Add a New Story',
    '/map': 'LuluTalk | Location',
  };

  const pageTitle = routes[route] || 'LuluTalk';
  
  document.title = pageTitle;
}

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

export function toggleHeaderVisibility() {
  const header = document.querySelector('header');
  const currentRoute = getActivePathname();
  if (currentRoute === '/login' || currentRoute === '/register') {
    header.style.display = 'none';
  } else {
    header.style.display = 'block';
  }
}

export function compressImage(file, maxWidth = 800, maxHeight = 800) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
      img.src = e.target.result;
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsDataURL(file);

    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob((blob) => {
        const compressedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        resolve(compressedFile);
      }, file.type, 0.7); 
    };
  });
}
export function getAccessToken(){
  const token = localStorage.getItem('token');
  return token;
}
export function convertBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export function isServiceWorkerAvailable() {
  return 'serviceWorker' in navigator;
}

export async function registerServiceWorker() {
  if (!isServiceWorkerAvailable()) {
    console.log('Service Worker API unsupported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.bundle.js');
    console.log('Service worker telah terpasang', registration);
  } catch (error) {
    console.log('Failed to install service worker:', error);
  }
}
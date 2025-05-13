import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import {
  CacheableResponsePlugin,
} from 'workbox-cacheable-response';
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
} from 'workbox-strategies';

import CONFIG from './config';

// Precache files from __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// --- RUNTIME CACHING ---

// Google Fonts
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
  }),
);

// Font Awesome
registerRoute(
  ({ url }) =>
    url.origin === 'https://cdnjs.cloudflare.com' ||
    url.origin.includes('fontawesome'),
  new CacheFirst({
    cacheName: 'fontawesome',
  }),
);

// UI Avatars
registerRoute(
  ({ url }) => url.origin === 'https://ui-avatars.com',
  new CacheFirst({
    cacheName: 'avatars-api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// API Requests (excluding images)
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(CONFIG.BASE_URL);
    return baseUrl.origin === url.origin && request.destination !== 'image';
  },
  new NetworkFirst({
    cacheName: 'story-api',
  }),
);

// Image requests from API
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(CONFIG.BASE_URL);
    return baseUrl.origin === url.origin && request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'story-api-images',
  }),
);

// Maptiler tiles or assets
registerRoute(
  ({ url }) => url.origin.includes('maptiler'),
  new CacheFirst({
    cacheName: 'maptiler-api',
  }),
);

// HTML pages (SPA navigation)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-pages',
  }),
);

// Bypass caching for auth routes or POST requests
registerRoute(
  ({ url, request }) =>
    request.method === 'POST' ||
    url.pathname.includes('/login') ||
    url.pathname.includes('/register'),
  new NetworkOnly()
);

// --- PUSH NOTIFICATION HANDLER ---
self.addEventListener('push', (event) => {
  async function showNotif() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options?.body || '',
      icon: data.options?.icon || '/images/icons/icon-x144.png',
    });
  }

  event.waitUntil(showNotif());
});
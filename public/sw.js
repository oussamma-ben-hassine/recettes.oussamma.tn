// Service Worker pour l'Application Recettes & Épicerie | Chef Oussama
const CACHE_NAME = 'recettes-oussama-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/images/chef-oussama.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes d'API et auth (doivent toujours passer par le réseau)
  if (event.request.url.includes('/api/') || event.request.url.includes('/auth/')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Simple Service Worker for caching assets
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/styles.css',
          '/app.js'
        ]);
      }).catch((error) => {
        console.log('Caching failed:', error);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  // add inside manifest.json
  // "serviceworker": {
  //   "src": "/service-worker.js"
  // },


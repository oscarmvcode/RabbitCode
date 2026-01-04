const CACHE_NAME = "rabbitcode-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./js/data.js",
  "./js/main.js",
  "./manifest.json",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap",
  "https://unpkg.com/scrollreveal"
];

// 1. INSTALACIÓN: Cacheo inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("RabbitCode: Memoria de sistema optimizada.");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVACIÓN: Limpieza de versiones viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("RabbitCode: Actualizando arquitectura...");
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Estrategia Network First (Prioriza GitHub Pages)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Si hay red, actualizamos la caché con lo nuevo de GitHub
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si falla el internet, entregamos lo que tengamos guardado
        return caches.match(event.request);
      })
  );
});
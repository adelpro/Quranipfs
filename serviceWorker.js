const staticCache = "QuranIPFS-cache-v55";
const dynamicCache = "QuranIPFS-dynamic-v55";
const assets = [
  "/",
  "./index.html",
  "./FR/index.html",
  "./EN/index.html",
  "./fallback.html",
  "./css/style.css",
  "./favicon.ico",
  "./images/16x16.png",
  "./images/32x32.png",
  "./images/96x96.png",
  "./images/128x128.png",
  "./images/144x144.png",
  "./images/192x192.png",
  "./images/256x256.png",
  "./images/384x384.png",
  "./images/512x512.png",
  "./images/favicon.ico",
  "./images/original.png",
  "./images/github-logo",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
  "https://code.jquery.com/jquery-3.6.0.min.js",
  "https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js",
  "https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css",
  "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js",
  "https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js",
  "./js/firebase.js",
  "./js/app.js",
  "./fonts/QuranIPFS.svg",
  "./fonts/QuranIPFS.ttf",
  "./fonts/QuranIPFS.woff",
];
// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCache, 30);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});

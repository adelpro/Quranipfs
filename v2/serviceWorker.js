const staticCache = "QuranIPFS-cache-v30";
const dynamicCache = "QuranIPFS-dynamic-v27";
const assets = [
  "/",
  "index.html",
  "fallback.html",
  "css/style.css",
  "firebase-messaging-sw.js",
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
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js",
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "https://ka-f.fontawesome.com/releases/v5.15.2/webfonts/free-fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff2",
  "https://fonts.gstatic.com/s/materialicons/v81/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://ka-f.fontawesome.com/releases/v5.15.2/webfonts/free-fa-brands-400.woff2",
  "js/firebase.js",
  "js/app.js",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", installEvent => {
 installEvent.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
       return Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key))
      );
  })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
 evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCache, 30);
          return fetchRes;
        })
      });
    }).catch(() => {
      if(evt.request.url.indexOf('.html') > -1){
        return caches.match('/fallback.html');
      } 
    })
  );
});

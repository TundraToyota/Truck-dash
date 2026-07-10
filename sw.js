/* Service worker: caches the app shell so the dashboard opens offline.
   Bump CACHE version when Truck_Maintenance_Dashboard.html changes. */
const CACHE = "truck-dash-v1";
const ASSETS = [
  "./Truck_Maintenance_Dashboard.html",
  "./manifest.json",
  "./apple-touch-icon.png",
  "./icon-512.png"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
      .then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; })
        .map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

/* Network-first for the HTML (so updates arrive when online), cache fallback
   when offline; cache-first for everything else. */
self.addEventListener("fetch", function(e) {
  if (e.request.mode === "navigate" || e.request.url.indexOf(".html") !== -1) {
    e.respondWith(
      fetch(e.request).then(function(resp) {
        const copy = resp.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        return resp;
      }).catch(function() {
        return caches.match(e.request, { ignoreSearch: true }).then(function(r) {
          return r || caches.match("./Truck_Maintenance_Dashboard.html");
        });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function(r) {
      return r || fetch(e.request);
    })
  );
});

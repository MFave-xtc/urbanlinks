const CACHE = 'urbanlinks-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // App shell: serve from cache first so it opens with no signal.
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      // Cache fonts and any same-origin asset the first time it loads.
      const url = new URL(req.url);
      const cacheable = url.origin === location.origin ||
        url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
      if (cacheable && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});

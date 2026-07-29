// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

/* ---------------------------------------------------- */
/*              BACKGROUND SYNC IMPLEMENTATION          */
/* ---------------------------------------------------- */
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background Sync triggered:', event.tag);
  if (event.tag === 'background-sync' || event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[Service Worker] Syncing pending offline requests/data...');
  return Promise.resolve();
}

/* ---------------------------------------------------- */
/*          PERIODIC BACKGROUND SYNC IMPLEMENTATION     */
/* ---------------------------------------------------- */
self.addEventListener('periodicsync', (event) => {
  console.log('[Service Worker] Periodic Background Sync triggered:', event.tag);
  if (event.tag === 'update-content' || event.tag === 'periodic-data-sync') {
    event.waitUntil(updatePeriodicContent());
  }
});

async function updatePeriodicContent() {
  console.log('[Service Worker] Fetching background periodic updates...');
  return Promise.resolve();
}

/* ---------------------------------------------------- */
/*            PUSH NOTIFICATIONS IMPLEMENTATION         */
/* ---------------------------------------------------- */
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push event received');

  let data = { title: 'TekSuite Notification', body: 'You have new updates in TekSuite.' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'New updates available',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💼</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💼</text></svg>',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1',
      url: data.url || '/'
    },
    actions: [
      { action: 'explore', title: 'Open TekSuite' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'TekSuite', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received:', event.notification.tag);
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

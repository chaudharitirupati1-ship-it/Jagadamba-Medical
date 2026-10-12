// Jagadamba Medical: disable the old aggressive cache while troubleshooting blank-screen deployments.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
self.addEventListener("fetch", (event) => {
  // No interception: let the browser request the current page and scripts from the network.
});

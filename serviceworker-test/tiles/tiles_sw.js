// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  // Perform install steps
  event.waitUntil(self.skipWaiting()) // Skip waiting to activate immediately
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(self.clients.claim()) // Claim control of all clients immediately
})

// Fetch event - Intercept and log requests
self.addEventListener('fetch', (event) => {
  console.log(
    'tiles_sw.js intercepted fetch1 request for:',
    event.request.url
  )

  // Respond to fetch with a custom response
  event.respondWith(
    (async () => {
      if (event.request.url.includes('jsonplaceholder.typicode.com')) {
        return new Response(
          JSON.stringify({
            message: 'Intercepted by tiles_sw.js Service Worker!',
            originalUrl: event.request.url,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      }
      return fetch(event.request) // Pass through for other requests
    })()
  )
})

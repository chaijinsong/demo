self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
    console.log('Service Worker intercepting fetch:', event.request.url);
});
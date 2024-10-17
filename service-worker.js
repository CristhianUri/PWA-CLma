const CACHE_NAME = 'clima-cache-v1';
const urlsToCache = [
    '/',
    '/index2.html',
    '/styles.css', // Asegúrate de incluir los archivos que sean necesarios
    '/app.js',
    '/manifest.json',
    '/cielo.jpg',
    '/flecha-abajo.png',
    'https://api.openweathermap.org/data/2.5/forecast' // Esto también se puede gestionar con estrategias más avanzadas
];

// Instalación del service worker y guardado de los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos en caché correctamente');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activar el service worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar las peticiones de la red para servir desde la caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Si encontramos una respuesta en caché, la devolvemos. De lo contrario, hacemos la petición a la red.
            return response || fetch(event.request);
        }).catch(() => {
            // Mostrar un mensaje o contenido alternativo si no hay conexión ni caché
            return caches.match('/offline.html');
        })
    );
});

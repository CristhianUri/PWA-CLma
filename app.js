if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
        console.log('Service Worker registrado correctamente.');
    })
    .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
    });
}

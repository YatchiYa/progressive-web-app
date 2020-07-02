const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    
   
    '/js/saved.js',
    '/js/search.js',
    '/js/trending.js',
    '/sw.js'
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
];

const appCaches = [
    appShellCacheName,
];

// TODO: 2b - On install, add app shell files to cache
self.addEventListener('install', async (event)=>{ 
    console.log('Installation')
    event.waitUntil(
        caches.open(appShellCacheName)
        .then((cache) => {
            console.log(cache);
            return cache.addAll(appShellFilesToCache);
        })
    );
});
// TODO: 2c - On activation, remove obsolete caches
self.addEventListener('activate', async(event) => {
    var cacheWhitelist = [];
    console.log('Service worker activate event!');
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
           
            return  Promise.all(
                cacheNames.map((cacheName)=>{
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((response) =>{
            if (response){
                return response;
            }
            return fetch(event.request).then(
                (response) =>{
                    if(!response || response.status != 200 || response.type != 'basic'){
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(appShellCacheName)
                    .then((cache) =>{
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }
            );
        })
    );
});
// TODO: 2d - On intercepted fetch, use the strategy of your choice to respond to requests

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('restaurant-reviews').then(function(cache) {
			cache.addAll([
					'/',
					'index.html',
					'restaurant.html',
					'js/main.js',
					'js/restaurant_info.js',
					'js/dbhelper.js',
					'data/restaurants.json',
					'css/styles.css'
				]
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match('/'));
			return;
		}
	}

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
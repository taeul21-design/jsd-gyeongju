const CACHE_NAME = 'jsd-gyeongju-v1.4.4';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 설치 이벤트: 캐시 생성
self.addEventListener('install', (event) => {
  console.log('[Service Worker] 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] 캐시 저장 완료');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // 즉시 활성화
});

// 활성화 이벤트: 이전 캐시 삭제
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] 활성화 중...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // 즉시 제어 시작
});

// Fetch 이벤트: 네트워크 우선, 캐시 폴백 전략
self.addEventListener('fetch', (event) => {
  // API 요청은 항상 네트워크를 통해
  if (event.request.url.includes('/tables/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(
            JSON.stringify({ error: '오프라인 상태에서는 데이터를 불러올 수 없습니다.' }),
            { 
              headers: { 'Content-Type': 'application/json' },
              status: 503
            }
          );
        })
    );
    return;
  }

  // 나머지 요청: 네트워크 우선, 캐시 폴백
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 성공적인 응답을 캐시에 저장
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 응답
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 캐시에도 없으면 오프라인 페이지 표시
          return caches.match('/index.html');
        });
      })
  );
});

// 푸시 알림 이벤트 (선택사항)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '새로운 소식이 있습니다.',
    icon: '/images/icon-192x192.png',
    badge: '/images/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'jsd-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('증산도 경주 노서도장', options)
  );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

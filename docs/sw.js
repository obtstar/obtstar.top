/**
 * ObtStar Service Worker
 * 提供离线访问、缓存策略和资源预缓存
 * 
 * 缓存策略:
 * - 静态资源: Cache First, 后台更新
 * - API 响应: Network First, 缓存回退
 * - 图片资源: Cache First, 最长30天
 */

const STATIC_CACHE = 'obtstar-static-v4';
const API_CACHE = 'obtstar-api-v4';
const IMAGE_CACHE = 'obtstar-images-v4';

// 预缓存的核心资源
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/reports.html',
  '/report-detail.html',
  '/reader.html',
  '/about.html',
  '/css/styles.css',
  '/css/components.css',
  '/js/main.js',
  '/js/theme-manager.js',
  '/js/api-client.js',
  '/js/bookmarks.js',
  '/data/reports.js'
];

// 安装事件 - 预缓存核心资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Pre-cache failed:', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // 删除旧版本缓存
            if (cacheName !== STATIC_CACHE && 
                cacheName !== API_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// 判断请求类型
function getRequestType(request) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/api/')) {
    return 'api';
  }
  
  if (request.destination === 'image' || 
      /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url.pathname)) {
    return 'image';
  }
  
  if (request.destination === 'style' || 
      request.destination === 'script' ||
      /\.(css|js)$/i.test(url.pathname)) {
    return 'static';
  }
  
  if (request.mode === 'navigate' || 
      /\.(html|htm)$/i.test(url.pathname)) {
    return 'document';
  }
  
  return 'other';
}

// 静态资源缓存策略: Cache First, 后台更新
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // 后台更新缓存
    fetch(request)
      .then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {});
    
    return cached;
  }
  
  // 缓存未命中，从网络获取
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

// API 缓存策略: Network First, 缓存回退
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    // 优先从网络获取
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // 更新缓存
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // 网络失败，尝试从缓存获取
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] Serving from cache:', request.url);
      return cached;
    }
    
    // 缓存也没有，返回离线页面或错误
    throw error;
  }
}

// 图片缓存策略: Cache First, 最长30天
async function imageCacheStrategy(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    // 检查缓存是否过期（30天）
    const cachedDate = cached.headers.get('sw-cached-date');
    if (cachedDate) {
      const age = Date.now() - new Date(cachedDate).getTime();
      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30天
      
      if (age < maxAge) {
        return cached;
      }
    }
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // 添加自定义缓存日期头
      const headers = new Headers(response.headers);
      headers.set('sw-cached-date', new Date().toISOString());
      
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      
      cache.put(request, modifiedResponse.clone());
      return modifiedResponse;
    }
  } catch (error) {
    if (cached) {
      return cached;
    }
  }
  
  // 返回占位图
  return new Response(
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect fill="%23EEF2FF" width="400" height="240"/><text fill="%234F46E5" x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="20">ObtStar</text></svg>',
    { headers: { 'Content-Type': 'image/svg+xml' } }
  );
}

// 获取离线页面
async function getOfflinePage() {
  const cache = await caches.open(STATIC_CACHE);
  const offlinePage = await cache.match('/404.html');
  return offlinePage || new Response('Offline', { status: 503 });
}

// 获取请求事件
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestType = getRequestType(request);
  
  // 跳过非 GET 请求
  if (request.method !== 'GET') {
    return;
  }
  
  // 跳过跨域请求
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }
  
  switch (requestType) {
    case 'api':
      event.respondWith(
        networkFirstStrategy(request, API_CACHE)
          .catch(() => getOfflinePage())
      );
      break;
      
    case 'image':
      event.respondWith(imageCacheStrategy(request));
      break;
      
    case 'static':
    case 'document':
      event.respondWith(
        cacheFirstStrategy(request, STATIC_CACHE)
          .catch(() => getOfflinePage())
      );
      break;
      
    default:
      // 其他请求使用网络优先
      event.respondWith(
        fetch(request)
          .catch(() => caches.match(request))
      );
  }
});

// 消息事件（与页面通信）
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker registered');

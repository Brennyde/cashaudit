const CACHE='cash-audit-shell-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.add('./manifest.webmanifest')))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;e.respondWith((async()=>{try{const fresh=await fetch(r,{cache:'no-store'});const c=await caches.open(CACHE);await c.put(r.mode==='navigate'?'./index.html':r,fresh.clone());return fresh}catch{return(await caches.match(r.mode==='navigate'?'./index.html':r))||Response.error()}})())});

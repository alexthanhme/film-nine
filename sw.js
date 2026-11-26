const C='nine-20261126112634',L='nine-lib',P=['/','/phong-toi/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll([...P,'/manifest.webmanifest','/icon-192.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==L).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin&&u.pathname.startsWith('/v/')||u.hostname==='storage.googleapis.com'){
e.respondWith(caches.open(L).then(x=>x.match(r).then(m=>m||fetch(r).then(s=>{if(s.ok)x.put(r,s.clone());return s;}))));}
else if(u.origin===location.origin){if(u.searchParams.has('v'))return;const h=u.pathname.startsWith('/phong-toi')?'/phong-toi/':'/';
e.respondWith(fetch(r).then(s=>{const c=s.clone();caches.open(C).then(x=>x.put(r,c));return s;}).catch(()=>caches.match(r).then(m=>m||caches.match(h))));}});

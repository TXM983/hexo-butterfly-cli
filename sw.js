(()=>{const t="MuXiaoChenCache",e="https://id.v3/",n=()=>caches.match(e).then((t=>t?.json())),s=n=>caches.open(t).then((t=>t.put(e,new Response(JSON.stringify(n)))));self.addEventListener("install",(e=>{self.skipWaiting();e.waitUntil(n().then((async e=>{if(e&&18!==e.escape){const e=await caches.open(t),n=["/404.html","/css/index.css"];await Promise.all(n.map((async t=>{try{const n=await fetch(t,{cache:"no-store"});n.ok&&await e.put(t,n.clone())}catch(e){console.error(`预缓存失败: ${t}`,e)}})));const s=await e.keys().then((t=>t?.map((t=>t.url))));await caches.delete(t);const a=await m();a.type="escape",a.list=s;(await clients.matchAll()).forEach((t=>t.postMessage(a)))}})))})),self.addEventListener("activate",(t=>t.waitUntil(clients.claim())));const a=(t,e,n,s)=>(s||(s={}),s.cache=e?"no-store":"default",n&&(s.mode="cors",s.credentials="same-origin"),fetch(t,s)),c=(t,e,n)=>a(t,e,!0,n),r=t=>{if("localhost"!==t.hostname)for(let e in i){const n=i[e];if(n.match(t))return n}};let i={simple:{clean:!0,search:!1,match:t=>"www.aimiliy.top"===t.host&&t.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/)},cdn:{clean:!0,match:t=>["cdn.aimiliy.top","cdn.cbd.int","lf26-cdn-tos.bytecdntp.com","lf6-cdn-tos.bytecdntp.com","lf3-cdn-tos.bytecdntp.com","lf9-cdn-tos.bytecdntp.com","cdn.staticfile.org","npm.elemecdn.com"].includes(t.host)&&t.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/)}},o=t=>{if(t.startsWith("https://npm.elemecdn.com"))return{timeout:3e3,list:[t,`https://cdn.cbd.int/${new URL(t).pathname}`]}},l=()=>!1;const h=(t,e,n=null)=>{if(!n&&!(n=o(t.url)))return c(t,e);const s=n.list,a=new Array(s.length),r=n=>c(new Request(s[n],t),e,{signal:(a[n]=new AbortController).signal}).then((t=>f(t)?{r:t,i:n}:Promise.reject()));return new Promise(((e,c)=>{let i=!0;const o=()=>{i=!1,Promise.any([h,...Array.from({length:s.length-1},((t,e)=>e+1)).map((t=>r(t)))]).then((t=>{for(let e=0;e!==s.length;++e)e!==t.i&&a[e].abort();e(t.r)})).catch((()=>c(`请求 ${t.url} 失败`)))},l=setTimeout(o,n.timeout),h=r(0).then((t=>{i&&(clearTimeout(l),e(t.r))})).catch((()=>(i&&(clearTimeout(l),o()),Promise.reject())))}))},f=t=>t.ok||[301,302,307,308].includes(t.status),u=new Map;self.addEventListener("fetch",(e=>{let n=e.request,s=new URL(n.url);if("GET"!==n.method||!n.url.startsWith("http"))return;if((t=>t.url.startsWith("https://i0.hdslb.com")||t.url.startsWith("http://")||t.url.startsWith("https://www.aimiliy.top/life/music/")||t.url.startsWith("https://twikoo.aimiliy.top/music"))(n))return;let c,i=s.hostname+s.pathname+s.search;const m=t=>{e.respondWith(c?t.then((t=>{for(let e of c)e(t.clone())})).catch((t=>{for(let e of c)e(t)})).then((()=>(u.delete(i),t))):t)},p=r(s);if(p){let e=`https://${s.host}${s.pathname}`;e.endsWith("/index.html")&&(e=e.substring(0,e.length-10)),p.search&&(e+=s.search),m(caches.match(e).then((s=>s??h(n,!0).then((n=>{if(f(n)){const s=n.clone();caches.open(t).then((t=>t.put(e,s)))}return n})))))}else{const t=o(n.url);m(t?h(n,!1,t):((t,e)=>a(t,!1,l(t),e))(n).catch((t=>new Response(t,{status:499}))))}})),self.addEventListener("message",(t=>{"update"===t.data&&m().then((e=>{e.type="update",t.source.postMessage(e)}))}));const m=async()=>{const a=await h(new Request("/update.json"),!1);if(!f(a))throw`加载 update.json 时遇到异常，状态码：${a.status}`;const c=await a.json(),r=await(t=>n().then((e=>{const{info:n,global:a}=t,c={global:a,local:n[0].version,escape:e?.escape??0};if(!e)return c.escape=18,s(c),{new:c,old:e};let r=new p,i=((t,e,n)=>{for(let s of e){const{version:e,change:a}=s;if(e===n)return!1;if(a)for(let e of a)t.push(new d(e))}return!0})(r,n,e.local);return s(c),i&&(a!==e.global?r.force=!0:r.refresh=!0),{list:r,new:c,old:e}})))(c);if(r.list){const n=await(n=>caches.open(t).then((t=>t.keys().then((s=>Promise.all(s.map((async s=>{const a=s.url;return a!==e&&n.match(a)?(t.delete(s),a):null}))))).then((t=>t.filter((t=>t)))))))(r.list);r.list=n?.length?n:null}return r};function p(){const t=[];this.push=e=>{t.push(e)},this.match=e=>{if(this.force)return!0;if(e=new URL(e),this.refresh)return r(e).clean;for(let n of t)if(n.match(e))return!0;return!1}}function d(t){const e=e=>{const n=t.value;if(Array.isArray(n)){for(let t of n)if(e(t))return!0;return!1}return e(n)};this.match=(()=>{switch(t.flag){case"html":return t=>t.pathname.match(/(\/|\.html)$/);case"end":return t=>e((e=>t.href.endsWith(e)));case"begin":return t=>e((e=>t.pathname.startsWith(e)));case"str":return t=>e((e=>t.href.includes(e)));case"reg":return t=>e((e=>t.href.match(new RegExp(e,"i"))));default:throw`未知表达式：${JSON.stringify(t)}`}})()}})();
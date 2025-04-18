(()=>{"use strict";const e={formatDateTime:e=>{const t=new Date(e);return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")} ${String(t.getUTCHours()+8).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}:${String(t.getUTCSeconds()).padStart(2,"0")}`},umiToken:"fM7+vUSp/wpEp/mp0LxXrjS46tMQWimFhssZdUuj2SADnmGfHo5rZMOh4PpYSumeLcUNt4a2+q0TNW6VH5vymKH3YFxPNxOm28yjdAAHD/Tew66V/8Ad/K9dXxULUuMWaSL2hUS2zTGIZWipOYUHzkjRFwShDAYQwfbgOGrmgW/P36qqr9FaZaKt9LYVkbY9hQKQ4tRTlhc8zFgwIn/q3Rw/ot7G0HVprAk3PwBkEdyDfPQd7kchi/f+g1g+1X856/v0O7GirvBeQQ7TPhi4/H0/kNm+ZABPDk6+VomlMNnYdZi1KiW90SfTOcUDlvObyKUbCsQpl/LMiDeAtby+0pzkqaSLSpsr7Y5eoR4pDP4Wt+RaZkkHjawJfYjc",fetchUmami:async(e,t,a)=>{try{if(!e||!t||!a)throw new Error("参数 startAt、endAt 或 umiToken 不完整");const n=new URL("https://umami.aimiliy.top/api/websites/3348d0ad-813b-4d17-98d2-d5404445f786/stats");n.searchParams.append("startAt",e.getTime()),n.searchParams.append("endAt",t.getTime());const i=await fetch(n.toString(),{method:"GET",cache:"default",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}});if(!i.ok)throw new Error(`请求失败，状态码：${i.status} ${i.statusText}`);return await i.json()}catch(e){throw console.error("获取 umami 统计数据失败：",e.message),e}}},t={init:()=>{ScrollReveal({distance:"30px",duration:1e3,delay:200,interval:0,easing:"cubic-bezier(0.25, 0.8, 0.25, 1)",reset:!1}).reveal(".wow",{origin:"bottom",opacity:0,scale:.5,mobile:!1})}},a=(()=>{const e={defaultMusic:{id:"7397995017",type:"playlist",server:"tencent"},canvas:document.getElementById("visualizer"),visualizer:{fftSize:256,smoothing:.9,shadowBlur:15}},t=e.canvas.getContext("2d");let a,n,i,o,r,s,l,c,d,m=.8;const u=(e=!0)=>{const t=document.getElementById("an_music_bg");if(e){const e=document.querySelector("#anMusic-page .aplayer-pic"),a=e.querySelectorAll("div.child");if(a.length>0)a[0].style.backgroundImage=e.style.backgroundImage;else{const t=document.createElement("div");t.classList.add("child"),t.style.backgroundImage=e.style.backgroundImage,e.appendChild(t)}t.style.backgroundImage=e.style.backgroundImage}else{let e=setInterval((()=>{const a=document.querySelector("#anMusic-page .aplayer-pic");if(a){clearInterval(e);const n=a.querySelectorAll("div.child");if(n.length>0)n[0].style.backgroundImage=a.style.backgroundImage;else{const e=document.createElement("div");e.classList.add("child"),e.style.backgroundImage=a.style.backgroundImage,a.appendChild(e)}t.style.backgroundImage=a.style.backgroundImage,g()}}),100)}},g=()=>{const a=document.getElementById("anMusic-page"),n=a.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu"),o=a.querySelector("#anMusicBtnGetSong"),r=a.querySelector("#anMusicRefreshBtn"),s=a.querySelector("#anMusicSwitching"),c=document.getElementById("menu-mask"),d=a.querySelector("meting-js").aplayer;d.volume(m,!0),d.on("loadeddata",u),e.canvas.width=window.innerWidth>1500?1500:.95*window.innerWidth;const g=document.querySelector("#anMusic-page .aplayer-pic"),p=document.querySelector("#anMusic-page .aplayer-pic .child"),f=e=>{p&&(p.style.animationPlayState=e)};d.on("play",(()=>{g.classList.contains("turn-around")||g.classList.add("turn-around"),f("running");const e=d.audio;"suspended"===i.state&&i.resume(),h(e);const t=d.list.audios[d.list.index];navigator.mediaSession.metadata=new MediaMetadata({title:t.name,artist:t.artist,album:t.artist,artwork:[{src:t.cover||""}]})})),d.on("pause",(()=>{g.classList.contains("turn-around")&&g.classList.remove("turn-around"),f("paused"),setTimeout((()=>{window.cancelAnimationFrame(l),t.clearRect(0,0,e.canvas.width,e.canvas.height)}),1e3)}));const v=btf.throttle((()=>{e.canvas.width=window.innerWidth>1500?1500:.95*window.innerWidth}),100,{leading:!0,trailing:!0}),y=btf.debounce((()=>{S(d)}),300,!0),k=btf.debounce((()=>{M().then((e=>{}))}),300,!0),I=btf.debounce((()=>{E().then((e=>{}))}),300,!0),C=()=>{d&&d.destroy()},L=btf.debounce((e=>{T(e,d)}),200,!0);[{event:"resize",selector:window,callback:v,eventName:"onCanvasResize"},{event:"click",selector:n,callback:w,eventName:"openMenu"},{event:"click",selector:c,callback:b,eventName:"closeMenu"},{event:"click",selector:o,callback:y,eventName:"onPlayRandomSongClick"},{event:"click",selector:r,callback:k,eventName:"onRefreshMusicListClick"},{event:"click",selector:s,callback:I,eventName:"onChangeMusicListClick"},{event:"onbeforeunload",selector:document,callback:C,eventName:"onDestroyBeforeunload"},{event:"onbeforeunload",selector:document,callback:C,eventName:"onDestroyBeforeunload"},{event:"keydown",selector:document,callback:L,eventName:"onKeydownHandleKeyboardEvents"}].forEach((e=>{btf.addEventListenerPjax(e.event,e.selector,e.callback,e.eventName)}))},h=e=>{s||(s=e,r=i.createMediaElementSource(s),r.connect(o),o.connect(i.destination)),y()},p=e=>{const t=e.match(/rgb\((\d+), (\d+), (\d+)\)/);if(!t)throw new Error("Invalid RGB string format");const a=parseInt(t[1],10),n=parseInt(t[2],10),i=parseInt(t[3],10);let o=Math.min(a+40,255),r=Math.min(n+40,255),s=Math.min(i+40,255);return o=o.toString(16).padStart(2,"0"),r=r.toString(16).padStart(2,"0"),s=s.toString(16).padStart(2,"0"),`#${o}${r}${s}`};let f=btf.map.get(localStorage.getItem("themeColor")),v=p(f);const y=()=>{l=requestAnimationFrame(y),o.getByteFrequencyData(d),t.clearRect(0,0,e.canvas.width,e.canvas.height),f!==btf.map.get(localStorage.getItem("themeColor"))&&(f=btf.map.get(localStorage.getItem("themeColor")),v=p(f));const a=2*c,n=a-1,i=(e.canvas.width-1*n-1)/a,r=e.canvas.width/2,s=t.createLinearGradient(0,0,0,e.canvas.height);s.addColorStop(0,f),t.shadowBlur=15,t.shadowColor=v,t.fillStyle=s;for(let a=0;a<c;a++){const n=.5*d[a],o=i*(1-n/e.canvas.height),s=r-.5-a*(i+1)-i,l=r+.5+a*(i+1);t.beginPath(),t.moveTo(s,e.canvas.height),t.lineTo(s+i,e.canvas.height),t.lineTo(s+i-o/2,e.canvas.height-n),t.lineTo(s+o/2,e.canvas.height-n),t.closePath(),t.fill(),t.beginPath(),t.moveTo(l,e.canvas.height),t.lineTo(l+i,e.canvas.height),t.lineTo(l+i-o/2,e.canvas.height-n),t.lineTo(l+o/2,e.canvas.height-n),t.closePath(),t.fill()}},w=()=>{const e=document.getElementById("menu-mask");e.style.display="block",e.style.animation="0.5s ease 0s 1 normal none running to_show",document.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"},b=()=>{"/life/music/"===window.location.pathname&&document.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")},k=e=>{for(let t=e.length-1;t>0;t--){const a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e},S=e=>{const t=e.list.audios;if(!t||t.length<2)return;let a;try{if(a=JSON.parse(localStorage.getItem("shuffledPlaylist"))||[],!Array.isArray(a))throw new Error("shuffledPlaylist is not a valid array")}catch(e){a=[],console.log("Error parsing shuffledPlaylist from localStorage:",e)}0!==a.length&&a.length!==t.length||(a=k([...Array(t.length).keys()]));const n=a.shift();localStorage.setItem("shuffledPlaylist",JSON.stringify(a)),e.list.switch(n),e.play()},M=async()=>{const t=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;t.seek(0),t.pause(),a=e.defaultMusic,localStorage.setItem("localMusic",JSON.stringify(e.defaultMusic));const n=I(a);try{const e=await C(n);e.length>0&&(t.list.clear(),t.list.add(e))}catch(e){console.error("Error changing music list:",e)}},E=async()=>{const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;let t;localStorage.removeItem("shuffledPlaylist"),e.seek(0),e.pause();try{if(t=JSON.parse(localStorage.getItem("shuffledMusicList"))||[],!Array.isArray(t))throw new Error("shuffledMusicList is not a valid array")}catch(e){t=[],console.log("Error parsing shuffledMusicList from localStorage:",e)}0!==t.length&&t.length!==n.length||(t=k([...Array(n.length).keys()]));let i=t.shift();for(;n[i].id===a.id&&t.length>0;)i=t.shift();localStorage.setItem("shuffledMusicList",JSON.stringify(t)),a=n[i],localStorage.setItem("localMusic",JSON.stringify(a));const o=I(a);try{const t=await C(o);t.length>0&&(e.list.clear(),e.list.add(t))}catch(e){console.error("Error changing music list:",e)}},I=e=>`https://twikoo.aimiliy.top/music/api?server=${e.server}&type=${e.type}&id=${e.id}&auth=undefined&r=${Math.random()*Date.now()}`,C=async e=>{try{const t=await fetch(e);return t.ok?await t.json():[]}catch(e){return console.error("Error fetching songs:",e),[]}},T=(e,t)=>{if("/life/music/"===window.location.pathname)switch(e.code){case"Space":e.preventDefault(),t.toggle();break;case"ArrowRight":e.preventDefault(),t.skipForward();break;case"ArrowLeft":e.preventDefault(),t.skipBack();break;case"ArrowUp":m<=1&&(m+=.1,t.volume(m,!0));break;case"ArrowDown":m>=0&&(m-=.1,t.volume(m,!0))}};return{init:()=>{document.getElementById("anMusic-page-meting").innerHTML='<meting-js id="7397995017" server="tencent" type="playlist" mutex="true" preload="auto" theme="var(--theme-color)" order="list" list-max-height="320px"></meting-js>',(()=>{try{a=JSON.parse(localStorage.getItem("localMusic"))||e.defaultMusic}catch{a=e.defaultMusic,localStorage.removeItem("localMusic")}localStorage.setItem("defaultMusic",JSON.stringify(e.defaultMusic)),localStorage.setItem("localMusic",JSON.stringify(a))})(),i=new(window.AudioContext||window.webkitAudioContext),o=i.createAnalyser(),o.fftSize=e.visualizer.fftSize,o.smoothingTimeConstant=e.visualizer.smoothing,c=o.frequencyBinCount,d=new Uint8Array(c),(async()=>{if(!n)try{const e=await fetch("https://cdn.aimiliy.top/npm/json/musicListCache.json");n=e.ok?await e.json():[{id:"7397995017",type:"playlist",server:"tencent"}]}catch(e){n=[{id:"7397995017",type:"playlist",server:"tencent"}],console.log("fetch remote musicList error:",e)}})(),u(!1)}}})(),n=(()=>{const e=()=>{UserConfig={private_api_url:UserConfig?.private_api_url||"",page_turning_number:UserConfig?.page_turning_number||20,error_img:UserConfig?.error_img||"https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"};const e=document.getElementById("friend-circle-lite-root");if(!e)return;e.innerHTML="";const t=document.createElement("div");t.id="random-article",e.appendChild(t);const a=document.createElement("div");a.className="articles-container",a.id="articles-container",e.appendChild(a);const n=document.createElement("button");n.id="load-more-btn",n.innerText="再来亿点",e.appendChild(n);const i=document.createElement("div");i.id="stats-container",e.appendChild(i);let o=0,r=[];const s=()=>{const e="friend-circle-lite-cache",t="friend-circle-lite-cache-time",a=localStorage.getItem(t),i=(new Date).getTime();if(a&&i-a<6e5){const t=JSON.parse(localStorage.getItem(e));if(t)return void l(t)}fetch(`${UserConfig.private_api_url}all.json`).then((e=>e.json())).then((a=>{localStorage.setItem(e,JSON.stringify(a)),localStorage.setItem(t,i.toString()),l(a)})).finally((()=>{n.innerText="再来亿点"}))},l=e=>{r=e.article_data;const t=e.statistical_data;i.innerHTML=`\n            <div>Powered by: <a href="https://github.com/willow-god/Friend-Circle-Lite" target="_blank">FriendCircleLite</a><br></div>\n            <div>Designed By: <a href="https://www.liushen.fun/" target="_blank">LiuShen</a><br></div>\n            <div>订阅:${t.friends_num}   活跃:${t.active_num}   总文章数:${t.article_num}<br></div>\n            <div>更新时间:${t.last_updated_time}</div>\n        `,c();r.slice(o,o+UserConfig.page_turning_number).forEach((e=>{const t=document.createElement("div");t.className="card";const n=document.createElement("div");n.className="card-title",n.innerText=e.title,t.appendChild(n),n.onclick=()=>window.open(e.link,"_blank");const i=document.createElement("div");i.className="card-author";const o=document.createElement("img");o.className="no-lightbox",o.src=e.avatar||UserConfig.error_img,o.onerror=()=>o.src=UserConfig.error_img,i.appendChild(o),i.appendChild(document.createTextNode(e.author)),t.appendChild(i),i.onclick=()=>{d(e.author,e.avatar,e.link)};const r=document.createElement("div");r.className="card-date",r.innerText="🗓️"+e.created.substring(0,10),t.appendChild(r);const s=document.createElement("img");s.className="card-bg no-lightbox",s.src=e.avatar||UserConfig.error_img,s.onerror=()=>s.src=UserConfig.error_img,t.appendChild(s),a.appendChild(t)})),o+=UserConfig.page_turning_number,o>=r.length&&(n.style.display="none")},c=()=>{const e=r[Math.floor(Math.random()*r.length)];t.innerHTML=`\n            <div class="random-container">\n                <div class="random-container-title">随机钓鱼</div>\n                <div class="random-title">${e.title}</div>\n                <div class="random-author">作者: ${e.author}</div>\n            </div>\n            <div class="random-button-container">\n                <a href="#" id="refresh-random-article">刷新</a>\n                <button class="random-link-button" onclick="window.open('${e.link}', '_blank')">过去转转</button>\n            </div>\n        `;document.getElementById("refresh-random-article").addEventListener("click",(function(e){e.preventDefault(),c()}))},d=(t,a,n)=>{if(!document.getElementById("fclite-modal")){const t=document.createElement("div");t.id="modal",t.className="modal",t.innerHTML='\n            <div class="modal-content">\n                <img id="modal-author-avatar" src="" alt="">\n                <a id="modal-author-name-link"></a>\n                <div id="modal-articles-container"></div>\n                <img id="modal-bg" src="" alt="">\n            </div>\n            ',e.appendChild(t)}const i=document.getElementById("modal"),o=document.getElementById("modal-articles-container"),s=document.getElementById("modal-author-avatar"),l=document.getElementById("modal-author-name-link"),c=document.getElementById("modal-bg");o.innerHTML="",s.src=a||UserConfig.error_img,s.onerror=()=>s.src=UserConfig.error_img,c.src=a||UserConfig.error_img,c.onerror=()=>c.src=UserConfig.error_img,l.innerText=t,l.href=new URL(n).origin;r.filter((e=>e.author===t)).slice(0,4).forEach((e=>{const t=document.createElement("div");t.className="modal-article";const a=document.createElement("a");a.className="modal-article-title",a.innerText=e.title,a.href=e.link,a.target="_blank",t.appendChild(a);const n=document.createElement("div");n.className="modal-article-date",n.innerText="📅"+e.created.substring(0,10),t.appendChild(n),o.appendChild(t)})),i.style.display="block",setTimeout((()=>{i.classList.add("modal-open")}),10)};s(),n.addEventListener("click",s),window.onclick=t=>{const a=document.getElementById("modal");t.target===a&&(()=>{const t=document.getElementById("modal");t.classList.remove("modal-open"),t.addEventListener("transitionend",(()=>{t.style.display="none",e.removeChild(t)}),{once:!0})})()}};return{init:()=>{e()}}})(),i=(()=>{const e=new Swiper(".blog-slider",{spaceBetween:30,effect:"fade",loop:!0,autoplay:{disableOnInteraction:!0,delay:3e3},mousewheel:!0,pagination:{el:".blog-slider__pagination",clickable:!0},passiveListeners:!0});return{init:()=>{(()=>{const t=document.getElementById("swiper_container");t&&(t.onmouseenter=function(){e.autoplay.stop()},t.onmouseleave=function(){e.autoplay.start()})})()}}})(),o=[{path:"/personal/about/",modules:[{init:async()=>{await(async()=>{const t="fM7+vUSp/wpEp/mp0LxXrjS46tMQWimFhssZdUuj2SADnmGfHo5rZMOh4PpYSumeLcUNt4a2+q0TNW6VH5vymKH3YFxPNxOm28yjdAAHD/Tew66V/8Ad/K9dXxULUuMWaSL2hUS2zTGIZWipOYUHzkjRFwShDAYQwfbgOGrmgW/P36qqr9FaZaKt9LYVkbY9hQKQ4tRTlhc8zFgwIn/q3Rw/ot7G0HVprAk3PwBkEdyDfPQd7kchi/f+g1g+1X856/v0O7GirvBeQQ7TPhi4/H0/kNm+ZABPDk6+VomlMNnYdZi1KiW90SfTOcUDlvObyKUbCsQpl/LMiDeAtby+0pzkqaSLSpsr7Y5eoR4pDP4Wt+RaZkkHjawJfYjc",a=new Date,n=new Date(a.setHours(0,0,0,0)),i=new Date(a.getFullYear(),a.getMonth(),a.getDate()-1),o=new Date(a.getFullYear(),a.getMonth(),a.getDate()-1,23,59,59,999),r=new Date(a.getFullYear(),a.getMonth(),1),s=new Date(2024,1,1);s.setHours(0,0,0,0);try{const[c,d,m,u]=await Promise.all([e.fetchUmami(i,o,t),e.fetchUmami(n,new Date,t),e.fetchUmami(r,new Date,t),e.fetchUmami(s,new Date,t)]),g=["最近活跃","今日人数","今日访问","昨日人数","昨日访问","本月访问","总访问量"],h=[null,d.visitors?.value||0,d.pageviews?.value||0,c.visitors?.value||0,c.pageviews?.value||0,m.pageviews?.value||0,u.pageviews?.value||0];let p=document.getElementById("statistic");if(!p)return void console.log("Dom元素不存在");let f=[];for(let w=0;w<h.length;w++)0!==w&&(p.innerHTML+=`<div><span>${g[w]}</span><span id="${g[w]}">${h[w]}</span></div>`,queueMicrotask((()=>{f.push(new CountUp(g[w],0,h[w],0,2,{useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""}))})));let v=document.querySelector(".about-statistic.author-content-item");function y(){v&&new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting){for(let e=0;e<h.length;e++)0!==e&&queueMicrotask((()=>{f[e-1].start()}));t.disconnect()}}))}),{root:null,rootMargin:"0px",threshold:0}).observe(v)}y()}catch(b){console.log("获取统计数据失败：",b)}let l=null;l=setInterval((function(){const e=document.querySelector("span[data-show]"),t=e.nextElementSibling||document.querySelector(".first-tips"),a=document.querySelector("span[data-up]");a&&a.removeAttribute("data-up"),e.removeAttribute("data-show"),e.setAttribute("data-up",""),t.setAttribute("data-show","")}),2e3),document.addEventListener("pjax:send",(function(){l&&clearInterval(l)}))})()}}]},{path:"/personal/bb/",modules:[(()=>{let t=0,a=0,n=[],i=1;const o=document.getElementById("more"),r=document.getElementById("bb_loading");let s=document.getElementById("bb-main");const l=()=>{o.style.display="none",r.style.display="block",setTimeout((()=>{fetch("https://linghua.aimiliy.top/api/bb/list?page="+i+"&size=12").then((e=>e.json())).then((e=>{t=e.data.total,n=e.data.items,a+=n.length,1===i&&(document.querySelector(".bb-info").innerHTML='<svg style="width:1.20em;height:1.20em;top:5px;fill:currentColor;overflow:hidden;position:relative"><use xlink:href="#icon-chat"></svg> 站长的日常分享('+t+")"),i+=1})).then((()=>{c(),a<t&&(o.style.display="block"),r.style.display="none"}))}),300)},c=()=>{n.forEach((t=>{let a=e.formatDateTime(t.createdAt),n=document.createElement("div");t.content=m(t.content);let i=d(t.content);n.className="bb-card",n.innerHTML='<div class="card-header"><div class="avatar"><img class="nofancybox"src="'+t.author.avatar+'"></div><div class="bb-info-avatar"><span><div class="name">'+t.author.nickName+'</div><svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="is-badge"><path  d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"></path></svg></span><div class="card-time">'+a+'</div></div></div><div class="card-content">'+t.content+'</div><div class="card-footer"><div data-v-185689ea=""class="card-label"style="background: '+t.tag.bgColor+'; color: white;">'+t.tag.name+'</div><div class="bb-fos" onclick="rmf.rightMenuCommentText('+`&quot;${i}&quot;)"><svg style="width:1.60em;height:1.60em;fill:var(--theme-color);overflow:hidden;cursor: pointer;"><use xlink:href="#icon-xiaoxi"></use></svg></div></div>`,s.appendChild(n)}))},d=e=>e.replace(/<[^>]+>.*?<\/[^>]+>|<[^>]+\/>|<[^>]+>/gis,"").replace(/^\s+|\s+$/g,""),m=e=>{let t=e.match(/(http(.*).[jpg|png|gif])/g);e=(e=e.replace(/<img(.*?)src=[\"|\']?(.*?)[\"|\']?(.*?)>|!\[(.*?)\]\((.*?)\)/g,"")).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");let a="<br>";return t&&t.forEach((e=>{a+='<a href="'+e+'" target="_blank" data-fancybox="group" class="fancybox"><img src="'+e+'" style="max-width: 100%; object-fit: cover"></a>'})),(e+=a).replace(/(<br\s*\/?>)+$/,"")};return{init:()=>{l(),o&&o.addEventListener("click",l)}}})()]},{path:"/life/music/",modules:[a]},{path:"/social/fcircle/",modules:[n]},{path:"/site/census/",modules:[{init:async()=>{await(async()=>{const t=new Date,a=new Date(t.setHours(0,0,0,0)),n=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1,23,59,59,999),o=new Date(t.getFullYear(),t.getMonth(),1);try{const[r,s,l]=await Promise.all([e.fetchUmami(n,i,e.umiToken),e.fetchUmami(a,new Date,e.umiToken),e.fetchUmami(o,new Date,e.umiToken)]),c=["今日人数","昨日人数","今日访问","昨日访问","本月访问"],d=[s.visitors?.value||0,r.visitors?.value||0,s.pageviews?.value||0,r.pageviews?.value||0,l.pageviews?.value||0],m=document.querySelector("#statisticW .content");if(!m)return void console.log("Dom元素不存在");let u=[];for(let p=0;p<d.length;p++)m.innerHTML+=`<div><span>${c[p]}</span><span id="${c[p]}" class="num">${d[p]}</span></div>`,queueMicrotask((()=>{u.push(new CountUp(c[p],0,d[p],0,2,{useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""}))}));let g=document.querySelector("#statisticW .content");function h(){g&&new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting){for(let e=0;e<d.length;e++)queueMicrotask((()=>{u[e].start()}));t.disconnect()}}))}),{root:null,rootMargin:"0px",threshold:0}).observe(g)}h()}catch(f){console.log("获取统计数据失败：",f)}})()}}]}],r=[t,i];(()=>{const e=window.location.pathname;/^\/(?:page\/\d+\/|)$/.test(window.location.pathname)&&r.forEach((e=>e.init?.()));for(const t of o)if(e.startsWith(t.path)){t.modules.forEach((e=>e.init?.()));break}})()})();
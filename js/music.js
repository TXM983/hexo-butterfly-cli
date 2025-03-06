var defaultMusic={id:"7397995017",type:"playlist",server:"tencent"},localMusic=null;try{localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic}catch(e){localMusic=defaultMusic,localStorage.removeItem("localMusic"),console.log("Error parsing localMusic from localStorage:",e)}var musicVolume=.8,musicListCache=null,canvas=document.getElementById("visualizer"),ctx=canvas.getContext("2d"),audioContext=new(window.AudioContext||window.webkitAudioContext),analyser=audioContext.createAnalyser();analyser.fftSize=256,analyser.smoothingTimeConstant=.85;var bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength);let sourceNode=null,audioElement=null;var fftId;const initLocalStorage=()=>{localStorage.getItem("defaultMusic")||localStorage.setItem("defaultMusic",JSON.stringify(defaultMusic)),localStorage.getItem("localMusic")||localStorage.setItem("localMusic",JSON.stringify(localMusic))},loadMusicListCache=async()=>{if(!musicListCache)try{const e=await fetch("https://cdn.aimiliy.top/npm/json/musicListCache.json");musicListCache=e.ok?await e.json():[{id:"7397995017",type:"playlist",server:"tencent"}]}catch(e){musicListCache=[{id:"7397995017",type:"playlist",server:"tencent"}],console.log("fetch remote musicList error:",e)}};var musicPlayerModule=(()=>{const e=(e=!0)=>{if("/life/music/"!==window.location.pathname)return;const a=document.getElementById("an_music_bg");if(e){const e=document.querySelector("#anMusic-page .aplayer-pic"),t=e.querySelectorAll("div.child");if(t.length>0)t[0].style.backgroundImage=e.style.backgroundImage;else{const t=document.createElement("div");t.classList.add("child"),t.style.backgroundImage=e.style.backgroundImage,e.appendChild(t)}a.style.backgroundImage=e.style.backgroundImage}else{let e=setInterval((()=>{const n=document.querySelector("#anMusic-page .aplayer-pic");if(n){clearInterval(e);const o=n.querySelectorAll("div.child");if(o.length>0)o[0].style.backgroundImage=n.style.backgroundImage;else{const e=document.createElement("div");e.classList.add("child"),e.style.backgroundImage=n.style.backgroundImage,n.appendChild(e)}a.style.backgroundImage=n.style.backgroundImage,t()}}),100)}},t=()=>{const t=document.getElementById("anMusic-page"),o=t.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu"),i=t.querySelector("#anMusicBtnGetSong"),l=t.querySelector("#anMusicRefreshBtn"),c=t.querySelector("#anMusicSwitching"),u=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;u.volume(musicVolume,!0),u.on("loadeddata",e),canvas.width=window.innerWidth>1500?1500:.95*window.innerWidth;const h=document.querySelector("#anMusic-page .aplayer-pic"),y=document.querySelector("#anMusic-page .aplayer-pic .child"),p=e=>{y&&(y.style.animationPlayState=e)};u.on("play",(()=>{h.classList.contains("turn-around")||h.classList.add("turn-around"),p("running");const e=u.audio;"suspended"===audioContext.state&&audioContext.resume(),n(e)})),u.on("pause",(()=>{h.classList.contains("turn-around")&&h.classList.remove("turn-around"),p("paused"),window.cancelAnimationFrame(fftId),ctx.clearRect(0,0,canvas.width,canvas.height)})),window.addEventListener("resize",a((()=>{canvas.width=window.innerWidth>1500?1500:.95*window.innerWidth}),50)),o.addEventListener("click",s),document.getElementById("menu-mask").addEventListener("click",r),i.addEventListener("click",(()=>d(u))),l.addEventListener("click",m),c.addEventListener("click",g),document.addEventListener("onbeforeunload",(()=>{u&&u.destroy()})),document.addEventListener("keydown",(e=>f(e,u)))},a=(e,t)=>{let a=0;return function(...n){const o=Date.now();o-a>=t&&(a=o,e(...n))}},n=e=>{audioElement||(audioElement=e,sourceNode=audioContext.createMediaElementSource(audioElement),sourceNode.connect(analyser),analyser.connect(audioContext.destination),c())},o=e=>{const t=e.match(/rgb\((\d+), (\d+), (\d+)\)/);if(!t)throw new Error("Invalid RGB string format");const a=parseInt(t[1],10),n=parseInt(t[2],10),o=parseInt(t[3],10);let i=Math.min(a+40,255),l=Math.min(n+40,255),c=Math.min(o+40,255);return i=i.toString(16).padStart(2,"0"),l=l.toString(16).padStart(2,"0"),c=c.toString(16).padStart(2,"0"),`#${i}${l}${c}`};let i=map.get(localStorage.getItem("themeColor")),l=o(i);const c=()=>{fftId=requestAnimationFrame(c),analyser.getByteFrequencyData(dataArray),ctx.clearRect(0,0,canvas.width,canvas.height),i!==map.get(localStorage.getItem("themeColor"))&&(i=map.get(localStorage.getItem("themeColor")),l=o(i));const e=2*bufferLength,t=e-1,a=(canvas.width-1*t-1)/e,n=canvas.width/2,s=ctx.createLinearGradient(0,0,0,canvas.height);s.addColorStop(0,i),ctx.shadowBlur=15,ctx.shadowColor=l,ctx.fillStyle=s;for(let e=0;e<bufferLength;e++){const t=.5*dataArray[e],o=a*(1-t/canvas.height),i=n-.5-e*(a+1)-a,l=n+.5+e*(a+1);ctx.beginPath(),ctx.moveTo(i,canvas.height),ctx.lineTo(i+a,canvas.height),ctx.lineTo(i+a-o/2,canvas.height-t),ctx.lineTo(i+o/2,canvas.height-t),ctx.closePath(),ctx.fill(),ctx.beginPath(),ctx.moveTo(l,canvas.height),ctx.lineTo(l+a,canvas.height),ctx.lineTo(l+a-o/2,canvas.height-t),ctx.lineTo(l+o/2,canvas.height-t),ctx.closePath(),ctx.fill()}},s=()=>{const e=document.getElementById("menu-mask");e.style.display="block",e.style.animation="0.5s ease 0s 1 normal none running to_show",document.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"},r=()=>{"/life/music/"===window.location.pathname&&document.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")},u=e=>{for(let t=e.length-1;t>0;t--){const a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e},d=e=>{const t=e.list.audios;if(!t||t.length<2)return;let a;try{if(a=JSON.parse(localStorage.getItem("shuffledPlaylist"))||[],!Array.isArray(a))throw new Error("shuffledPlaylist is not a valid array")}catch(e){a=[],console.log("Error parsing shuffledPlaylist from localStorage:",e)}0!==a.length&&a.length!==t.length||(a=u([...Array(t.length).keys()]));const n=a.shift();localStorage.setItem("shuffledPlaylist",JSON.stringify(a)),e.list.switch(n),e.play()},m=async()=>{const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;localMusic=defaultMusic,localStorage.setItem("localMusic",JSON.stringify(defaultMusic));const t=h(localMusic);try{const a=await y(t);a.length>0&&(e.list.clear(),e.list.add(a))}catch(e){console.error("Error changing music list:",e)}},g=async()=>{const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;let t;localStorage.removeItem("shuffledPlaylist");try{if(t=JSON.parse(localStorage.getItem("shuffledMusicList"))||[],!Array.isArray(t))throw new Error("shuffledMusicList is not a valid array")}catch(e){t=[],console.log("Error parsing shuffledMusicList from localStorage:",e)}0!==t.length&&t.length!==musicListCache.length||(t=u([...Array(musicListCache.length).keys()])),e.seek(0),e.pause();const a=t.shift();localStorage.setItem("shuffledMusicList",JSON.stringify(t)),localMusic=musicListCache[a],localStorage.setItem("localMusic",JSON.stringify(localMusic));const n=h(localMusic);try{const t=await y(n);t.length>0&&(e.list.clear(),e.list.add(t))}catch(e){console.error("Error changing music list:",e)}},h=e=>`https://twikoo.aimiliy.top/music/api?server=${e.server}&type=${e.type}&id=${e.id}&auth=undefined&r=${Math.random()*Date.now()}`,y=async e=>{try{const t=await fetch(e);return t.ok?await t.json():[]}catch(e){return console.error("Error fetching songs:",e),[]}},f=(e,t)=>{if("/life/music/"===window.location.pathname)switch(e.code){case"Space":e.preventDefault(),t.toggle();break;case"ArrowRight":e.preventDefault(),t.skipForward();break;case"ArrowLeft":e.preventDefault(),t.skipBack();break;case"ArrowUp":musicVolume<=1&&(musicVolume+=.1,t.volume(musicVolume,!0));break;case"ArrowDown":musicVolume>=0&&(musicVolume-=.1,t.volume(musicVolume,!0))}};return{init:async()=>{e(!1)}}})();const init=()=>{if("/life/music/"!==window.location.pathname)return;document.getElementById("anMusic-page-meting").innerHTML='<meting-js id="7397995017" server="tencent" type="playlist" mutex="true" preload="auto" theme="var(--theme-color)" order="list" list-max-height="320px"></meting-js>',musicPlayerModule.init(!1).catch(console.error)};document.addEventListener("DOMContentLoaded",(()=>{if("/life/music/"===window.location.pathname){defaultMusic={id:"7397995017",type:"playlist",server:"tencent"};try{localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic}catch(e){localMusic=defaultMusic,localStorage.removeItem("localMusic"),console.log("Error parsing localMusic from localStorage:",e)}musicVolume=.8,musicListCache=null,audioContext=new(window.AudioContext||window.webkitAudioContext),(analyser=audioContext.createAnalyser()).fftSize=256,analyser.smoothingTimeConstant=.85,bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength),sourceNode=null,audioElement=null,init(),initLocalStorage(),loadMusicListCache().then((e=>{}))}})),document.addEventListener("pjax:complete",(()=>{if("/life/music/"===window.location.pathname){defaultMusic={id:"7397995017",type:"playlist",server:"tencent"};try{localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic}catch(e){localMusic=defaultMusic,localStorage.removeItem("localMusic"),console.log("Error parsing localMusic from localStorage:",e)}musicVolume=.8,musicListCache=null,audioContext=new(window.AudioContext||window.webkitAudioContext),(analyser=audioContext.createAnalyser()).fftSize=256,analyser.smoothingTimeConstant=.85,bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength),sourceNode=null,audioElement=null,init(),initLocalStorage(),loadMusicListCache().then((e=>{}))}}));
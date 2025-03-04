var defaultMusic={id:"7397995017",type:"playlist",server:"tencent"},localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic,musicVolume=.8,musicListCache=null,canvas=document.getElementById("visualizer"),ctx=canvas.getContext("2d"),audioContext=new(window.AudioContext||window.webkitAudioContext),analyser=audioContext.createAnalyser();analyser.fftSize=256,analyser.smoothingTimeConstant=.85;var bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength);let sourceNode=null,audioElement=null;const initLocalStorage=()=>{localStorage.getItem("defaultMusic")||localStorage.setItem("defaultMusic",JSON.stringify(defaultMusic)),localStorage.getItem("localMusic")||localStorage.setItem("localMusic",JSON.stringify(localMusic))},loadMusicListCache=async()=>{if(!musicListCache)try{const e=await fetch("https://cdn.aimiliy.top/npm/json/musicListCache.json");musicListCache=e.ok?await e.json():[{id:"7397995017",type:"playlist",server:"tencent"}]}catch(e){musicListCache=[{id:"7397995017",type:"playlist",server:"tencent"}]}};var musicPlayerModule=(()=>{const e=(e=!0)=>{if("/life/music/"!==window.location.pathname)return;const a=document.getElementById("an_music_bg");if(e){const e=document.querySelector("#anMusic-page .aplayer-pic");a.style.backgroundImage=e.style.backgroundImage}else{let e=setInterval((()=>{const n=document.querySelector("#anMusic-page .aplayer-pic");n&&(clearInterval(e),a.style.backgroundImage=n.style.backgroundImage,t())}),100)}},t=()=>{const t=document.getElementById("anMusic-page"),i=t.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu"),o=t.querySelector("#anMusicBtnGetSong"),c=t.querySelector("#anMusicRefreshBtn"),l=t.querySelector("#anMusicSwitching"),g=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;g.volume(musicVolume,!0),g.on("loadeddata",e),g.on("play",(()=>{const e=g.audio;"suspended"===audioContext.state&&audioContext.resume(),n(e)})),window.addEventListener("resize",a((()=>{canvas.width=window.innerWidth>1500?1500:.95*window.innerWidth}),50)),i.addEventListener("click",s),document.getElementById("menu-mask").addEventListener("click",r),o.addEventListener("click",(()=>u(g))),c.addEventListener("click",d),l.addEventListener("click",m),document.addEventListener("onbeforeunload",(()=>{g&&g.destroy()})),document.addEventListener("keydown",(e=>y(e,g)))},a=(e,t)=>{let a=0;return function(...n){const i=Date.now();i-a>=t&&(a=i,e(...n))}},n=e=>{audioElement||(audioElement=e,sourceNode=audioContext.createMediaElementSource(audioElement),sourceNode.connect(analyser),analyser.connect(audioContext.destination),l())},i=e=>{const t=e.match(/rgb\((\d+), (\d+), (\d+)\)/);if(!t)throw new Error("Invalid RGB string format");const a=parseInt(t[1],10),n=parseInt(t[2],10),i=parseInt(t[3],10);let o=Math.min(a+40,255),c=Math.min(n+40,255),l=Math.min(i+40,255);return o=o.toString(16).padStart(2,"0"),c=c.toString(16).padStart(2,"0"),l=l.toString(16).padStart(2,"0"),`#${o}${c}${l}`};let o=map.get(localStorage.getItem("themeColor")),c=i(o);const l=()=>{requestAnimationFrame(l),analyser.getByteFrequencyData(dataArray),ctx.clearRect(0,0,canvas.width,canvas.height),o!==map.get(localStorage.getItem("themeColor"))&&(o=map.get(localStorage.getItem("themeColor")),c=i(o));const e=2*bufferLength,t=e-1,a=(canvas.width-1*t-1)/e,n=canvas.width/2,s=ctx.createLinearGradient(0,0,0,canvas.height);s.addColorStop(0,o),ctx.shadowBlur=15,ctx.shadowColor=c,ctx.fillStyle=s;for(let e=0;e<bufferLength;e++){const t=.5*dataArray[e],i=a*(1-t/canvas.height),o=n-.5-e*(a+1)-a,c=n+.5+e*(a+1);ctx.beginPath(),ctx.moveTo(o,canvas.height),ctx.lineTo(o+a,canvas.height),ctx.lineTo(o+a-i/2,canvas.height-t),ctx.lineTo(o+i/2,canvas.height-t),ctx.closePath(),ctx.fill(),ctx.beginPath(),ctx.moveTo(c,canvas.height),ctx.lineTo(c+a,canvas.height),ctx.lineTo(c+a-i/2,canvas.height-t),ctx.lineTo(c+i/2,canvas.height-t),ctx.closePath(),ctx.fill()}},s=()=>{const e=document.getElementById("menu-mask");e.style.display="block",e.style.animation="0.5s ease 0s 1 normal none running to_show",document.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"},r=()=>{"/life/music/"===window.location.pathname&&document.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")},u=e=>{const t=e.list.audios,a=Math.floor(Math.random()*t.length);e.list.switch(a)},d=async()=>{const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;localMusic=defaultMusic,localStorage.setItem("localMusic",JSON.stringify(defaultMusic));const t=g(localMusic);try{const a=await h(t);a.length>0&&(e.list.clear(),e.list.add(a))}catch(e){console.error("Error changing music list:",e)}},m=async()=>{const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer;let t;do{t=musicListCache[Math.floor(Math.random()*musicListCache.length)]}while(JSON.parse(localStorage.getItem("localMusic")).id===t.id);localMusic=t,localStorage.setItem("localMusic",JSON.stringify(t));const a=g(t);try{const t=await h(a);t.length>0&&(e.list.clear(),e.list.add(t))}catch(e){console.error("Error changing music list:",e)}},g=e=>`https://twikoo.aimiliy.top/music/api?server=${e.server}&type=${e.type}&id=${e.id}&auth=undefined&r=${Math.random()*Date.now()}`,h=async e=>{try{const t=await fetch(e);return t.ok?await t.json():[]}catch(e){return console.error("Error fetching songs:",e),[]}},y=(e,t)=>{switch(e.code){case"Space":e.preventDefault(),t.toggle();break;case"ArrowRight":e.preventDefault(),t.skipForward();break;case"ArrowLeft":e.preventDefault(),t.skipBack();break;case"ArrowUp":musicVolume<=1&&(musicVolume+=.1,t.volume(musicVolume,!0));break;case"ArrowDown":musicVolume>=0&&(musicVolume-=.1,t.volume(musicVolume,!0))}};return{init:async()=>{e(!1)}}})();const init=()=>{if("/life/music/"!==window.location.pathname)return;document.getElementById("anMusic-page-meting").innerHTML='<meting-js id="7397995017" server="tencent" type="playlist" mutex="true" preload="auto" theme="var(--theme-color)" order="list" list-max-height="320px"></meting-js>',musicPlayerModule.init(!1).catch(console.error)};document.addEventListener("DOMContentLoaded",(()=>{"/life/music/"===window.location.pathname&&(defaultMusic={id:"7397995017",type:"playlist",server:"tencent"},localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic,musicVolume=.8,musicListCache=null,audioContext=new(window.AudioContext||window.webkitAudioContext),(analyser=audioContext.createAnalyser()).fftSize=256,analyser.smoothingTimeConstant=.85,bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength),sourceNode=null,audioElement=null,init(),initLocalStorage(),loadMusicListCache().then((e=>{})))})),document.addEventListener("pjax:complete",(()=>{"/life/music/"===window.location.pathname&&(defaultMusic={id:"7397995017",type:"playlist",server:"tencent"},localMusic=JSON.parse(localStorage.getItem("localMusic"))||defaultMusic,musicVolume=.8,musicListCache=null,audioContext=new(window.AudioContext||window.webkitAudioContext),(analyser=audioContext.createAnalyser()).fftSize=256,analyser.smoothingTimeConstant=.85,bufferLength=analyser.frequencyBinCount,dataArray=new Uint8Array(bufferLength),sourceNode=null,audioElement=null,init(),initLocalStorage(),loadMusicListCache().then((e=>{})))}));
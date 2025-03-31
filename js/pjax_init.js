(()=>{"use strict";const e=(()=>{window.eventMap=window.eventMap||new Map;return(e,t,o,n)=>{(e=>{if(window.eventMap.has(e)){const{event:t,selector:o,callback:n}=window.eventMap.get(e);o instanceof NodeList?o.forEach((e=>{e.removeEventListener(t,n)})):o.removeEventListener(t,n),window.eventMap.delete(e)}})(n),t instanceof NodeList?t.forEach((t=>{t.addEventListener(e,o)})):t.addEventListener(e,o),window.eventMap.set(n,{event:e,selector:t,callback:o})}})();(()=>{const t=document.getElementById("universe"),o=document.getElementById("snow"),n=document.getElementById("settingStyle"),a="v2.62",s=document.getElementById("welcome-info");let i,l;const r=e=>{localStorage.setItem("blogbg","default"),localStorage.setItem("universe","block"),localStorage.setItem("blur","0"),localStorage.setItem("fpson","1"),localStorage.setItem("transNum","85"),localStorage.setItem("blurRad","20"),localStorage.setItem("font","LXGW"),localStorage.setItem("themeColor","green"),localStorage.setItem("rs","block"),localStorage.setItem("mouse","on"),localStorage.setItem("light","true"),localStorage.setItem("snow","none"),localStorage.setItem("aside","1"),localStorage.setItem("asidePos","1"),localStorage.setItem("nav","1"),localStorage.setItem("defaultMusic",JSON.stringify(e)),localStorage.setItem("localMusic",JSON.stringify(e))},c=(e,t)=>{let o=null;return function(...n){o&&clearTimeout(o),o=setTimeout((()=>e.apply(this,n)),t)}},d=(e,t,o,n=5e3)=>{const a=Toastify({text:"",duration:n,gravity:"top",position:"left",stopOnFocus:!1,style:{width:"auto",padding:"0",borderRadius:"8px",textAlign:"left",boxShadow:"0 3px 7px 0 rgba(0,0,0,.25)",background:"linear-gradient(145deg, #ffffff, #f8f9fa)",color:"#2d3436",maxWidth:"480px",border:"1px solid rgba(0, 0, 0, 0.08)",overflow:"hidden",backdropFilter:"blur(4px)"},node:(()=>{const s=document.createElement("div");s.style.padding="16px 25px";const i=document.createElement("div");i.style.display="flex",i.style.justifyContent="space-between",i.style.alignItems="center",i.style.marginBottom="12px";const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="12px";const r=document.createElement("i");switch(o){case"success":r.className="fas fa-check-circle";break;case"error":r.className="fas fa-times-circle";break;case"warning":r.className="fas fa-exclamation-circle";break;default:r.style.color="fas fa-check-circle"}r.style.color="var(--theme-color)",r.style.fontSize="20px";const c=document.createElement("div");c.textContent=e,c.style.fontWeight="600",c.style.fontSize="17px",c.style.color="#2d3436",c.style.letterSpacing="0.3px",l.appendChild(r),l.appendChild(c);const d=document.createElement("div");d.innerHTML="<i class='fas fa-times'></i>",d.style.cursor="pointer",d.style.padding="4px",d.style.borderRadius="50%",d.style.transition="all 0.2s",d.style.color="var(--theme-color)",d.style.fontSize="16px",i.appendChild(l),i.appendChild(d);const m=document.createElement("div");m.textContent=t,m.style.fontSize="15px",m.style.lineHeight="1.5",m.style.color="#495057",m.style.paddingLeft="32px";const g=document.createElement("div");return g.style.height="3px",g.style.background="var(--theme-color)",g.style.position="absolute",g.style.bottom="0",g.style.left="0",g.style.width="100%",g.style.animation=`progressToast ${n}ms linear  1 forwards`,s.appendChild(i),s.appendChild(m),s.appendChild(g),d.addEventListener("click",(()=>a.hideToast())),s})()}).showToast()},m=()=>{try{const e=localStorage.getItem("font")||"LXGW";localStorage.setItem("font",e);const t="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif",o="var(--global-font), -apple-system, IBM Plex Mono, monospace, '微软雅黑', sans-serif";"default"===e?(document.getElementById("global-font").innerText=":root{--global-font: -apple-system; }",document.body.style.fontFamily=t):(document.getElementById("global-font").innerText=`:root{--global-font: ${e}; }`,document.body.style.fontFamily=o)}catch(e){console.error("Error accessing localStorage:",e),document.getElementById("global-font").innerText=":root{--global-font: -apple-system; }",document.body.style.fontFamily="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif"}try{const e=localStorage.getItem("themeColor")||"green";localStorage.setItem("themeColor",e),document.getElementById("themeColor").innerText=":root{--theme-color:"+map.get(e)+" !important}";const t=map.get(e),o="rgba"+t.substring(3,t.length-1)+", 0.7)",n="rgba"+t.substring(3,t.length-1)+", 0.5)",a="rgba"+t.substring(3,t.length-1)+", 0.1)";document.getElementById("global-color").innerText=`:root{--text-bg-hover: ${o}; --high-trans-color: ${n}; --hh-trans-color: ${a}; }`,CURSOR.refresh()}catch(e){console.log("Setting color exception：",e)}document.getElementById("aside-show").innerText="1"==localStorage.getItem("aside")?":root{--layout-justify-content: unset; --aside-content-display: block; }":":root{--layout-justify-content: center; --aside-content-display: none; }",document.getElementById("aside-pos").innerText="1"==localStorage.getItem("asidePos")?":root{--first-child-order: 0; --recent-post-item-margin: 0; --recent-post-item-margin-other: 0 0 0 15px; }":":root{--first-child-order: 2; --recent-post-item-margin: 0 15px 0 0; --recent-post-item-margin-other: 0 15px 0 0; }";const e=localStorage.getItem("transNum")||85;document.getElementById("transPercent").innerText=`:root{--trans-light: rgba(253, 253, 253, ${e}%) !important; --trans-dark: rgba(25, 25, 25, ${e}%) !important; --trans-comment-dark: rgba(35, 35, 35, ${e}%) !important} `;const t=localStorage.getItem("blurRad")||20;document.getElementById("bgFilterParam").innerText=`:root{--blur-num: blur(${t}px) saturate(120%) contrast(105%) !important; `,n.innerText="0"==localStorage.getItem("blur")?":root{--bg-filter: none; }":":root{--bg-filter: var(--blur-num); }";const o=localStorage.getItem("blogbg")||"default";var a;"default"===o?(document.getElementById("defineBg").innerText=":root{\n                --default-bg: url(https://neko.aimiliy.top/v1/wallpaper?type=pc);\n                --darkmode-bg:url(https://neko.aimiliy.top/v1/wallpaper?type=pc);\n                --mobileday-bg: url(https://cdn.aimiliy.top/backImg/418aa5a692048078aec56e073ed15e8849ff99a012daa8-4Bc9wf.webp);\n                --mobilenight-bg: url(https://cdn.aimiliy.top/backImg/20191012131221_mTGle.webp);\n              }",localStorage.setItem("blogbg","default")):(a=o,document.getElementById("defineBg").innerText=`:root{\n                --default-bg: ${a};\n                --darkmode-bg: ${a};\n                --mobileday-bg: ${a};\n                --mobilenight-bg: ${a};\n              }`);const s=document.getElementById("site-name"),i=document.getElementById("site-title"),l=document.getElementById("site-subtitle"),r=document.getElementById("post-info"),c=document.getElementById("menu_shadow"),d="true"===localStorage.getItem("light");s&&(s.style.animation=d?"light_15px 10s linear infinite":"none"),i&&(i.style.animation=d?"light_15px 10s linear infinite":"none"),l&&(l.style.animation=d?"light_10px 10s linear infinite":"none"),r&&(r.style.animation=d?"light_5px 10s linear infinite":"none"),c.innerText=d?":root{--menu-shadow: 0 0 1px var(--theme-color);}":":root{--menu-shadow: none;}";const m=document.getElementById("nav");"1"==localStorage.getItem("nav")?(m.classList.add("nav_fixed"),m.classList.add("permanent"),m.classList.remove("nav_visible"),document.getElementById("nav-display").innerText=":root { --nav-visible-display: none; --nav-fixed-display: inline-flex; }"):(m.classList.add("nav_visible"),m.classList.remove("nav_fixed"),m.classList.remove("permanent"),document.getElementById("nav-display").innerText=":root { --nav-visible-display: inline-flex; --nav-fixed-display: none; }")},g=async()=>{const e=localStorage.getItem("MuXiaoChenVersion");((e,t)=>null===t||t!==e)(a,e)&&(localStorage.setItem("MuXiaoChenVersion",a),r({id:"7397995017",type:"playlist",server:"tencent"}),await new Promise((e=>{setTimeout((()=>{d("提示🍒","(｡･∀･)ﾉﾞ由于网站部分设置功能更新，当前已为您重置所有设置，祝您愉快！","warning",5e3),e()}),500)})))},h=(e,t=!1)=>{if(t)return void(s.innerHTML='<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b><span style="padding:10px;display: flex;justify-content: center;align-items: center;">&emsp;&emsp;您当前的网络较慢，正在加速获取您的位置信息！</span></b>');let o,n,a,i=((e,t,o,n)=>{const{sin:a,cos:s,asin:i,PI:l,hypot:r}=Math;let c=(e,t)=>(e*=l/180,{x:s(t*=l/180)*s(e),y:s(t)*a(e),z:a(t)}),d=c(e,t),m=c(o,n),g=2*i(r(d.x-m.x,d.y-m.y,d.z-m.z)/2)*6371;return Math.round(g)})(114.34253,30.49984,e.result.location.lng,e.result.location.lat),l=e.result.ad_info.nation;switch(e.result.ad_info.nation){case"日本":n="よろしく，一起去看樱花吗";break;case"美国":n="Let us live in peace!";break;case"英国":n="想同你一起夜乘伦敦眼";break;case"俄罗斯":n="干了这瓶伏特加！";break;case"法国":n="C'est La Vie";break;case"德国":n="Die Zeit verging im Fluge.";break;case"澳大利亚":n="一起去大堡礁吧！";break;case"加拿大":n="拾起一片枫叶赠予你";break;case"中国":switch(l=e.result.ad_info.province+" "+e.result.ad_info.city+" "+e.result.ad_info.district,o=e.result.ip,e.result.ad_info.province){case"北京市":n="北——京——欢迎你~~~";break;case"天津市":n="讲段相声吧。";break;case"河北省":n="山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";break;case"山西省":n="展开坐具长三尺，已占山河五百余。";break;case"内蒙古自治区":n="天苍苍，野茫茫，风吹草低见牛羊。";break;case"辽宁省":n="我想吃烤鸡架！";break;case"吉林省":n="状元阁就是东北烧烤之王。";break;case"黑龙江省":n="很喜欢哈尔滨大剧院。";break;case"上海市":n="众所周知，中国只有两个城市。";break;case"江苏省":switch(e.result.ad_info.city){case"南京市":n="这是我挺想去的城市啦。";break;case"苏州市":n="上有天堂，下有苏杭。";break;default:n="散装是必须要散装的。"}break;case"浙江省":n="东风渐绿西湖柳，雁已还人未南归。";break;case"河南省":switch(e.result.ad_info.city){case"郑州市":n="豫州之域，天地之中。";break;case"南阳市":n="臣本布衣，躬耕于南阳。此南阳非彼南阳！";break;case"驻马店市":n="峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";break;case"开封市":n="刚正不阿包青天。";break;case"洛阳市":n="洛阳牡丹甲天下。";break;default:n="可否带我品尝河南烩面啦？"}break;case"安徽省":n="蚌埠住了，芜湖起飞。";break;case"福建省":n="井邑白云间，岩城远带山。";break;case"江西省":n="落霞与孤鹜齐飞，秋水共长天一色。";break;case"山东省":n="遥望齐州九点烟，一泓海水杯中泻。";break;case"湖北省":n="来碗热干面！";break;case"湖南省":n="74751，长沙斯塔克。";break;case"广东省":n="老板来两斤福建人。";break;case"广西壮族自治区":n="桂林山水甲天下。";break;case"海南省":n="朝观日出逐白浪，夕看云起收霞光。";break;case"四川省":n="康康川妹子。";break;case"贵州省":n="茅台，学生，再塞200。";break;case"云南省":n="玉龙飞舞云缠绕，万仞冰川直耸天。";break;case"西藏自治区":n="躺在茫茫草原上，仰望蓝天。";break;case"陕西省":n="来份臊子面加馍。";break;case"甘肃省":n="羌笛何须怨杨柳，春风不度玉门关。";break;case"青海省":n="牛肉干和老酸奶都好好吃。";break;case"宁夏回族自治区":n="大漠孤烟直，长河落日圆。";break;case"新疆维吾尔自治区":n="驼铃古道丝绸路，胡马犹闻唐汉风。";break;case"台湾省":n="我在这头，大陆在那头。";break;case"香港特别行政区":n="永定贼有残留地鬼嚎，迎击光非岁玉。";break;case"澳门特别行政区":n="性感荷官，在线发牌。";break;default:n="带我去你的城市逛逛吧！"}break;default:n="带我去你的国家逛逛吧。"}let r=new Date;a=r.getHours()>=5&&r.getHours()<11?"<span>上午好</span>，一日之计在于晨！":r.getHours()>=11&&r.getHours()<13?"<span>中午好</span>，该摸鱼吃午饭了。":r.getHours()>=13&&r.getHours()<15?"<span>下午好</span>，懒懒地睡个午觉吧！":r.getHours()>=15&&r.getHours()<16?"<span>三点几啦</span>，一起饮茶呀！":r.getHours()>=16&&r.getHours()<19?"<span>夕阳无限好！</span>":r.getHours()>=19&&r.getHours()<24?"<span>晚上好</span>，夜生活嗨起来！":"夜深了，早点休息，少熬夜。";try{s.innerHTML=`<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${l}</span> 的小伙伴，${a}您现在距离站长约 <span style="color:var(--theme-color)">${i}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${o}</span>， ${n}</b>`}catch(e){console.log("Pjax加载首页欢迎语异常：",e)}},u=()=>{navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||"block"!==localStorage.getItem("snow")||"light"!==document.getElementsByTagName("html")[0].getAttribute("data-theme")||window&&(()=>{const e=(e,o,n,a,s,i,l)=>{const r=2*Math.PI/6;e.save(),e.translate(o,n),e.rotate(l),e.strokeStyle="rgba("+s+", "+i+")",e.lineWidth=.05*a;for(let o=0;o<6;o++)e.rotate(r),t(e,a);e.restore()},t=(e,t)=>{const o=1.3*t,n=.4*o,a=Math.PI/6;e.beginPath(),e.moveTo(0,0),e.lineTo(0,-o),e.stroke();for(let t=1;t<=6;t++){const s=o/7*t,i=Math.PI/16;e.beginPath(),e.moveTo(0,-s),e.lineTo(-n*Math.sin(a+i*t),-s-n*Math.cos(a+i*t)),e.stroke(),e.beginPath(),e.moveTo(0,-s),e.lineTo(n*Math.sin(a-i*t),-s-n*Math.cos(a-i*t)),e.stroke(),t%2==0&&(e.beginPath(),e.moveTo(n*Math.sin(a-i*t),-s-n*Math.cos(a-i*t)),e.lineTo(1.2*n*Math.sin(a-i*t+Math.PI/12),-s-1.2*n*Math.cos(a-i*t+Math.PI/12)),e.stroke())}const s=.2*o;for(let t=1;t<=4;t++){const n=o/5*t,i=Math.PI/20;e.beginPath(),e.moveTo(0,-n),e.lineTo(s*Math.sin(a+i*t),-n-s*Math.cos(a+i*t)),e.stroke(),e.beginPath(),e.moveTo(0,-n),e.lineTo(-s*Math.sin(a-i*t),-n-s*Math.cos(a-i*t)),e.stroke()}},o=(e,t,o,a,s,i,l)=>{const r=2*Math.PI/6;e.save(),e.translate(t,o),e.rotate(l),e.strokeStyle="rgba("+s+", "+i+")",e.lineWidth=.05*a;for(let t=0;t<6;t++)e.rotate(r),n(e,a);e.restore()},n=(e,t)=>{const o=1.3*t,n=Math.PI/6;e.beginPath(),e.moveTo(0,0),e.lineTo(0,-o),e.stroke();for(let t=1;t<=10;t++){const a=o/11*t,s=n+.1*t;e.beginPath(),e.moveTo(0,-a),e.lineTo(-a*Math.sin(s),-a-a*Math.cos(s)),e.stroke(),e.beginPath(),e.moveTo(0,-a),e.lineTo(a*Math.sin(s),-a-a*Math.cos(s)),e.stroke()}const a=.2*o;for(let t=1;t<=4;t++){const s=o/5*t,i=n+.1*t*1.5;e.beginPath(),e.moveTo(0,-s),e.lineTo(a*Math.sin(i),-s-a*Math.cos(i)),e.stroke(),e.beginPath(),e.moveTo(0,-s),e.lineTo(-a*Math.sin(i),-s-a*Math.cos(i)),e.stroke()}},a=(e,t,o,n,a,i,l)=>{const r=2*Math.PI/6;e.save(),e.translate(t,o),e.rotate(l),e.strokeStyle="rgba("+a+", "+i+")",e.lineWidth=.05*n;for(let t=0;t<6;t++)e.rotate(r),s(e,n);e.restore()},s=(e,t)=>{const o=1.2*t;e.beginPath(),e.moveTo(0,0),e.lineTo(0,-o),e.stroke(),i(e,o,0)},i=(e,t,o)=>{if(o>2)return;const n=.6*t,a=Math.PI/6;for(let s=0;s<3;s++){const l=a*(s-1);e.beginPath(),e.moveTo(0,-t),e.lineTo(n*Math.sin(l),-t-n*Math.cos(l)),e.stroke(),i(e,n,o+1)}},r={flakeCount:50,minDist:150,color:"255, 255, 255",size:6,speed:.5,opacity:.6,stepsize:.5,rotation:2*Math.PI,rotationSpeed:.02,snowflakeMethod:e},c=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},d=document.getElementById("snow"),m=d.getContext("2d"),g=r.flakeCount;let h=-100,u=-100,p=[];d.width=window.innerWidth,d.height=window.innerHeight;const y=()=>{m.clearRect(0,0,d.width,d.height);const e=r.minDist;for(let t=0;t<g;t++){let o=p[t];const n=h,a=u,s=o.x,i=o.y,l=Math.sqrt((n-s)*(n-s)+(a-i)*(a-i));if(l<e){const t=(n-s)/l,r=(a-i)/l,c=e/(l*l)/2;o.velX-=c*t,o.velY-=c*r}else o.velX*=.98,o.velY<o.speed&&o.speed-o.velY>.01&&(o.velY+=.01*(o.speed-o.velY)),o.velX+=Math.cos(o.step+=.05)*o.stepSize;o.rotation+=o.rotationSpeed,o.y+=o.velY,o.x+=o.velX,(o.y>=d.height||o.y<=0)&&(o.opacity-=.02,o.opacity<=0&&b(o)),(o.x>=d.width||o.x<=0)&&(o.opacity-=.02,o.opacity<=0&&b(o)),o.snowflakeMethod(m,o.x,o.y,o.size,r.color,o.opacity,o.rotation)}l=c(y)},b=t=>{t.x=Math.floor(Math.random()*d.width),t.y=0,t.size=4*Math.random()+r.size,t.speed=Math.random()+r.speed,t.velY=t.speed,t.velX=0,t.opacity=.6*Math.random()+r.opacity,t.rotation=Math.random()*r.rotation,t.rotationSpeed=(Math.random()-.5)*r.rotationSpeed,t.snowflakeMethod=(()=>{const t=[e,o,a];return t[Math.floor(Math.random()*t.length)]})()};document.addEventListener("mousemove",(e=>{h=e.clientX,u=e.clientY})),window.addEventListener("resize",((e,t)=>{let o=0;return function(...n){const a=Date.now();a-o>=t&&(o=a,e(...n))}})((()=>{d.width=window.innerWidth,d.height=window.innerHeight}),50)),(()=>{for(let e=0;e<g;e++)p.push({speed:Math.random()+r.speed,velX:0,velY:Math.random()+r.speed,x:Math.floor(Math.random()*d.width),y:Math.floor(Math.random()*d.height),size:4*Math.random()+r.size,stepSize:Math.random()/30*r.stepsize,step:0,angle:180,opacity:.6*Math.random()+r.opacity,rotation:Math.random()*r.rotation,rotationSpeed:(Math.random()-.5)*r.rotationSpeed,snowflakeMethod:r.snowflakeMethod});y()})()})()},p=()=>{if("dark"!==document.getElementsByTagName("html")[0].getAttribute("data-theme")||"block"!==localStorage.getItem("universe"))return;const e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var t,o,n,a,s=.05,l=document.getElementById("universe"),r=!0,c="226,225,224",d=[];function m(){t=window.innerWidth,o=window.innerHeight,n=.216*t,l.setAttribute("width",t),l.setAttribute("height",o)}function g(){a.clearRect(0,0,t,o);for(var e=d.length,n=0;n<e;n++){var s=d[n];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function h(){this.reset=function(){this.giant=u(3),this.comet=!this.giant&&!r&&u(10),this.x=p(0,t-10),this.y=p(0,o),this.r=p(1.1,2.6),this.dx=p(s,6*s)+(this.comet+1-1)*s*p(50,120)+.1,this.dy=-p(s,6*s)-(this.comet+1-1)*s*p(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=p(.2,1-.4*(this.comet+1-1)),this.do=p(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>t||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(a.beginPath(),this.giant)a.fillStyle="rgba(180,184,240,"+this.opacity+")",a.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){a.fillStyle="rgba("+c+","+this.opacity+")",a.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var e=0;e<30;e++)a.fillStyle="rgba("+c+","+(this.opacity-this.opacity/20*e)+")",a.rect(this.x-this.dx/4*e,this.y-this.dy/4*e-2,2,2),a.fill()}else a.fillStyle="rgba(226,225,142,"+this.opacity+")",a.rect(this.x,this.y,this.r,this.r);a.closePath(),a.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>t-t/4||this.y<0)&&(this.fadingOut=!0)},setTimeout((function(){r=!1}),50)}function u(e){return Math.floor(1e3*Math.random())+1<10*e}function p(e,t){return Math.random()*(t-e)+e}m(),window.addEventListener("resize",m,!1),function(){a=l.getContext("2d");for(var e=0;e<n;e++)d[e]=new h,d[e].reset();g()}(),function t(){g(),i=e(t)}()},y=()=>{if((window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<=800){window.cancelAnimationFrame(l);const e=document.getElementById("snow");e.getContext("2d").clearRect(0,0,e.width,e.height),window.cancelAnimationFrame(i);const t=document.getElementById("universe");t.getContext("2d").clearRect(0,0,t.width,t.height)}else"light"===document.getElementsByTagName("html")[0].getAttribute("data-theme")?u():p()},b=c((()=>{d("哎嘿！复制成功🍬","若要转载最好保留原文链接哦，给你一个大大的赞！","success",3e3)}),500),f=c((e=>{(e=>{const t=["F12","I","J","C","U"];return t.includes(e.key)&&("F12"===e.key||e.ctrlKey&&e.shiftKey&&t.slice(1,4).includes(e.key)||e.ctrlKey&&"U"===e.key)})(e)&&d("你已被发现😜","小伙子，扒源记住要遵循GPL协议！","warning",3e3)}),500),v=c((()=>{y()}),500),w=document.querySelectorAll('a[href="#post-comment"]'),k=()=>{let e=window.location.hash;if(!e)return;e=e.slice(1);const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},I=[{event:"copy",selector:document,callback:b,eventName:"onCopy"},{event:"keydown",selector:document,callback:f,eventName:"onKeydownGPL"},{event:"visibilitychange",selector:document,callback:()=>{let e;document.hidden?(document.title="👀跑哪里去了~",clearTimeout(e)):(document.title="🐖抓到你啦～",e=setTimeout((()=>{document.title="MuXiaoChen🍊"}),2e3))},eventName:"onVisibilityChangeTitle"},{event:"resize",selector:window,callback:v,eventName:"onResizeCheckWidth"},{event:"click",selector:w,callback:e=>{e.preventDefault();const t=document.querySelector("#post-comment");t&&t.scrollIntoView({behavior:"smooth"})},eventName:"onClickPostComment"},{event:"hashchange",selector:window,callback:k,eventName:"onHashChange"}];return{init:()=>{Object.assign(window,{initItem:r,$notify:d,currentVersion:a,debounce:c,snowflake:u,dark:p,universeId:i,sonwId:l,checkWidth:y,addGlobalListener:e}),g().then((e=>{})),(()=>{const e=localStorage.getItem("universe");(null==e||"block"!==e&&"none"!==e)&&localStorage.setItem("universe","block"),t.style.display=localStorage.getItem("universe");const n=localStorage.getItem("snow");(null==n||"block"!==n&&"none"!==n)&&localStorage.setItem("snow","none"),o.style.display=localStorage.getItem("snow");const a=localStorage.getItem("fpson");(null==a||"1"!==a&&"0"!==a)&&localStorage.setItem("fpson","1");const s=localStorage.getItem("aside");(null==s||"1"!==s&&"0"!==s)&&localStorage.setItem("aside","1");const i=localStorage.getItem("asidePos");(null==i||"0"!==i&&"1"!==i)&&localStorage.setItem("asidePos","1");const l=localStorage.getItem("nav");(null==l||"1"!==l&&"0"!==l)&&localStorage.setItem("nav","1");const r=localStorage.getItem("rs");(null==r||"block"!==r&&"none"!==r)&&localStorage.setItem("rs","block");const c=localStorage.getItem("transNum");(null==c||isNaN(c)||c<0||c>100)&&localStorage.setItem("transNum",85);const d=localStorage.getItem("blurRad");(null==d||isNaN(d)||d<0||d>100)&&localStorage.setItem("blurRad",20);const m=localStorage.getItem("blur");(null==m||"1"!==m&&"0"!==m)&&localStorage.setItem("blur",0);const g=localStorage.getItem("light");(null==g||"true"!==g&&"false"!==g)&&localStorage.setItem("light","true");const h=localStorage.getItem("mouse");(null==h||"on"!==h&&"off"!==h)&&localStorage.setItem("mouse","on"),"dark"==("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(document.getElementById("modeicon").setAttribute("xlink:href","#icon-sun"),document.getElementById("modeiconT").setAttribute("xlink:href","#icon-sun")):(document.getElementById("modeicon").setAttribute("xlink:href","#icon-Moon2"),document.getElementById("modeiconT").setAttribute("xlink:href","#icon-moon"))})(),m(),(()=>{const e=document.getElementById("name-container");e.setAttribute("style","display:none");var t=$(window).scrollTop();$(window).scroll((function(){var o=$(window).scrollTop();o>t?(e.setAttribute("style",""),document.getElementsByClassName("menus_items")[1].setAttribute("style","display:none!important")):(document.getElementsByClassName("menus_items")[1].setAttribute("style",""),e.setAttribute("style","display:none")),t=o})),document.getElementById("page-name").innerText=document.title.split(" | MuXiaoChen🍊")[0]})(),(async()=>{if(!/^\/(?:page\/\d+\/|)$/.test(window.location.pathname))return;let e=localStorage.getItem("ipLocation"),t=localStorage.getItem("locationTime"),o=(new Date).getTime();if(e&&t&&o-t<18e5)h(JSON.parse(e));else{h(null,!0);try{const e=await $.ajax({type:"get",url:"https://apis.map.qq.com/ws/location/v1/ip",data:{key:"UEVBZ-KBWCW-L67R2-YZ7NC-CYZY3-LKFR5",output:"jsonp"},dataType:"jsonp"});localStorage.setItem("ipLocation",JSON.stringify(e)),localStorage.setItem("locationTime",o),h(e)}catch(e){h({result:{ad_info:{nation:"未知",province:"未知",city:"未知"},location:{lat:0,lng:0}}})}}})().then((e=>{})),y(),I.forEach((t=>{e(t.event,t.selector,t.callback,t.eventName)})),k()}}})().init()})();
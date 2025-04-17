(()=>{"use strict";const e=document.getElementById("universe"),t=document.getElementById("snow"),o=document.getElementById("settingStyle"),n=document.getElementById("welcome-info"),l=document.getElementById("modeicon"),a=document.getElementById("modeiconT"),s=document.documentElement.getAttribute("data-theme"),i=document.getElementById("global-font"),c=document.getElementById("defineBg"),r=document.getElementById("name-container"),m=document.getElementsByClassName("menus_items"),d=document.getElementById("page-name");(()=>{const g=()=>{try{const e=localStorage.getItem("font")||"LXGW";localStorage.setItem("font",e);const t="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif",o="var(--global-font), -apple-system, IBM Plex Mono, monospace, '微软雅黑', sans-serif";"default"===e?(i.textContent=":root{--global-font: -apple-system; }",document.body.style.fontFamily=t):(i.textContent=`:root{--global-font: ${e}; }`,document.body.style.fontFamily=o)}catch(e){console.error("Error accessing localStorage:",e),i.textContent=":root{--global-font: -apple-system; }",document.body.style.fontFamily="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif"}try{const e=localStorage.getItem("themeColor")||"green";localStorage.setItem("themeColor",e),document.getElementById("themeColor").textContent=":root{--theme-color:"+btf.map.get(e)+" !important}";const t=btf.map.get(e),o="rgba"+t.substring(3,t.length-1)+", 0.7)",n="rgba"+t.substring(3,t.length-1)+", 0.5)",l="rgba"+t.substring(3,t.length-1)+", 0.1)";document.getElementById("global-color").textContent=`:root{--text-bg-hover: ${o}; --high-trans-color: ${n}; --hh-trans-color: ${l}; }`,btf.CURSOR.refresh()}catch(e){console.log("Setting color exception：",e)}document.getElementById("aside-show").textContent="1"==localStorage.getItem("aside")?":root{--layout-justify-content: unset; --aside-content-display: block; }":":root{--layout-justify-content: center; --aside-content-display: none; }",document.getElementById("aside-pos").textContent="1"==localStorage.getItem("asidePos")?":root{--first-child-order: 0; --recent-post-item-margin: 0; --recent-post-item-margin-other: 0 0 0 15px; }":":root{--first-child-order: 2; --recent-post-item-margin: 0 15px 0 0; --recent-post-item-margin-other: 0 15px 0 0; }";const e=localStorage.getItem("transNum")||85;document.getElementById("transPercent").textContent=`:root{--trans-light: rgba(253, 253, 253, ${e}%) !important; --trans-dark: rgba(25, 25, 25, ${e}%) !important; --trans-comment-dark: rgba(35, 35, 35, ${e}%) !important} `;const t=localStorage.getItem("blurRad")||20;document.getElementById("bgFilterParam").textContent=`:root{--blur-num: blur(${t}px) saturate(120%) contrast(105%) !important; `,o.textContent="0"==localStorage.getItem("blur")?":root{--bg-filter: none; }":":root{--bg-filter: var(--blur-num); }";const n=localStorage.getItem("blogbg")||"default";var l;"default"===n?(c.textContent=":root{\n                --default-bg: url(https://neko.aimiliy.top/v1/wallpaper?type=pc);\n                --darkmode-bg:url(https://neko.aimiliy.top/v1/wallpaper?type=pc);\n                --mobileday-bg: url(https://cdn.aimiliy.top/backImg/418aa5a692048078aec56e073ed15e8849ff99a012daa8-4Bc9wf.webp);\n                --mobilenight-bg: url(https://cdn.aimiliy.top/backImg/20191012131221_mTGle.webp);\n              }",localStorage.setItem("blogbg","default")):(l=n,c.textContent=`:root{\n                --default-bg: ${l};\n                --darkmode-bg: ${l};\n                --mobileday-bg: ${l};\n                --mobilenight-bg: ${l};\n              }`);const a=document.getElementById("site-name"),s=document.getElementById("site-title"),r=document.getElementById("site-subtitle"),m=document.getElementById("post-info"),d=document.getElementById("menu_shadow"),g="true"===localStorage.getItem("light");a&&(a.style.animation=g?"light_15px 10s linear infinite":"none"),s&&(s.style.animation=g?"light_15px 10s linear infinite":"none"),r&&(r.style.animation=g?"light_10px 10s linear infinite":"none"),m&&(m.style.animation=g?"light_5px 10s linear infinite":"none"),d.innerText=g?":root{--menu-shadow: 0 0 1px var(--theme-color);}":":root{--menu-shadow: none;}";const u=document.getElementById("nav"),p=document.getElementById("nav-display");"1"===localStorage.getItem("nav")?(u.classList.add("nav_fixed","permanent"),u.classList.remove("nav_visible"),p.textContent=":root { --nav-visible-display: none; --nav-fixed-display: inline-flex; }"):(u.classList.add("nav_visible"),u.classList.remove("nav_fixed","permanent"),p.textContent=":root { --nav-visible-display: inline-flex; --nav-fixed-display: none; }")},u=async()=>{const e=localStorage.getItem("MuXiaoChenVersion");((e,t)=>null===t||t!==e)(btf.currentVersion,e)&&(localStorage.setItem("MuXiaoChenVersion",btf.currentVersion),btf.initItem({id:"7397995017",type:"playlist",server:"tencent"}),await new Promise((e=>{setTimeout((()=>{btf.$notify("提示🍒","(｡･∀･)ﾉﾞ由于网站部分设置功能更新，当前已为您重置所有设置，祝您愉快！","warning",5e3),e()}),500)})))},p=async()=>{let e=null;if(!/^\/(?:page\/\d+\/|)$/.test(window.location.pathname))return;let t=localStorage.getItem("ipLocation"),o=localStorage.getItem("locationTime"),n=(new Date).getTime();if(t&&o&&n-o<18e5)b(JSON.parse(t));else{b(e,!0);try{const t=await new Promise(((e,t)=>{const o="jsonp_callback_"+Math.random().toString(36).substr(2,10);window[o]=function(t){e(t),document.body.removeChild(n),delete window[o]};const n=document.createElement("script");n.src=`https://apis.map.qq.com/ws/location/v1/ip?key=UEVBZ-KBWCW-L67R2-YZ7NC-CYZY3-LKFR5&output=jsonp&callback=${o}`,n.onerror=function(e){t(e),delete window[o]},document.body.appendChild(n)}));localStorage.setItem("ipLocation",JSON.stringify(t)),localStorage.setItem("locationTime",n),e=t}catch(t){console.error("Location fetch failed:",t),e={result:{ad_info:{nation:"未知",province:"未知",city:"未知"},location:{lat:0,lng:0}}}}finally{b(e)}}},b=(e,t)=>{if(t)return void(n.innerHTML='<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b><span style="padding:10px;display: flex;justify-content: center;align-items: center;">&emsp;&emsp;您当前的网络较慢，正在加速获取您的位置信息！</span></b>');let o=((e,t,o,n)=>{const l=e=>e*Math.PI/180,a=l(n-t),s=l(o-e),i=Math.sin(a/2)**2+Math.cos(l(t))*Math.cos(l(n))*Math.sin(s/2)**2,c=2*Math.asin(Math.sqrt(i));return Math.round(6371*c)})(114.34253,30.49984,e.result.location.lng,e.result.location.lat),l=e.result.ad_info.nation;e.result.ad_info.province&&(l=e.result.ad_info.province+" "+e.result.ad_info.city+" "+e.result.ad_info.district);let a=e.result.ip,s=((e,t,o)=>{const n={"日本":"よろしく，一起去看樱花吗","美国":"Let us live in peace!","英国":"想同你一起夜乘伦敦眼","俄罗斯":"干了这瓶伏特加！","法国":"C'est La Vie","德国":"Die Zeit verging im Fluge.","澳大利亚":"一起去大堡礁吧！","加拿大":"拾起一片枫叶赠予你","中国":{"北京市":"北——京——欢迎你~~~","天津市":"讲段相声吧。","河北省":"山势巍巍成壁垒，天下雄关...","山西省":"展开坐具长三尺，已占山河五百余。","内蒙古自治区":"天苍苍，野茫茫，风吹草低见牛羊。","辽宁省":"我想吃烤鸡架！","吉林省":"状元阁就是东北烧烤之王。","黑龙江省":"很喜欢哈尔滨大剧院。","上海市":"众所周知，中国只有两个城市。","江苏省":{"南京市":"这是我挺想去的城市啦。","苏州市":"上有天堂，下有苏杭。",default:"散装是必须要散装的。"},"浙江省":"东风渐绿西湖柳，雁已还人未南归。","河南省":{"郑州市":"豫州之域，天地之中。","南阳市":"臣本布衣，躬耕于南阳。此南阳非彼南阳！","驻马店市":"峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！",default:"可否带我品尝河南烩面啦？"},"安徽省":"蚌埠住了，芜湖起飞。","福建省":"井邑白云间，岩城远带山。","江西省":"落霞与孤鹜齐飞，秋水共长天一色。","山东省":"遥望齐州九点烟，一泓海水杯中泻。","湖北省":"来碗热干面！","湖南省":"74751，长沙斯塔克。","广东省":"老板来两斤福建人。","广西壮族自治区":"桂林山水甲天下。","海南省":"朝观日出逐白浪，夕看云起收霞光。","四川省":"康康川妹子。","贵州省":"茅台，学生，再塞200。","云南省":"玉龙飞舞云缠绕，万仞冰川直耸天。","西藏自治区":"躺在茫茫草原上，仰望蓝天。","陕西省":"来份臊子面加馍。","甘肃省":"羌笛何须怨杨柳，春风不度玉门关。","青海省":"牛肉干和老酸奶都好好吃。","宁夏回族自治区":"大漠孤烟直，长河落日圆。","新疆维吾尔自治区":"驼铃古道丝绸路，胡马犹闻唐汉风。","台湾省":"我在这头，大陆在那头。","香港特别行政区":"永定贼有残留地鬼嚎，迎击光非岁玉。","澳门特别行政区":"性感荷官，在线发牌。",default:"带我去你的城市逛逛吧！"},default:"带我去你的国家逛逛吧。"};return"中国"===e&&n[e]&&n[e][t]?"object"==typeof n[e][t]?n[e][t][o]?n[e][t][o]:n[e][t].default||"该城市暂无描述":n[e][t]:n[e]?n[e]:n.default})(e.result.ad_info.nation,e.result.ad_info.province,e.result.ad_info.city),i=(()=>{const e=(new Date).getHours();return e>=5&&e<11?"<span>早上好</span>，今天也要元气满满呀！":e>=11&&e<13?"<span>中午好</span>，先放下工作吃顿好的吧～":e>=13&&e<15?"<span>下午好</span>，小憩一会儿，别太累了哦。":e>=15&&e<16?"<span>茶点时间</span>到啦！来杯奶茶提提神～":e>=16&&e<19?"<span>傍晚好</span>，夕阳正美，记得休息眼睛。":e>=19&&e<24?"<span>晚上好</span>，今天也辛苦啦，放松一下吧～":"<span>夜深了</span>，早点休息，别再刷手机啦～"})();try{n.innerHTML=`<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${l}</span> 的小伙伴，${i}您现在距离站长约 <span style="color:var(--theme-color)">${o}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${a}</span>， ${s}</b>`}catch(e){console.error("加载首页欢迎语异常：",e)}},y=btf.debounce((()=>{btf.$notify("哎嘿！复制成功🍬","若要转载最好保留原文链接哦，给你一个大大的赞！","success",3e3)}),500,!0),f=btf.debounce((e=>{(e=>{const t=["F12","I","J","C","U"];return t.includes(e.key)&&("F12"===e.key||e.ctrlKey&&e.shiftKey&&t.slice(1,4).includes(e.key)||e.ctrlKey&&"U"===e.key)})(e)&&btf.$notify("你已被发现😜","小伙子，扒源记住要遵循GPL协议！","warning",3e3)}),500,!0),h=btf.throttle((()=>{btf.checkWidth()}),200,{leading:!0,trailing:!0}),v=document.querySelectorAll('a[href="#post-comment"]'),I=()=>{let e=window.location.hash;if(!e)return;e=e.slice(1);const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},S=[{event:"copy",selector:document,callback:y,eventName:"onCopy"},{event:"keydown",selector:document,callback:f,eventName:"onKeydownGPL"},{event:"visibilitychange",selector:document,callback:()=>{let e;document.hidden?(document.title="👀跑哪里去了~",clearTimeout(e)):(document.title="🐖抓到你啦～",e=setTimeout((()=>{document.title="MuXiaoChen🍊"}),2e3))},eventName:"onVisibilityChangeTitle"},{event:"resize",selector:window,callback:h,eventName:"onResizeCheckWidth"},{event:"click",selector:v,callback:e=>{e.preventDefault();const t=document.querySelector("#post-comment");t&&t.scrollIntoView({behavior:"smooth"})},eventName:"onClickPostComment"},{event:"hashchange",selector:window,callback:I,eventName:"onHashChange"}];return{init:()=>{u(),(()=>{const o=localStorage.getItem("universe");(null==o||"block"!==o&&"none"!==o)&&localStorage.setItem("universe","block"),e.style.display=localStorage.getItem("universe");const n=localStorage.getItem("snow");(null==n||"block"!==n&&"none"!==n)&&localStorage.setItem("snow","none"),t.style.display=localStorage.getItem("snow");const i=localStorage.getItem("fpson");(null==i||"1"!==i&&"0"!==i)&&localStorage.setItem("fpson","1");const c=localStorage.getItem("aside");(null==c||"1"!==c&&"0"!==c)&&localStorage.setItem("aside","1");const r=localStorage.getItem("asidePos");(null==r||"0"!==r&&"1"!==r)&&localStorage.setItem("asidePos","1");const m=localStorage.getItem("nav");(null==m||"1"!==m&&"0"!==m)&&localStorage.setItem("nav","1");const d=localStorage.getItem("rs");(null==d||"block"!==d&&"none"!==d)&&localStorage.setItem("rs","block");const g=localStorage.getItem("transNum");(null==g||isNaN(g)||g<0||g>100)&&localStorage.setItem("transNum","85");const u=localStorage.getItem("blurRad");(null==u||isNaN(u)||u<0||u>100)&&localStorage.setItem("blurRad","20");const p=localStorage.getItem("blur");(null==p||"1"!==p&&"0"!==p)&&localStorage.setItem("blur","0");const b=localStorage.getItem("light");(null==b||"true"!==b&&"false"!==b)&&localStorage.setItem("light","true");const y=localStorage.getItem("mouse");(null==y||"on"!==y&&"off"!==y)&&localStorage.setItem("mouse","on");const f="dark"===s?"#icon-sun":"#icon-Moon2",h="dark"===s?"#icon-sun":"#icon-moon";l.getAttribute("xlink:href")!==f&&l.setAttribute("xlink:href",f),a.getAttribute("xlink:href")!==h&&a.setAttribute("xlink:href",h)})(),g(),(()=>{r.classList.contains("visible")||r.classList.add("visible");let e=window.scrollY;window.addEventListener("scroll",btf.debounce((()=>{const t=window.scrollY;t>e?(r.classList.contains("visible")&&r.classList.remove("visible"),m[1]&&(m[1].classList.contains("visible")||m[1].classList.add("visible"))):(r.classList.contains("visible")||r.classList.add("visible"),m[1]&&m[1].classList.contains("visible")&&m[1].classList.remove("visible")),e=t}),50)),d.innerText=document.title.split(" | MuXiaoChen🍊")[0]})(),btf.checkWidth(),I(),S.forEach((e=>{btf.addEventListenerPjax(e.event,e.selector,e.callback,e.eventName)})),p()}}})().init()})();
(()=>{const e=document.getElementById("universe"),t=document.getElementById("snow"),o=document.getElementById("settingStyle"),a="v2.57",n=document.getElementById("welcome-info"),l=e=>{localStorage.setItem("blogbg","default"),localStorage.setItem("universe","block"),localStorage.setItem("blur","0"),localStorage.setItem("fpson","1"),localStorage.setItem("transNum","85"),localStorage.setItem("blurRad","20"),localStorage.setItem("font","LXGW"),localStorage.setItem("themeColor","green"),localStorage.setItem("rs","block"),localStorage.setItem("mouse","on"),localStorage.setItem("light","true"),localStorage.setItem("snow","none"),localStorage.setItem("aside","1"),localStorage.setItem("asidePos","1"),localStorage.setItem("nav","1"),localStorage.setItem("defaultMusic",JSON.stringify(e)),localStorage.setItem("localMusic",JSON.stringify(e))},s=(e,t,o,a=5e3)=>{const n=Toastify({text:"",duration:a,gravity:"top",position:"left",stopOnFocus:!1,style:{width:"auto",padding:"0",borderRadius:"8px",textAlign:"left",boxShadow:"0 3px 7px 0 rgba(0,0,0,.25)",background:"linear-gradient(145deg, #ffffff, #f8f9fa)",color:"#2d3436",maxWidth:"480px",border:"1px solid rgba(0, 0, 0, 0.08)",overflow:"hidden",backdropFilter:"blur(4px)"},node:(()=>{const l=document.createElement("div");l.style.padding="16px 25px";const s=document.createElement("div");s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center",s.style.marginBottom="12px";const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.gap="12px";const i=document.createElement("i");switch(o){case"success":i.className="fas fa-check-circle";break;case"error":i.className="fas fa-times-circle";break;case"warning":i.className="fas fa-exclamation-circle";break;default:i.style.color="fas fa-check-circle"}i.style.color="var(--theme-color)",i.style.fontSize="20px";const c=document.createElement("div");c.textContent=e,c.style.fontWeight="600",c.style.fontSize="17px",c.style.color="#2d3436",c.style.letterSpacing="0.3px",r.appendChild(i),r.appendChild(c);const m=document.createElement("div");m.innerHTML="<i class='fas fa-times'></i>",m.style.cursor="pointer",m.style.padding="4px",m.style.borderRadius="50%",m.style.transition="all 0.2s",m.style.color="var(--theme-color)",m.style.fontSize="16px",s.appendChild(r),s.appendChild(m);const d=document.createElement("div");d.textContent=t,d.style.fontSize="15px",d.style.lineHeight="1.5",d.style.color="#495057",d.style.paddingLeft="32px";const g=document.createElement("div");return g.style.height="3px",g.style.background="var(--theme-color)",g.style.position="absolute",g.style.bottom="0",g.style.left="0",g.style.width="100%",g.style.animation=`progressToast ${a}ms linear  1 forwards`,l.appendChild(s),l.appendChild(d),l.appendChild(g),m.addEventListener("click",(()=>n.hideToast())),l})()}).showToast()},r=()=>{try{const e=localStorage.getItem("font")||"LXGW";localStorage.setItem("font",e);const t="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif",o="var(--global-font), -apple-system, IBM Plex Mono, monospace, '微软雅黑', sans-serif";"default"===e?(document.getElementById("global-font").innerText=":root{--global-font: -apple-system; }",document.body.style.fontFamily=t):(document.getElementById("global-font").innerText=`:root{--global-font: ${e}; }`,document.body.style.fontFamily=o)}catch(e){console.error("Error accessing localStorage:",e),document.getElementById("global-font").innerText=":root{--global-font: -apple-system; }",document.body.style.fontFamily="-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif"}try{const e=localStorage.getItem("themeColor")||"green";localStorage.setItem("themeColor",e),document.getElementById("themeColor").innerText=":root{--theme-color:"+map.get(e)+" !important}";const t=map.get(e),o="rgba"+t.substring(3,t.length-1)+", 0.7)",a="rgba"+t.substring(3,t.length-1)+", 0.5)",n="rgba"+t.substring(3,t.length-1)+", 0.1)";document.getElementById("global-color").innerText=`:root{--text-bg-hover: ${o}; --high-trans-color: ${a}; --hh-trans-color: ${n}; }`,CURSOR.refresh()}catch(e){console.log("Setting color exception：",e)}document.getElementById("aside-show").innerText="1"==localStorage.getItem("aside")?":root{--layout-justify-content: unset; --aside-content-display: block; }":":root{--layout-justify-content: center; --aside-content-display: none; }",document.getElementById("aside-pos").innerText="1"==localStorage.getItem("asidePos")?":root{--first-child-order: 0; --recent-post-item-margin: 0; --recent-post-item-margin-other: 0 0 0 15px; }":":root{--first-child-order: 2; --recent-post-item-margin: 0 15px 0 0; --recent-post-item-margin-other: 0 15px 0 0; }";const e=localStorage.getItem("transNum")||85;document.getElementById("transPercent").innerText=`:root{--trans-light: rgba(253, 253, 253, ${e}%) !important; --trans-dark: rgba(25, 25, 25, ${e}%) !important; --trans-comment-dark: rgba(35, 35, 35, ${e}%) !important} `;const t=localStorage.getItem("blurRad")||20;document.getElementById("bgFilterParam").innerText=`:root{--blur-num: blur(${t}px) saturate(120%) contrast(105%) !important; `,o.innerText="0"==localStorage.getItem("blur")?":root{--bg-filter: none; }":":root{--bg-filter: var(--blur-num); }";const a=localStorage.getItem("blogbg")||"default";var n;"default"===a?(document.getElementById("defineBg").innerText=":root{\n                --default-bg: url(https://cdn.aimiliy.top/backImg/81.webp);\n                --darkmode-bg:url(https://cdn.aimiliy.top/backImg/b5757011b2a24502b9d82b99d0056a9c.webp);\n                --mobileday-bg: url(https://cdn.aimiliy.top/backImg/418aa5a692048078aec56e073ed15e8849ff99a012daa8-4Bc9wf.webp);\n                --mobilenight-bg: url(https://cdn.aimiliy.top/backImg/20191012131221_mTGle.webp);\n              }",localStorage.setItem("blogbg","default")):(n=a,document.getElementById("defineBg").innerText=`:root{\n                --default-bg: ${n};\n                --darkmode-bg: ${n};\n                --mobileday-bg: ${n};\n                --mobilenight-bg: ${n};\n              }`);const l=document.getElementById("site-name"),s=document.getElementById("site-title"),r=document.getElementById("site-subtitle"),i=document.getElementById("post-info"),c=document.getElementById("menu_shadow"),m="true"===localStorage.getItem("light");l&&(l.style.animation=m?"light_15px 10s linear infinite":"none"),s&&(s.style.animation=m?"light_15px 10s linear infinite":"none"),r&&(r.style.animation=m?"light_10px 10s linear infinite":"none"),i&&(i.style.animation=m?"light_5px 10s linear infinite":"none"),c.innerText=m?":root{--menu-shadow: 0 0 1px var(--theme-color);}":":root{--menu-shadow: none;}";const d=document.getElementById("nav");"1"==localStorage.getItem("nav")?(d.classList.add("nav_fixed"),d.classList.add("permanent"),d.classList.remove("nav_visible"),document.getElementById("nav-display").innerText=":root { --nav-visible-display: none; --nav-fixed-display: inline-flex; }"):(d.classList.add("nav_visible"),d.classList.remove("nav_fixed"),d.classList.remove("permanent"),document.getElementById("nav-display").innerText=":root { --nav-visible-display: inline-flex; --nav-fixed-display: none; }")},i=()=>{try{rmf.showRightMenu(!1),$(".rmMask").attr("style","display: none")}catch(e){console.error("Error calc percent:",e)}let e=document.documentElement.scrollTop,t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-document.documentElement.clientHeight,o=Math.round(e/t*100),a=document.querySelector("#go-up");o<95?(a.childNodes[0].style.display="none",a.childNodes[1].style.display="block",a.childNodes[1].innerHTML=o+"<span>%</span>"):(a.childNodes[1].style.display="none",a.childNodes[0].style.display="block")},c=async()=>{const e=localStorage.getItem("MuXiaoChenVersion");((e,t)=>null===t||t!==e)(a,e)&&(localStorage.setItem("MuXiaoChenVersion",a),l({id:"7397995017",type:"playlist",server:"tencent"}),await new Promise((e=>{setTimeout((()=>{s("提示🍒","(｡･∀･)ﾉﾞ由于网站部分设置功能更新，当前已为您重置所有设置，祝您愉快！","warning",5e3),e()}),500)})))},m=(e,t=!1)=>{if(t)return void(n.innerHTML='<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b><span style="padding:10px;display: flex;justify-content: center;align-items: center;">&emsp;&emsp;您当前的网络较慢，正在加速获取您的位置信息！</span></b>');let o,a,l,s=((e,t,o,a)=>{const{sin:n,cos:l,asin:s,PI:r,hypot:i}=Math;let c=(e,t)=>(e*=r/180,{x:l(t*=r/180)*l(e),y:l(t)*n(e),z:n(t)}),m=c(e,t),d=c(o,a),g=2*s(i(m.x-d.x,m.y-d.y,m.z-d.z)/2)*6371;return Math.round(g)})(114.34253,30.49984,e.result.location.lng,e.result.location.lat),r=e.result.ad_info.nation;switch(e.result.ad_info.nation){case"日本":a="よろしく，一起去看樱花吗";break;case"美国":a="Let us live in peace!";break;case"英国":a="想同你一起夜乘伦敦眼";break;case"俄罗斯":a="干了这瓶伏特加！";break;case"法国":a="C'est La Vie";break;case"德国":a="Die Zeit verging im Fluge.";break;case"澳大利亚":a="一起去大堡礁吧！";break;case"加拿大":a="拾起一片枫叶赠予你";break;case"中国":switch(r=e.result.ad_info.province+" "+e.result.ad_info.city+" "+e.result.ad_info.district,o=e.result.ip,e.result.ad_info.province){case"北京市":a="北——京——欢迎你~~~";break;case"天津市":a="讲段相声吧。";break;case"河北省":a="山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";break;case"山西省":a="展开坐具长三尺，已占山河五百余。";break;case"内蒙古自治区":a="天苍苍，野茫茫，风吹草低见牛羊。";break;case"辽宁省":a="我想吃烤鸡架！";break;case"吉林省":a="状元阁就是东北烧烤之王。";break;case"黑龙江省":a="很喜欢哈尔滨大剧院。";break;case"上海市":a="众所周知，中国只有两个城市。";break;case"江苏省":switch(e.result.ad_info.city){case"南京市":a="这是我挺想去的城市啦。";break;case"苏州市":a="上有天堂，下有苏杭。";break;default:a="散装是必须要散装的。"}break;case"浙江省":a="东风渐绿西湖柳，雁已还人未南归。";break;case"河南省":switch(e.result.ad_info.city){case"郑州市":a="豫州之域，天地之中。";break;case"南阳市":a="臣本布衣，躬耕于南阳。此南阳非彼南阳！";break;case"驻马店市":a="峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";break;case"开封市":a="刚正不阿包青天。";break;case"洛阳市":a="洛阳牡丹甲天下。";break;default:a="可否带我品尝河南烩面啦？"}break;case"安徽省":a="蚌埠住了，芜湖起飞。";break;case"福建省":a="井邑白云间，岩城远带山。";break;case"江西省":a="落霞与孤鹜齐飞，秋水共长天一色。";break;case"山东省":a="遥望齐州九点烟，一泓海水杯中泻。";break;case"湖北省":a="来碗热干面！";break;case"湖南省":a="74751，长沙斯塔克。";break;case"广东省":a="老板来两斤福建人。";break;case"广西壮族自治区":a="桂林山水甲天下。";break;case"海南省":a="朝观日出逐白浪，夕看云起收霞光。";break;case"四川省":a="康康川妹子。";break;case"贵州省":a="茅台，学生，再塞200。";break;case"云南省":a="玉龙飞舞云缠绕，万仞冰川直耸天。";break;case"西藏自治区":a="躺在茫茫草原上，仰望蓝天。";break;case"陕西省":a="来份臊子面加馍。";break;case"甘肃省":a="羌笛何须怨杨柳，春风不度玉门关。";break;case"青海省":a="牛肉干和老酸奶都好好吃。";break;case"宁夏回族自治区":a="大漠孤烟直，长河落日圆。";break;case"新疆维吾尔自治区":a="驼铃古道丝绸路，胡马犹闻唐汉风。";break;case"台湾省":a="我在这头，大陆在那头。";break;case"香港特别行政区":a="永定贼有残留地鬼嚎，迎击光非岁玉。";break;case"澳门特别行政区":a="性感荷官，在线发牌。";break;default:a="带我去你的城市逛逛吧！"}break;default:a="带我去你的国家逛逛吧。"}let i=new Date;l=i.getHours()>=5&&i.getHours()<11?"<span>上午好</span>，一日之计在于晨！":i.getHours()>=11&&i.getHours()<13?"<span>中午好</span>，该摸鱼吃午饭了。":i.getHours()>=13&&i.getHours()<15?"<span>下午好</span>，懒懒地睡个午觉吧！":i.getHours()>=15&&i.getHours()<16?"<span>三点几啦</span>，一起饮茶呀！":i.getHours()>=16&&i.getHours()<19?"<span>夕阳无限好！</span>":i.getHours()>=19&&i.getHours()<24?"<span>晚上好</span>，夜生活嗨起来！":"夜深了，早点休息，少熬夜。";try{n.innerHTML=`<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${r}</span> 的小伙伴，${l}您现在距离站长约 <span style="color:var(--theme-color)">${s}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${o}</span>， ${a}</b>`}catch(e){console.log("Pjax加载首页欢迎语异常：",e)}};return{init:()=>{Object.assign(window,{initItem:l,$notify:s,currentVersion:a,onscroll:i}),c().then((e=>{})),(()=>{const o=localStorage.getItem("universe");(null==o||"block"!==o&&"none"!==o)&&localStorage.setItem("universe","block"),e.style.display=localStorage.getItem("universe");const a=localStorage.getItem("snow");(null==a||"block"!==a&&"none"!==a)&&localStorage.setItem("snow","none"),t.style.display=localStorage.getItem("snow");const n=localStorage.getItem("fpson");(null==n||"1"!==n&&"0"!==n)&&localStorage.setItem("fpson","1");const l=localStorage.getItem("aside");(null==l||"1"!==l&&"0"!==l)&&localStorage.setItem("aside","1");const s=localStorage.getItem("asidePos");(null==s||"0"!==s&&"1"!==s)&&localStorage.setItem("asidePos","1");const r=localStorage.getItem("nav");(null==r||"1"!==r&&"0"!==r)&&localStorage.setItem("nav","1");const i=localStorage.getItem("rs");(null==i||"block"!==i&&"none"!==i)&&localStorage.setItem("rs","block");const c=localStorage.getItem("transNum");(null==c||isNaN(c)||c<0||c>100)&&localStorage.setItem("transNum",85);const m=localStorage.getItem("blurRad");(null==m||isNaN(m)||m<0||m>100)&&localStorage.setItem("blurRad",20);const d=localStorage.getItem("blur");(null==d||"1"!==d&&"0"!==d)&&localStorage.setItem("blur",0);const g=localStorage.getItem("light");(null==g||"true"!==g&&"false"!==g)&&localStorage.setItem("light","true");const u=localStorage.getItem("mouse");(null==u||"on"!==u&&"off"!==u)&&localStorage.setItem("mouse","on"),"dark"==("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(document.getElementById("modeicon").setAttribute("xlink:href","#icon-sun"),document.getElementById("modeiconT").setAttribute("xlink:href","#icon-sun")):(document.getElementById("modeicon").setAttribute("xlink:href","#icon-Moon2"),document.getElementById("modeiconT").setAttribute("xlink:href","#icon-moon"))})(),r(),(()=>{const e=document.getElementById("name-container");e.setAttribute("style","display:none");var t=$(window).scrollTop();$(window).scroll((function(){var o=$(window).scrollTop();o>t?(e.setAttribute("style",""),document.getElementsByClassName("menus_items")[1].setAttribute("style","display:none!important")):(document.getElementsByClassName("menus_items")[1].setAttribute("style",""),e.setAttribute("style","display:none")),t=o})),document.getElementById("page-name").innerText=document.title.split(" | MuXiaoChen🍊")[0]})(),(async()=>{if(!/^\/(?:page\/\d+\/|)$/.test(window.location.pathname))return;let e=localStorage.getItem("ipLocation"),t=localStorage.getItem("locationTime"),o=(new Date).getTime();if(e&&t&&o-t<18e5)m(JSON.parse(e));else{m(null,!0);try{const e=await $.ajax({type:"get",url:"https://apis.map.qq.com/ws/location/v1/ip",data:{key:"UEVBZ-KBWCW-L67R2-YZ7NC-CYZY3-LKFR5",output:"jsonp"},dataType:"jsonp"});localStorage.setItem("ipLocation",JSON.stringify(e)),localStorage.setItem("locationTime",o),m(e)}catch(e){m({result:{ad_info:{nation:"未知",province:"未知",city:"未知"},location:{lat:0,lng:0}}})}}})().then((e=>{}))}}})().init();
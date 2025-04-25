// (() => {
//     "use strict";
//     const $universe = document.getElementById("universe");
//     const $snow = document.getElementById("snow");
//     const $settingStyle = document.getElementById("settingStyle")
//     const $welcomeInfo = document.getElementById("welcome-info");
//     const $modeIcon = document.getElementById('modeicon');
//     const $modeIconT = document.getElementById('modeiconT');
//     const $dataTheme = document.documentElement.getAttribute('data-theme');
//     const $globalFont = document.getElementById("global-font");
//     const $defineBg = document.getElementById("defineBg");
//     const nameContainer = document.getElementById("name-container");
//     const menusItems = document.getElementsByClassName("menus_items");
//     const pageName = document.getElementById("page-name");
//
//     const PjaxInit = (() => {
//         const initStorage = () => {
//             // 星空背景开关
//             const universe = localStorage.getItem("universe");
//             if (universe == undefined || (universe !== 'block' && universe !== 'none')) {
//                 localStorage.setItem("universe", "block");
//             }
//             $universe.style.display = localStorage.getItem("universe");
//
//             // 雪花开关
//             const snow = localStorage.getItem("snow");
//             if (snow == undefined || (snow !== 'block' && snow !== 'none')) {
//                 localStorage.setItem("snow", "none");
//             }
//             $snow.style.display = localStorage.getItem("snow");
//
//             // 帧率检测
//             const fps = localStorage.getItem("fpson");
//             if (fps == undefined || (fps !== '1' && fps !== '0')) {
//                 localStorage.setItem("fpson", "1");
//             }
//
//             // 侧栏显隐
//             const aside = localStorage.getItem("aside");
//             if (aside == undefined || (aside !== '1' && aside !== '0')) {
//                 localStorage.setItem("aside", "1");
//             }
//
//             // 侧栏位置
//             const asidePos = localStorage.getItem("asidePos")
//             if (asidePos == undefined || (asidePos !== '0' && asidePos !== '1')) {
//                 localStorage.setItem("asidePos", "1");
//             }
//
//             // 顶栏常驻
//             const nav = localStorage.getItem("nav");
//             if (nav == undefined || (nav !== '1' && nav !== '0')) {
//                 localStorage.setItem("nav", "1");
//             }
//
//             // 侧边栏开关
//             const rs = localStorage.getItem("rs");
//             if (rs == undefined || (rs !== 'block' && rs !== 'none')) {
//                 localStorage.setItem("rs", "block");
//             }
//
//             // 透明度调节滑块
//             const transNum = localStorage.getItem("transNum");
//             if (transNum == undefined || isNaN(transNum) || transNum < 0 || transNum > 100) {
//                 localStorage.setItem("transNum", "85");
//             }
//
//             // 模糊度调节滑块
//             const blurRad = localStorage.getItem("blurRad");
//             if (blurRad == undefined || isNaN(blurRad) || blurRad < 0 || blurRad > 100) {
//                 localStorage.setItem("blurRad", "20");
//             }
//
//             // 模糊效果开关
//             const blur = localStorage.getItem("blur");
//             if (blur == undefined || (blur !== '1' && blur !== '0')) {
//                 localStorage.setItem("blur", "0");
//             }
//
//             // 黑夜霓虹灯开关
//             const light = localStorage.getItem("light");
//             if (light == undefined || (light !== 'true' && light !== 'false')) {
//                 localStorage.setItem("light", "true");
//             }
//
//             // 右键开关
//             const mouse = localStorage.getItem("mouse");
//             if (mouse == undefined || (mouse !== 'on' && mouse !== 'off')) {
//                 localStorage.setItem("mouse", "on");
//             }
//
//             // 初始化昼夜切换图标
//             const modeIconHref = $dataTheme === 'dark' ? '#icon-sun' : '#icon-Moon2';
//             const modeIconTHref = $dataTheme === 'dark' ? '#icon-sun' : '#icon-moon';
//
//             if ($modeIcon.getAttribute('xlink:href') !== modeIconHref) {
//                 $modeIcon.setAttribute('xlink:href', modeIconHref);
//             }
//
//             if ($modeIconT.getAttribute('xlink:href') !== modeIconTHref) {
//                 $modeIconT.setAttribute('xlink:href', modeIconTHref);
//             }
//         };
//
//         const initProperties = () => {
//             // 字体初始化
//             try {
//                 const currentFont = localStorage.getItem("font") || "LXGW";
//                 localStorage.setItem("font", currentFont);
//
//                 const defaultFontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif";
//                 const customFontFamily = `var(--global-font), -apple-system, IBM Plex Mono, monospace, '微软雅黑', sans-serif`;
//
//                 if (currentFont === "default") {
//                     $globalFont.textContent = `:root{--global-font: -apple-system; }`;
//                     document.body.style.fontFamily = defaultFontFamily;
//                 } else {
//                     $globalFont.textContent = `:root{--global-font: ${currentFont}; }`;
//                     document.body.style.fontFamily = customFontFamily;
//                 }
//             } catch (error) {
//                 console.error('Error accessing localStorage:', error);
//                 $globalFont.textContent = `:root{--global-font: -apple-system; }`;
//                 document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif";
//             }
//
//             // 初始化设置主题色
//             try {
//                 const currentColor = localStorage.getItem("themeColor") || "green";
//                 localStorage.setItem("themeColor", currentColor);
//                 document.getElementById("themeColor").textContent = `:root{--theme-color:` + btf.map.get(currentColor) + ` !important}`;
//                 // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
//                 const theme_color = btf.map.get(currentColor);
//                 const trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
//                 const high_trans_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
//                 const hh_trans_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.1)";
//                 document.getElementById("global-color").textContent = `:root{--text-bg-hover: ${trans_theme_color}; --high-trans-color: ${high_trans_color}; --hh-trans-color: ${hh_trans_color}; }`
//                 // 刷新鼠标颜色
//                 // btf.CURSOR.refresh();
//             } catch (err) {
//                 console.log("Setting color exception：", err)
//             }
//
//             // 侧边显示隐藏
//             document.getElementById("aside-show").textContent = localStorage.getItem("aside") == "1"
//                 ? `:root{--layout-justify-content: unset; --aside-content-display: block; }`
//                 : `:root{--layout-justify-content: center; --aside-content-display: none; }`;
//
//             // 侧边位置
//             document.getElementById("aside-pos").textContent = localStorage.getItem("asidePos") == "1"
//                 ? `:root{--first-child-order: 0; --recent-post-item-margin: 0; --recent-post-item-margin-other: 0 0 0 15px; }`
//                 : `:root{--first-child-order: 2; --recent-post-item-margin: 0 15px 0 0; --recent-post-item-margin-other: 0 15px 0 0; }`;
//
//             // 初始化透明度
//             const curTransNum = localStorage.getItem("transNum") || 85;
//             document.getElementById("transPercent").textContent = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(20, 24, 30, ${curTransNum}%) !important; --trans-comment-dark: rgba(28, 32, 40, ${curTransNum}%) !important} `;
//
//             // 初始化模糊半径
//             const curBlur = localStorage.getItem("blurRad") || 20;
//             document.getElementById("bgFilterParam").textContent = `:root{--blur-num: blur(${curBlur}px) saturate(120%) contrast(105%) !important; `;
//
//             // 初始化模糊效果开关
//             $settingStyle.textContent = localStorage.getItem("blur") == "0"
//                 ? `:root{--bg-filter: none; }`
//                 : `:root{--bg-filter: var(--blur-num); }`;
//
//             const resetCacheBg_ = () => {
//                 $defineBg.textContent = `:root{
//                 --default-bg: url(https://neko.aimiliy.top/v1/wallpaper?type=pc);
//                 --darkmode-bg:url(https://neko.aimiliy.top/v1/wallpaper?type=pc);
//                 --mobileday-bg: url(https://cdn.aimiliy.top/backImg/418aa5a692048078aec56e073ed15e8849ff99a012daa8-4Bc9wf.webp);
//                 --mobilenight-bg: url(https://cdn.aimiliy.top/backImg/20191012131221_mTGle.webp);
//               }`;
//             }
//
//             const setCacheBg = (s) => {
//                 $defineBg.textContent = `:root{
//                 --default-bg: ${s};
//                 --darkmode-bg: ${s};
//                 --mobileday-bg: ${s};
//                 --mobilenight-bg: ${s};
//               }`;
//             }
//
//             // 背景初始化
//             const blogBg = localStorage.getItem("blogbg") || "default";
//             if (blogBg === "default") {
//                 resetCacheBg_();
//                 localStorage.setItem("blogbg", "default");
//             } else {
//                 setCacheBg(blogBg);
//             }
//
//             // 初始化霓虹灯状态
//             const siteName = document.getElementById("site-name");
//             const siteTitle = document.getElementById("site-title");
//             const siteSubTitle = document.getElementById("site-subtitle");
//             const postInfo = document.getElementById("post-info");
//             const menuShadow = document.getElementById("menu_shadow");
//             const flag = localStorage.getItem("light") === "true";
//             if (siteName) {
//                 siteName.style.animation = (flag ? "light_15px 10s linear infinite" : "none");
//             }
//             if (siteTitle) {
//                 siteTitle.style.animation = flag ? "light_15px 10s linear infinite" : "none";
//             }
//             if (siteSubTitle) {
//                 siteSubTitle.style.animation = flag ? "light_10px 10s linear infinite" : "none";
//             }
//             if (postInfo) {
//                 postInfo.style.animation = flag ? "light_5px 10s linear infinite" : "none";
//             }
//             menuShadow.innerText = flag ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}` : `:root{--menu-shadow: none;}`;
//
//         }
//
//         const tonav = () => {
//             if(!nameContainer.classList.contains("visible")) nameContainer.classList.add("visible")
//             let position = window.scrollY; // 获取当前滚动位置
//             const scrollTonav = btf.debounce(() => {
//                 const scroll = window.scrollY; // 获取最新的滚动位置
//                 if (scroll > position && scroll > 60) {
//                     if (nameContainer.classList.contains("visible")) nameContainer.classList.remove("visible")
//                     if (menusItems[1]) {
//                         if(!menusItems[1].classList.contains("visible")) menusItems[1].classList.add("visible")
//                     }
//                 } else {
//                     if(!nameContainer.classList.contains("visible")) nameContainer.classList.add("visible")
//                     if (menusItems[1]) {
//                         if(menusItems[1].classList.contains("visible")) menusItems[1].classList.remove("visible")
//                     }
//                 }
//                 position = scroll;
//             }, 50);// 50ms 为防抖的延迟时间
//             btf.addEventListenerPjax("scroll", window, scrollTonav, "scrollTonav");
//             // 修复没有右键菜单的用户无法回顶部问题
//             pageName.innerText = document.title.split(" | MuXiaoChen🍊")[0];
//         }
//
//         const checkAndResetSettings = async () => {
//             const storedVersion = localStorage.getItem("MuXiaoChenVersion");
//
//             const shouldResetSettings = (currentVersion, storedVersion) => {
//                 return storedVersion === null || storedVersion !== currentVersion;
//             }
//             const notifyUser = () => {
//                 return new Promise((resolve) => {  // 确保 notifyUser 返回一个 Promise
//                     setTimeout(() => {
//                         btf.$notify("提示🍒", "(｡･∀･)ﾉﾞ由于网站部分设置功能更新，当前已为您重置所有设置，祝您愉快！", "warning", 5e3);
//                         resolve();  // 任务完成，通知 await 继续执行
//                     }, 5e2)
//                 });
//             }
//
//             if (shouldResetSettings(btf.currentVersion, storedVersion)) {
//                 localStorage.setItem("MuXiaoChenVersion", btf.currentVersion);
//                 btf.initItem({id: "7397995017", type: "playlist", server: "tencent"});
//                 await notifyUser();
//             }
//         }
//
//         const getLocationByIP = () => {
//             return new Promise((resolve, reject) => {
//                 const callbackName = 'jsonp_callback_' + Math.random().toString(36).substr(2, 10);
//
//                 // 定义全局回调函数
//                 window[callbackName] = function(data) {
//                     resolve(data);
//                     // 清理脚本标签和全局函数
//                     document.body.removeChild(script);
//                     delete window[callbackName];
//                 };
//
//                 // 构建 script 标签
//                 const script = document.createElement('script');
//                 script.src = `https://apis.map.qq.com/ws/location/v1/ip?key=UEVBZ-KBWCW-L67R2-YZ7NC-CYZY3-LKFR5&output=jsonp&callback=${callbackName}`;
//                 script.onerror = function(err) {
//                     reject(err);
//                     delete window[callbackName];
//                 };
//
//                 document.body.appendChild(script);
//             });
//         }
//
//         const fetchLocationAndWelcome = async () => {
//             let locationData = null;  // 用来存储获取到的位置信息
//             const regex = /^\/(?:page\/\d+\/|)$/;
//             if (!regex.test(window.location.pathname)) {
//                 return;
//             }
//             // 检查 localStorage 中是否有缓存的地理位置信息，且缓存未过期
//             let cachedLocation = localStorage.getItem('ipLocation');
//             let cachedTime = localStorage.getItem('locationTime');
//             let currentTime = new Date().getTime();
//             const cacheDuration = 30 * 60 * 1000; // 30分钟
//             if (cachedLocation && cachedTime && (currentTime - cachedTime < cacheDuration)) {
//                 showWelcome(JSON.parse(cachedLocation)); // 直接使用缓存数据
//                 return;
//             }
//
//             // 缓存失效时，先显示“网络较慢”提示
//             showWelcome(locationData, true);
//
//             try {
//                 const res = await getLocationByIP();
//                 // 请求成功，存入缓存
//                 localStorage.setItem('ipLocation', JSON.stringify(res));
//                 localStorage.setItem('locationTime', currentTime);
//                 locationData = res; // 请求成功，获取位置数据
//
//             } catch (err) {
//                 console.error('Location fetch failed:', err);
//                 locationData = {
//                     result: {
//                         ad_info: { nation: "未知", province: "未知", city: "未知" },
//                         location: { lat: 0, lng: 0 }
//                     }
//                 }
//             } finally {
//                 // 在finally块中显示欢迎信息，无论请求是否成功
//                 showWelcome(locationData); // 显示位置信息或默认信息
//             }
//         }
//
//         const getDistance = (e1, n1, e2, n2) => {
//             const R = 6371;
//             const toRad = deg => deg * Math.PI / 180;
//
//             const dLat = toRad(n2 - n1);
//             const dLng = toRad(e2 - e1);
//
//             const a = Math.sin(dLat / 2) ** 2 +
//                 Math.cos(toRad(n1)) * Math.cos(toRad(n2)) *
//                 Math.sin(dLng / 2) ** 2;
//
//             const c = 2 * Math.asin(Math.sqrt(a));
//             return Math.round(R * c);
//         };
//
//
//         const getPosDesc = (nation, province, city) => {
//             const descriptions = {
//                 "日本": "よろしく，一起去看樱花吗",
//                 "美国": "Let us live in peace!",
//                 "英国": "想同你一起夜乘伦敦眼",
//                 "俄罗斯": "干了这瓶伏特加！",
//                 "法国": "C'est La Vie",
//                 "德国": "Die Zeit verging im Fluge.",
//                 "澳大利亚": "一起去大堡礁吧！",
//                 "加拿大": "拾起一片枫叶赠予你",
//                 "中国": {
//                     "北京市": "北——京——欢迎你~~~",
//                     "天津市": "讲段相声吧。",
//                     "河北省": "山势巍巍成壁垒，天下雄关...",
//                     "山西省": "展开坐具长三尺，已占山河五百余。",
//                     "内蒙古自治区": "天苍苍，野茫茫，风吹草低见牛羊。",
//                     "辽宁省": "我想吃烤鸡架！",
//                     "吉林省": "状元阁就是东北烧烤之王。",
//                     "黑龙江省": "很喜欢哈尔滨大剧院。",
//                     "上海市": "众所周知，中国只有两个城市。",
//                     "江苏省": {
//                         "南京市": "这是我挺想去的城市啦。",
//                         "苏州市": "上有天堂，下有苏杭。",
//                         "default": "散装是必须要散装的。"
//                     },
//                     "浙江省": "东风渐绿西湖柳，雁已还人未南归。",
//                     "河南省": {
//                         "郑州市": "豫州之域，天地之中。",
//                         "南阳市": "臣本布衣，躬耕于南阳。此南阳非彼南阳！",
//                         "驻马店市": "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！",
//                         "default": "可否带我品尝河南烩面啦？"
//                     },
//                     "安徽省": "蚌埠住了，芜湖起飞。",
//                     "福建省": "井邑白云间，岩城远带山。",
//                     "江西省": "落霞与孤鹜齐飞，秋水共长天一色。",
//                     "山东省": "遥望齐州九点烟，一泓海水杯中泻。",
//                     "湖北省": "来碗热干面！",
//                     "湖南省": "74751，长沙斯塔克。",
//                     "广东省": "老板来两斤福建人。",
//                     "广西壮族自治区": "桂林山水甲天下。",
//                     "海南省": "朝观日出逐白浪，夕看云起收霞光。",
//                     "四川省": "康康川妹子。",
//                     "贵州省": "茅台，学生，再塞200。",
//                     "云南省": "玉龙飞舞云缠绕，万仞冰川直耸天。",
//                     "西藏自治区": "躺在茫茫草原上，仰望蓝天。",
//                     "陕西省": "来份臊子面加馍。",
//                     "甘肃省": "羌笛何须怨杨柳，春风不度玉门关。",
//                     "青海省": "牛肉干和老酸奶都好好吃。",
//                     "宁夏回族自治区": "大漠孤烟直，长河落日圆。",
//                     "新疆维吾尔自治区": "驼铃古道丝绸路，胡马犹闻唐汉风。",
//                     "台湾省": "我在这头，大陆在那头。",
//                     "香港特别行政区": "永定贼有残留地鬼嚎，迎击光非岁玉。",
//                     "澳门特别行政区": "性感荷官，在线发牌。",
//                     "default": "带我去你的城市逛逛吧！"
//                 },
//                 "default": "带我去你的国家逛逛吧。"
//             };
//
//             // 判断如果是中国，并且省份存在时，进一步判断城市
//             if (nation === "中国" && descriptions[nation]) {
//                 // 如果省份存在，且省份是一个对象，表示省份下有多个城市
//                 if (descriptions[nation][province]) {
//                     if (typeof descriptions[nation][province] === 'object') {
//                         // 如果城市存在，返回对应的城市描述
//                         if (descriptions[nation][province][city]) {
//                             return descriptions[nation][province][city];
//                         } else {
//                             // 默认返回省级的描述
//                             return descriptions[nation][province].default || "该城市暂无描述";
//                         }
//                     } else {
//                         // 如果省份不是对象，直接返回该省份描述
//                         return descriptions[nation][province];
//                     }
//                 }
//             }
//
//             // 如果是其他国家，直接返回该国家的描述
//             if (descriptions[nation]) {
//                 return descriptions[nation];
//             }
//
//             // 默认返回
//             return descriptions.default;
//         };
//
//
//         const getTimeGreeting = () => {
//             const hours = new Date().getHours();
//             if (hours >= 5 && hours < 11) return "<span>早上好</span>，今天也要元气满满呀！";
//             if (hours >= 11 && hours < 13) return "<span>中午好</span>，先放下工作吃顿好的吧～";
//             if (hours >= 13 && hours < 15) return "<span>下午好</span>，小憩一会儿，别太累了哦。";
//             if (hours >= 15 && hours < 16) return "<span>茶点时间</span>到啦！来杯奶茶提提神～";
//             if (hours >= 16 && hours < 19) return "<span>傍晚好</span>，夕阳正美，记得休息眼睛。";
//             if (hours >= 19 && hours < 24) return "<span>晚上好</span>，今天也辛苦啦，放松一下吧～";
//             return "<span>夜深了</span>，早点休息，别再刷手机啦～";
//         };
//
//         const showWelcome = (ipLoacation, isLoading) => {
//
//             // 如果是加载中，显示网络提示
//             if (isLoading) {
//                 $welcomeInfo.innerHTML = `<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b><span style="padding:10px;display: flex;justify-content: center;align-items: center;">&emsp;&emsp;您当前的网络较慢，正在加速获取您的位置信息！</span></b>`;
//                 return;
//             }
//             // 获取位置距离
//             let dist = getDistance(114.34253, 30.49984, ipLoacation.result.location.lng, ipLoacation.result.location.lat); // 替换为实际经纬度
//
//             let pos = ipLoacation.result.ad_info.nation;
//
//             if(ipLoacation.result.ad_info.province){
//                 pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
//             }
//
//             let ip = ipLoacation.result.ip;
//
//             // 获取位置描述
//             let posdesc = getPosDesc(ipLoacation.result.ad_info.nation, ipLoacation.result.ad_info.province, ipLoacation.result.ad_info.city);
//
//             // 获取时间段问候语
//             let timeChange = getTimeGreeting();
//
//             try {
//                 // 更新欢迎信息
//                 $welcomeInfo.innerHTML =
//                     `<div style="text-align: center;"><b>🎉 欢迎信息 🎉</b></div><b>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
//             } catch (err) {
//                 console.error("加载首页欢迎语异常：", err);
//             }
//         };
//
//
//         const isDevToolKey = (e) => {
//             const devToolKeys = ["F12", "I", "J", "C", "U"];
//             // 检查是否是指定的快捷键，且是否按下了 Ctrl 和 Shift 键
//             return devToolKeys.includes(e.key) &&
//                 (
//                     e.key === "F12" ||
//                     (e.ctrlKey && e.shiftKey && devToolKeys.slice(1, 4).includes(e.key)) ||
//                     (e.ctrlKey && e.key === "U")
//                 );
//         };
//
//         const onCopy = btf.debounce(() => {
//             btf.$notify("哎嘿！复制成功🍬", '若要转载最好保留原文链接哦，给你一个大大的赞！', "success", 3000);
//         }, 5e2, true);
//
//         const onKeydownGPL = btf.debounce((e) => {
//             if (isDevToolKey(e)) {
//                 btf.$notify("你已被发现😜", "小伙子，扒源记住要遵循GPL协议！", "warning", 3e3);
//             }
//         }, 5e2, true)
//
//         const onVisibilityChangeTitle = () => {
//             let titleTime;
//             if (document.hidden) {
//                 document.title = '👀跑哪里去了~';
//                 clearTimeout(titleTime);
//             } else {
//                 document.title = '🐖抓到你啦～';
//                 titleTime = setTimeout(() => {
//                     document.title = 'MuXiaoChen🍊';
//                 }, 2e3);
//             }
//         }
//
//         const onResizeCheckWidth = btf.throttle(() => {
//             btf.checkWidth()
//         }, 2e2, {leading: true, trailing: false})
//
//         const postComment = document.querySelectorAll('a[href="#post-comment"]')
//
//         const onClickPostComment = (e) => {
//             e.preventDefault(); // 阻止默认的锚点跳转行为
//             // 获取目标元素
//             const targetElement = document.querySelector('#post-comment');
//             if (targetElement) {
//                 // 平滑滚动到目标元素
//                 targetElement.scrollIntoView({
//                     behavior: 'smooth'
//                 });
//             }
//         }
//
//         const onHashChange = () => {
//             let targetId = window.location.hash; // 获取当前 URL 中的 hash
//             if (!targetId) return;
//             targetId = targetId.slice(1)
//             const targetElement = document.getElementById(targetId);
//             if (targetElement) {
//                 targetElement.scrollIntoView({
//                     behavior: 'smooth'
//                 });
//             }
//         }
//
//         const eventConfig = [
//             {
//                 event: "copy",
//                 selector: document, // 可以修改为具体的选择器，或者直接使用 document
//                 callback: onCopy,
//                 eventName: "onCopy"
//             },
//             {
//                 event: "keydown",
//                 selector: document,
//                 callback: onKeydownGPL,
//                 eventName: "onKeydownGPL"
//             },
//             {
//                 event: "visibilitychange",
//                 selector: document,
//                 callback: onVisibilityChangeTitle,
//                 eventName: "onVisibilityChangeTitle"
//             },
//             {
//                 event: "resize",
//                 selector: window,
//                 callback: onResizeCheckWidth,
//                 eventName: "onResizeCheckWidth"
//             },
//             {
//                 event: "click",
//                 selector: postComment,
//                 callback: onClickPostComment,
//                 eventName: "onClickPostComment"
//             },
//             {
//                 event: "hashchange",
//                 selector: window,
//                 callback: onHashChange,
//                 eventName: "onHashChange"
//             }
//         ];
//
//
//         return {
//             init: () => {
//                 checkAndResetSettings() // 检查并重置配置
//                 initStorage(); // 初始化缓存
//                 initProperties();  // 初始化配置
//                 tonav();  // 添加顶栏点击滑动监听
//                 onHashChange(); // 获取URL的哈希值window.location.hash，并添加smooth滑动到页面所在哈希值位置
//                 eventConfig.forEach(config => {
//                     btf.addEventListenerPjax(config.event, config.selector, config.callback, config.eventName);
//                 });  // 循环添加系统Pjax监听器
//                 fetchLocationAndWelcome()  // 获取当前位置
//             }
//         };
//     })()
//
//
//     // 初始化主函数
//     const init = () => {
//         PjaxInit.init();
//     };
//
//     init()
// })()

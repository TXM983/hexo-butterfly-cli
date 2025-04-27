// (() => {
//     "use strict";
//
//     // 公共工具模块
//     const Utils = (() => {
//
//         // umami Token
//         const umiToken = "fM7+vUSp/wpEp/mp0LxXrjS46tMQWimFhssZdUuj2SADnmGfHo5rZMOh4PpYSumeLcUNt4a2+q0TNW6VH5vymKH3YFxPNxOm28yjdAAHD/Tew66V/8Ad/K9dXxULUuMWaSL2hUS2zTGIZWipOYUHzkjRFwShDAYQwfbgOGrmgW/P36qqr9FaZaKt9LYVkbY9hQKQ4tRTlhc8zFgwIn/q3Rw/ot7G0HVprAk3PwBkEdyDfPQd7kchi/f+g1g+1X856/v0O7GirvBeQQ7TPhi4/H0/kNm+ZABPDk6+VomlMNnYdZi1KiW90SfTOcUDlvObyKUbCsQpl/LMiDeAtby+0pzkqaSLSpsr7Y5eoR4pDP4Wt+RaZkkHjawJfYjc";
//
//         const formatDateTime = (timeString) => {
//             const date = new Date(timeString);
//             return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-` +
//                 `${String(date.getUTCDate()).padStart(2, '0')} ` +
//                 `${String(date.getUTCHours() + 8).padStart(2, '0')}:` +
//                 `${String(date.getUTCMinutes()).padStart(2, '0')}:` +
//                 `${String(date.getUTCSeconds()).padStart(2, '0')}`;
//         };
//
//         const fetchUmami = async (startAt, endAt, umiToken) => {
//             try {
//                 // 校验参数是否有效
//                 if (!startAt || !endAt || !umiToken) {
//                     throw new Error('参数 startAt、endAt 或 umiToken 不完整');
//                 }
//                 // 构建请求 URL
//                 const url = new URL('https://umami.aimiliy.top/api/websites/3348d0ad-813b-4d17-98d2-d5404445f786/stats');
//                 url.searchParams.append('startAt', startAt.getTime());
//                 url.searchParams.append('endAt', endAt.getTime());
//                 // 发送请求
//                 const res = await fetch(url.toString(), {
//                     method: 'GET',
//                     cache: 'default',
//                     headers: {
//                         'Authorization': `Bearer ${umiToken}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!res.ok) {
//                     // 根据状态码判断问题
//                     throw new Error(`请求失败，状态码：${res.status} ${res.statusText}`);
//                 }
//                 // 解析响应数据
//                 const data = await res.json();
//                 return data; // 返回解析后的数据
//             } catch (err) {
//                 console.error('获取 umami 统计数据失败：', err.message);
//                 throw err; // 继续抛出错误以便调用方处理
//             }
//         };
//
//         return {formatDateTime, umiToken, fetchUmami};
//     })();
//
//
//     // 音乐播放器模块
//     const MusicPlayer = (() => {
//         const config = {
//             defaultMusic: {id: "7397995017", type: "playlist", server: "tencent"},
//             canvas: document.getElementById('visualizer'),
//             visualizer: {
//                 fftSize: 256,
//                 smoothing: 0.9,
//                 shadowBlur: 15
//             }
//         };
//         const ctx = config.canvas.getContext('2d');
//
//         let localMusic, musicVolume = 0.8, musicListCache;
//         let audioContext, analyser, sourceNode, audioElement, fftId, bufferLength, dataArray;
//
//         const initAudioContext = () => {
//             audioContext = new (window.AudioContext || window.webkitAudioContext)();
//             analyser = audioContext.createAnalyser();
//             analyser.fftSize = config.visualizer.fftSize;
//             analyser.smoothingTimeConstant = config.visualizer.smoothing;
//             bufferLength = analyser.frequencyBinCount;
//             dataArray = new Uint8Array(bufferLength);
//             const removeAudioContext = () => {
//                 if (audioContext) {
//                     // 关闭 AudioContext，释放资源
//                     audioContext.close().then(() => {
//                         audioContext = null;
//                         analyser = null;
//                         sourceNode = null;
//                         audioElement = null;
//                     }).catch(error => {
//                         console.error("Error closing audio context:", error);
//                     });
//                 }
//             }
//             btf.addGlobalFn("pjaxSendOnce", removeAudioContext, "audioContextDestory")
//         };
//
//         const initMusicStorage = () => {
//             try {
//                 localMusic = JSON.parse(localStorage.getItem("localMusic")) || config.defaultMusic;
//             } catch {
//                 localMusic = config.defaultMusic;
//                 localStorage.removeItem("localMusic");
//             }
//             localStorage.setItem("defaultMusic", JSON.stringify(config.defaultMusic));
//             localStorage.setItem("localMusic", JSON.stringify(localMusic));
//         };
//
//
//         const loadMusicListCache = async () => {
//             if (musicListCache) return;
//             try {
//                 const response = await fetch("https://cdn.aimiliy.top/npm/json/musicListCache.json"); // 替换为实际的缓存文件路径
//                 if (!response.ok) {
//                     musicListCache = [{id: "7397995017", type: "playlist", server: "tencent"}];
//                 } else {
//                     musicListCache = await response.json();
//                 }
//             } catch (error) {
//                 musicListCache = [{id: "7397995017", type: "playlist", server: "tencent"}];
//                 console.log("fetch remote musicList error:", error);
//             }
//         }
//
//         const changeMusicBg = (isChangeBg = true) => {
//             const anMusicBg = document.getElementById("an_music_bg");
//             if (isChangeBg) {
//                 const musicCover = document.querySelector("#anMusic-page .aplayer-pic");
//                 const childDivs = musicCover.querySelectorAll("div.child");
//                 if (childDivs.length > 0) {
//                     childDivs[0].style.backgroundImage = musicCover.style.backgroundImage;
//                 } else {
//                     const newDiv = document.createElement("div");
//                     newDiv.classList.add("child");
//                     newDiv.style.backgroundImage = musicCover.style.backgroundImage;
//                     musicCover.appendChild(newDiv);
//                 }
//                 anMusicBg.style.backgroundImage = musicCover.style.backgroundImage;
//             } else {
//                 // 第一次进入，绑定事件，改背景
//                 let timer = setInterval(() => {
//                     const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
//                     // 确保player加载完成
//                     if (musiccover) {
//                         clearInterval(timer);
//                         const childDivs = musiccover.querySelectorAll("div.child");
//                         if (childDivs.length > 0) {
//                             childDivs[0].style.backgroundImage = musiccover.style.backgroundImage;
//                         } else {
//                             const newDiv = document.createElement("div");
//                             newDiv.classList.add("child");
//                             newDiv.style.backgroundImage = musiccover.style.backgroundImage;
//                             musiccover.appendChild(newDiv);
//                         }
//                         anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
//                         // 绑定事件
//                         addMusicEventListeners();
//                         // // 确保第一次能够正确替换背景
//                         // changeMusicBg();
//                     }
//                 }, 100);
//             }
//         }
//
//         const addMusicEventListeners = () => {
//             const anMusicPage = document.getElementById("anMusic-page");
//             const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
//             const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
//             const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
//             const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
//             const onMenuMaskClick = document.getElementById("menu-mask");
//
//             const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
//             const musicPlayerDestroy = () => {
//                 if (metingAplayer) {
//                     metingAplayer.destroy();
//                 }
//             }
//             btf.addGlobalFn('pjaxSendOnce', musicPlayerDestroy, 'anMusicDestroy')
//
//             metingAplayer.volume(musicVolume, true);
//             metingAplayer.on("loadeddata", changeMusicBg);
//             config.canvas.width = window.innerWidth > 1500 ? 1500 : window.innerWidth * 0.95;
//
//             // 缓存 DOM 元素，避免重复查询
//             const element = document.querySelector('#anMusic-page .aplayer-pic');
//             const child = document.querySelector('#anMusic-page .aplayer-pic .child');
//
//             const toggleAnimationState = (state) => {
//                 if (child) {
//                     child.style.animationPlayState = state;
//                 }
//             };
//
//             metingAplayer.on('play', () => {
//                 if (!element.classList.contains("turn-around")) {
//                     element.classList.add("turn-around");
//                 }
//                 toggleAnimationState('running');  // 让动画开始
//                 const newAudio = metingAplayer.audio; // 获取 APlayer 内部的 audio
//                 if (audioContext.state === 'suspended') {
//                     audioContext.resume(); // 确保 AudioContext 启动
//                 }
//                 setupAudioVisualization(newAudio); // 只会执行一次
//                 const currentPlayMeta = metingAplayer.list.audios[metingAplayer.list.index]
//                 navigator.mediaSession.metadata = new MediaMetadata({
//                     title: currentPlayMeta.name,
//                     artist: currentPlayMeta.artist,
//                     album: currentPlayMeta.artist,
//                     artwork: [{src: currentPlayMeta.cover || ''}]
//                 })
//             });
//
//             metingAplayer.on('pause', () => {
//                 if (element.classList.contains("turn-around")) {
//                     element.classList.remove("turn-around");
//                 }
//                 toggleAnimationState('paused');  // 让动画暂停
//                 setTimeout(() => {
//                     window.cancelAnimationFrame(fftId);
//                     ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);  // 清除画布内容
//                 }, 1000); // 延迟 1 秒执行
//             });
//
//
//             const onCanvasResize = btf.throttle(() => {
//                 config.canvas.width = window.innerWidth > 1500 ? 1500 : window.innerWidth * 0.95;
//             }, 1e2, { leading: true, trailing: true });
//
//             const onPlayRandomSongClick = btf.debounce(() => {
//                 playRandomSong(metingAplayer)
//             }, 3e2, true)
//
//             const onRefreshMusicListClick = btf.debounce(() => {
//                 refreshMusicList().then(r => {})
//             }, 3e2, true)
//
//             const onChangeMusicListClick = btf.debounce(() => {
//                 changeMusicList().then(r => {})
//             }, 3e2, true)
//
//             const onDestroyBeforeunload = () => {
//                 if (metingAplayer) {
//                     metingAplayer.destroy();
//                 }
//             }
//
//             const onKeydownHandleKeyboardEvents = btf.debounce((e) => {
//                 handleKeyboardEvents(e, metingAplayer)
//             }, 2e2, true)
//
//
//             const eventMusicConfig = [
//                 {
//                     event: "resize",
//                     selector: window, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onCanvasResize,
//                     eventName: "onCanvasResize"
//                 },
//                 {
//                     event: "click",
//                     selector: aplayerIconMenu, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: openMenu,
//                     eventName: "openMenu"
//                 },
//                 {
//                     event: "click",
//                     selector: onMenuMaskClick, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: closeMenu,
//                     eventName: "closeMenu"
//                 },
//                 {
//                     event: "click",
//                     selector: anMusicBtnGetSong, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onPlayRandomSongClick,
//                     eventName: "onPlayRandomSongClick"
//                 },
//                 {
//                     event: "click",
//                     selector: anMusicRefreshBtn, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onRefreshMusicListClick,
//                     eventName: "onRefreshMusicListClick"
//                 },
//                 {
//                     event: "click",
//                     selector: anMusicSwitchingBtn, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onChangeMusicListClick,
//                     eventName: "onChangeMusicListClick"
//                 },
//                 {
//                     event: "onbeforeunload",
//                     selector: document, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onDestroyBeforeunload,
//                     eventName: "onDestroyBeforeunload"
//                 },
//                 {
//                     event: "onbeforeunload",
//                     selector: document, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onDestroyBeforeunload,
//                     eventName: "onDestroyBeforeunload"
//                 },
//                 {
//                     event: "keydown",
//                     selector: document, // 可以修改为具体的选择器，或者直接使用 document
//                     callback: onKeydownHandleKeyboardEvents,
//                     eventName: "onKeydownHandleKeyboardEvents"
//                 },
//             ]
//
//             eventMusicConfig.forEach(config => {
//                 btf.addEventListenerPjax(config.event, config.selector, config.callback, config.eventName);
//             });
//
//             const removeMusicCanvas = () => {
//                 window.cancelAnimationFrame(fftId);
//                 ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);  // 清除画布内容
//             }
//
//             btf.addGlobalFn('pjaxSendOnce', removeMusicCanvas, 'musicCanvasDestroy');
//         }
//
//         const setupAudioVisualization = (newAudioElement) => {
//             if (!audioElement) {
//                 // **第一次执行**（避免重复创建 sourceNode）
//                 audioElement = newAudioElement;
//                 sourceNode = audioContext.createMediaElementSource(audioElement);
//                 sourceNode.connect(analyser);
//                 analyser.connect(audioContext.destination);
//             }
//             draw(); // 启动绘制
//         }
//
//         const getLightColorFromString = (rgbString) => {
//             // 解析 RGB 字符串，提取 r, g, b
//             const match = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
//             if (!match) {
//                 throw new Error('Invalid RGB string format');
//             }
//
//             const r = parseInt(match[1], 10);
//             const g = parseInt(match[2], 10);
//             const b = parseInt(match[3], 10);
//
//             // 增加颜色亮度：我们可以通过增加一定的值来变亮，但要避免超出范围
//             const increaseAmount = 40; // 你可以根据需要调整增量
//             let lightR = Math.min(r + increaseAmount, 255);
//             let lightG = Math.min(g + increaseAmount, 255);
//             let lightB = Math.min(b + increaseAmount, 255);
//
//             // 转换为十六进制并返回较浅的颜色
//             lightR = lightR.toString(16).padStart(2, '0');
//             lightG = lightG.toString(16).padStart(2, '0');
//             lightB = lightB.toString(16).padStart(2, '0');
//
//             return `#${lightR}${lightG}${lightB}`;
//         };
//
//         let localColor = btf.map.get(localStorage.getItem("themeColor"));
//         let lightColor = getLightColorFromString(localColor);
//
//
//         const draw = () => {
//             analyser.getByteFrequencyData(dataArray);
//             ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
//             if (localColor !== btf.map.get(localStorage.getItem("themeColor"))) {
//                 localColor = btf.map.get(localStorage.getItem("themeColor"));
//                 lightColor = getLightColorFromString(localColor);
//             }
//             const gap = 1;
//             const middleGap = 1; // 控制中间的间距
//             const totalBars = bufferLength * 2;
//             const totalGaps = totalBars - 1;
//             const barWidth = (config.canvas.width - totalGaps * gap - middleGap) / totalBars;
//             const centerX = config.canvas.width / 2;
//
//             const gradient = ctx.createLinearGradient(0, 0, 0, config.canvas.height);
//             gradient.addColorStop(0, localColor);
//             ctx.shadowBlur = 15;
//             ctx.shadowColor = lightColor;
//             ctx.fillStyle = gradient;
//
//             for (let i = 0; i < bufferLength; i++) {
//                 const barHeight = dataArray[i] * 0.5;
//                 const topWidth = barWidth * (1 - (barHeight / config.canvas.height));
//
//                 const xLeft = centerX - middleGap / 2 - (i * (barWidth + gap)) - barWidth;
//                 const xRight = centerX + middleGap / 2 + (i * (barWidth + gap));
//
//                 // 左侧条纹
//                 ctx.beginPath();
//                 ctx.moveTo(xLeft, config.canvas.height);
//                 ctx.lineTo(xLeft + barWidth, config.canvas.height);
//                 ctx.lineTo(xLeft + barWidth - topWidth / 2, config.canvas.height - barHeight);
//                 ctx.lineTo(xLeft + topWidth / 2, config.canvas.height - barHeight);
//                 ctx.closePath();
//                 ctx.fill();
//
//                 // 右侧条纹
//                 ctx.beginPath();
//                 ctx.moveTo(xRight, config.canvas.height);
//                 ctx.lineTo(xRight + barWidth, config.canvas.height);
//                 ctx.lineTo(xRight + barWidth - topWidth / 2, config.canvas.height - barHeight);
//                 ctx.lineTo(xRight + topWidth / 2, config.canvas.height - barHeight);
//                 ctx.closePath();
//                 ctx.fill();
//             }
//             fftId = requestAnimationFrame(draw);
//         }
//
//
//         // 打开和关闭菜单
//         const openMenu = () => {
//             const mask = document.getElementById("menu-mask");
//             mask.style.display = "block";
//             mask.style.animation = "0.5s ease 0s 1 normal none running to_show";
//             document.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity = "1";
//         }
//
//         const closeMenu = () => {
//             document.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
//         }
//
//         // 播放随机歌曲
//         const shuffleArray = (array) => {
//             let len = array.length; // 避免重复访问 array.length
//             for (let i = len - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [array[i], array[j]] = [array[j], array[i]];
//             }
//             return array;
//         };
//
//         const playRandomSong = (metingAplayer) => {
//             const allAudios = metingAplayer.list.audios;
//             if (!allAudios || allAudios.length < 2) return;
//             let shuffledPlaylist;
//             try {
//                 shuffledPlaylist = JSON.parse(localStorage.getItem("shuffledPlaylist")) || [];      // 确保获取的播放列表是一个数组
//                 if (!Array.isArray(shuffledPlaylist)) {
//                     throw new Error("shuffledPlaylist is not a valid array");
//                 }
//             } catch (error) {
//                 shuffledPlaylist = [];
//                 console.log("Error parsing shuffledPlaylist from localStorage:", error);
//             }
//             // 如果播放列表为空或者已经播放完所有歌，就重新洗牌
//             if (shuffledPlaylist.length === 0 || shuffledPlaylist.length === allAudios.length) {
//                 shuffledPlaylist = shuffleArray([...Array(allAudios.length).keys()]); // 生成 [0,1,2,...] 并打乱
//             }
//             // 取出下一首歌
//             const nextIndex = shuffledPlaylist.shift();
//             localStorage.setItem("shuffledPlaylist", JSON.stringify(shuffledPlaylist));
//             metingAplayer.list.switch(nextIndex);
//             metingAplayer.play();
//         };
//
//
//         // 刷新音乐列表
//         const refreshMusicList = async () => {
//             const anMusicPage = document.getElementById("anMusic-page");
//             const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
//             metingAplayer.seek(0); // 将播放进度重置为 0
//             metingAplayer.pause(); // 触发暂停事件
//             localMusic = config.defaultMusic;
//             localStorage.setItem("localMusic", JSON.stringify(config.defaultMusic));
//             const url = buildMusicUrl(localMusic);
//
//             try {
//                 const songs = await fetchSongs(url);
//                 if (songs.length > 0) {
//                     metingAplayer.list.clear();
//                     metingAplayer.list.add(songs);
//                 }
//             } catch (error) {
//                 console.error("Error changing music list:", error);
//             }
//         }
//
//         // 切换歌单
//         const changeMusicList = async () => {
//             const anMusicPage = document.getElementById("anMusic-page");
//             const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
//             let shuffledMusicList;
//             localStorage.removeItem("shuffledPlaylist");
//             metingAplayer.seek(0); // 将播放进度重置为 0
//             metingAplayer.pause(); // 触发暂停事件
//             try {
//                 shuffledMusicList = JSON.parse(localStorage.getItem("shuffledMusicList")) || [];
//                 if (!Array.isArray(shuffledMusicList)) {
//                     throw new Error("shuffledMusicList is not a valid array");
//                 }
//             } catch (error) {
//                 shuffledMusicList = [];
//                 console.log("Error parsing shuffledMusicList from localStorage:", error);
//             }
//
//             // 如果列表为空或已播放完所有歌单，则重新洗牌
//             if (shuffledMusicList.length === 0 || shuffledMusicList.length === musicListCache.length) {
//                 shuffledMusicList = shuffleArray([...Array(musicListCache.length).keys()]); // 生成 [0,1,2,...] 并打乱
//             }
//             let nextIndex = shuffledMusicList.shift();
//             while(musicListCache[nextIndex].id === localMusic.id && shuffledMusicList.length > 0){
//                 nextIndex = shuffledMusicList.shift();
//             }
//             localStorage.setItem("shuffledMusicList", JSON.stringify(shuffledMusicList));
//             localMusic = musicListCache[nextIndex];
//             localStorage.setItem("localMusic", JSON.stringify(localMusic));
//
//             const url = buildMusicUrl(localMusic);
//             try {
//                 const songs = await fetchSongs(url);
//                 if (songs.length > 0) {
//                     metingAplayer.list.clear();
//                     metingAplayer.list.add(songs);
//                 }
//             } catch (error) {
//                 console.error("Error changing music list:", error);
//             }
//         }
//
//         // 构建音乐 URL
//         const buildMusicUrl = (musicData) => {
//             return `https://twikoo.aimiliy.top/music/api?server=${musicData.server}&type=${musicData.type}&id=${musicData.id}&auth=undefined&r=${Math.random() * Date.now()}`;
//         }
//
//         // 获取歌曲
//         const fetchSongs = async (url) => {
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     return [];
//                 }
//                 return await response.json();
//             } catch (error) {
//                 console.error("Error fetching songs:", error);
//                 return []; // 出现错误时返回空数组，保证不影响后续代码
//             }
//         }
//
//         // 键盘事件处理
//         const handleKeyboardEvents = (event, metingAplayer) => {
//             switch (event.code) {
//                 case "Space":
//                     event.preventDefault();
//                     metingAplayer.toggle();
//                     break;
//                 case "ArrowRight":
//                     event.preventDefault();
//                     metingAplayer.skipForward();
//                     break;
//                 case "ArrowLeft":
//                     event.preventDefault();
//                     metingAplayer.skipBack();
//                     break;
//                 case "ArrowUp":
//                     if (musicVolume <= 1) {
//                         musicVolume += 0.1;
//                         metingAplayer.volume(musicVolume, true);
//                     }
//                     break;
//                 case "ArrowDown":
//                     if (musicVolume >= 0) {
//                         musicVolume -= 0.1;
//                         metingAplayer.volume(musicVolume, true);
//                     }
//                     break;
//             }
//         }
//
//         return {
//             init: () => {
//                 const anMusicPageMeting = document.getElementById("anMusic-page-meting");
//                 anMusicPageMeting.innerHTML = `<meting-js id="7397995017" server="tencent" type="playlist" mutex="true" preload="auto" theme="var(--theme-color)" order="list" list-max-height="320px"></meting-js>`;
//                 initMusicStorage();
//                 initAudioContext();
//                 loadMusicListCache();
//                 changeMusicBg(false);
//             }
//         };
//     })();
//
//     // 朋友圈
//     const FcLiteModule = (() => {
//         const initialize_fc_lite = () => {
//             // 用户配置
//             // 设置默认配置
//             UserConfig = {
//                 private_api_url: UserConfig?.private_api_url || "",
//                 page_turning_number: UserConfig?.page_turning_number || 20, // 默认20篇
//                 error_img: UserConfig?.error_img || "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico" // 默认头像
//             };
//
//             const root = document.getElementById('friend-circle-lite-root');
//
//             if (!root) return; // 确保根元素存在
//
//             // 清除之前的内容
//             root.innerHTML = '';
//
//             const randomArticleContainer = document.createElement('div');
//             randomArticleContainer.id = 'random-article';
//             root.appendChild(randomArticleContainer);
//
//             const container = document.createElement('div');
//             container.className = 'articles-container';
//             container.id = 'articles-container';
//             root.appendChild(container);
//
//             const loadMoreBtn = document.createElement('button');
//             loadMoreBtn.id = 'load-more-btn';
//             loadMoreBtn.innerText = '再来亿点';
//             root.appendChild(loadMoreBtn);
//
//             // 创建统计信息容器
//             const statsContainer = document.createElement('div');
//             statsContainer.id = 'stats-container';
//             root.appendChild(statsContainer);
//
//             let start = 0; // 记录加载起始位置
//             let allArticles = []; // 存储所有文章
//
//             const loadMoreArticles = () => {
//                 const cacheKey = 'friend-circle-lite-cache';
//                 const cacheTimeKey = 'friend-circle-lite-cache-time';
//                 const cacheTime = localStorage.getItem(cacheTimeKey);
//                 const now = new Date().getTime();
//
//                 if (cacheTime && (now - cacheTime < 10 * 60 * 1000)) { // 缓存时间小于10分钟
//                     const cachedData = JSON.parse(localStorage.getItem(cacheKey));
//                     if (cachedData) {
//                         processArticles(cachedData);
//                         return;
//                     }
//                 }
//
//                 fetch(`${UserConfig.private_api_url}all.json`)
//                     .then(response => response.json())
//                     .then(data => {
//                         localStorage.setItem(cacheKey, JSON.stringify(data));
//                         localStorage.setItem(cacheTimeKey, now.toString());
//                         processArticles(data);
//                     })
//                     .finally(() => {
//                         loadMoreBtn.innerText = '再来亿点'; // 恢复按钮文本
//                     });
//             }
//
//             const processArticles = (data) => {
//                 allArticles = data.article_data;
//                 // 处理统计数据
//                 const stats = data.statistical_data;
//                 statsContainer.innerHTML = `
//             <div>Powered by: <a href="https://github.com/willow-god/Friend-Circle-Lite" target="_blank">FriendCircleLite</a><br></div>
//             <div>Designed By: <a href="https://www.liushen.fun/" target="_blank">LiuShen</a><br></div>
//             <div>订阅:${stats.friends_num}   活跃:${stats.active_num}   总文章数:${stats.article_num}<br></div>
//             <div>更新时间:${stats.last_updated_time}</div>
//         `;
//
//                 displayRandomArticle(); // 显示随机友链卡片
//
//                 const articles = allArticles.slice(start, start + UserConfig.page_turning_number);
//
//                 articles.forEach(article => {
//                     const card = document.createElement('div');
//                     card.className = 'card';
//
//                     const title = document.createElement('div');
//                     title.className = 'card-title';
//                     title.innerText = article.title;
//                     card.appendChild(title);
//                     title.onclick = () => window.open(article.link, '_blank');
//
//                     const author = document.createElement('div');
//                     author.className = 'card-author';
//                     const authorImg = document.createElement('img');
//                     authorImg.className = 'no-lightbox';
//                     authorImg.src = article.avatar || UserConfig.error_img; // 使用默认头像
//                     authorImg.onerror = () => authorImg.src = UserConfig.error_img; // 头像加载失败时使用默认头像
//                     author.appendChild(authorImg);
//                     author.appendChild(document.createTextNode(article.author));
//                     card.appendChild(author);
//
//                     // author.onclick = () => {
//                     //     showAuthorArticles(article.author, article.avatar, article.link);
//                     // };
//                     const clickHandler = () => {
//                         showAuthorArticles(article.author, article.avatar, article.link);
//                     };
//
//                     btf.addEventListenerPjax('click', author, clickHandler, `click-author-${article.author}`);
//
//                     const date = document.createElement('div');
//                     date.className = 'card-date';
//                     date.innerText = "🗓️" + article.created.substring(0, 10);
//                     card.appendChild(date);
//
//                     const bgImg = document.createElement('img');
//                     bgImg.className = 'card-bg no-lightbox';
//                     bgImg.src = article.avatar || UserConfig.error_img;
//                     bgImg.onerror = () => bgImg.src = UserConfig.error_img; // 头像加载失败时使用默认头像
//                     card.appendChild(bgImg);
//
//                     container.appendChild(card);
//                 });
//
//                 start += UserConfig.page_turning_number;
//
//                 if (start >= allArticles.length) {
//                     loadMoreBtn.style.display = 'none'; // 隐藏按钮
//                 }
//             }
//
//             // 显示随机文章的逻辑
//             const displayRandomArticle = () => {
//                 const randomArticle = allArticles[Math.floor(Math.random() * allArticles.length)];
//                 randomArticleContainer.innerHTML = `
//             <div class="random-container">
//                 <div class="random-container-title">随机钓鱼</div>
//                 <div class="random-title">${randomArticle.title}</div>
//                 <div class="random-author">作者: ${randomArticle.author}</div>
//             </div>
//             <div class="random-button-container">
//                 <a href="#" id="refresh-random-article">刷新</a>
//                 <button class="random-link-button" onclick="window.open('${randomArticle.link}', '_blank')">过去转转</button>
//             </div>
//         `;
//
//                 // 为刷新按钮添加事件监听器
//                 const refreshBtn = document.getElementById('refresh-random-article');
//                 refreshBtn.addEventListener('click', function (event) {
//                     event.preventDefault(); // 阻止默认的跳转行为
//                     displayRandomArticle(); // 调用显示随机文章的逻辑
//                 });
//             }
//
//             const showAuthorArticles = (author, avatar, link) => {
//                 // 如果不存在，则创建模态框结构
//                 if (!document.getElementById('fclite-modal')) {
//                     const modal = document.createElement('div');
//                     modal.id = 'modal';
//                     modal.className = 'modal';
//                     modal.innerHTML = `
//             <div class="modal-content">
//                 <img id="modal-author-avatar" src="" alt="">
//                 <a id="modal-author-name-link"></a>
//                 <div id="modal-articles-container"></div>
//                 <img id="modal-bg" src="" alt="">
//             </div>
//             `;
//                     root.appendChild(modal);
//                 }
//
//                 const modal = document.getElementById('modal');
//                 const modalArticlesContainer = document.getElementById('modal-articles-container');
//                 const modalAuthorAvatar = document.getElementById('modal-author-avatar');
//                 const modalAuthorNameLink = document.getElementById('modal-author-name-link');
//                 const modalBg = document.getElementById('modal-bg');
//
//                 modalArticlesContainer.innerHTML = ''; // 清空之前的内容
//                 modalAuthorAvatar.src = avatar || UserConfig.error_img; // 使用默认头像
//                 modalAuthorAvatar.onerror = () => modalAuthorAvatar.src = UserConfig.error_img; // 头像加载失败时使用默认头像
//                 modalBg.src = avatar || UserConfig.error_img; // 使用默认头像
//                 modalBg.onerror = () => modalBg.src = UserConfig.error_img; // 头像加载失败时使用默认头像
//                 modalAuthorNameLink.innerText = author;
//                 modalAuthorNameLink.href = new URL(link).origin;
//
//                 const authorArticles = allArticles.filter(article => article.author === author);
//                 // 仅仅取前五个，防止文章过多导致模态框过长，如果不够五个则全部取出
//                 authorArticles.slice(0, 4).forEach(article => {
//                     const articleDiv = document.createElement('div');
//                     articleDiv.className = 'modal-article';
//
//                     const title = document.createElement('a');
//                     title.className = 'modal-article-title';
//                     title.innerText = article.title;
//                     title.href = article.link;
//                     title.target = '_blank';
//                     articleDiv.appendChild(title);
//
//                     const date = document.createElement('div');
//                     date.className = 'modal-article-date';
//                     date.innerText = "📅" + article.created.substring(0, 10);
//                     articleDiv.appendChild(date);
//
//                     modalArticlesContainer.appendChild(articleDiv);
//                 });
//
//                 // 设置类名以触发显示动画
//                 modal.style.display = 'block';
//                 setTimeout(() => {
//                     modal.classList.add('modal-open');
//                 }, 10); // 确保显示动画触发
//             }
//
//             // 隐藏模态框的函数
//             const hideModal = () => {
//                 const modal = document.getElementById('modal');
//                 modal.classList.remove('modal-open');
//                 const modalFun = () => {
//                     modal.style.display = 'none';
//                     root.removeChild(modal);
//                 }
//                 btf.addEventListenerPjax('transitionend', modal, modalFun, 'modalFun', {once: true})
//                 // modal.addEventListener('transitionend', () => {
//                 //     modal.style.display = 'none';
//                 //     root.removeChild(modal);
//                 // }, {once: true});
//             }
//
//             // 初始加载
//             loadMoreArticles();
//
//             // 加载更多按钮点击事件
//             btf.addEventListenerPjax('click', loadMoreBtn, loadMoreArticles, 'loadMoreArticles')
//             // loadMoreBtn.addEventListener('click', loadMoreArticles);
//
//             // 点击遮罩层关闭模态框
//             const closeModal = (event) => {
//                 const modal = document.getElementById('modal');
//                 if (event.target === modal) {
//                     hideModal();
//                 }
//             }
//             btf.addEventListenerPjax('click', window, closeModal, 'closeModal')
//             // window.onclick =  (event) => {
//             //     const modal = document.getElementById('modal');
//             //     if (event.target === modal) {
//             //         hideModal();
//             //     }
//             // };
//         };
//
//         return {
//             init: () => {
//                 initialize_fc_lite();
//             }
//         };
//     })()
//
//     // 首页轮播图
//     const SwiperModule = (() => {
//         const swiper = new Swiper('.blog-slider', {
//             passiveListeners: true,
//             spaceBetween: 30,
//             effect: 'fade',
//             loop: true,
//             autoplay: {
//                 disableOnInteraction: true,
//                 delay: 3e3
//             },
//             mousewheel: true,
//             // autoHeight: true,
//             pagination: {
//                 el: '.blog-slider__pagination',
//                 clickable: true,
//             }
//         });
//
//         const initSwiperEvents = () => {
//             const container = document.getElementById('swiper_container');
//             if (!container) return;
//             const mouseEnterHandler = () => swiper.autoplay.stop();
//             const mouseLeaveHandler = () => swiper.autoplay.start();
//             btf.addEventListenerPjax('mouseenter', container, mouseEnterHandler, 'swiper-mouseenter');
//             btf.addEventListenerPjax('mouseleave', container, mouseLeaveHandler, 'swiper-mouseleave');
//
//             btf.addGlobalFn('pjaxSendOnce', () => { swiper.destroy(true, true); }, 'swiperModuleDestory')
//         }
//
//         return {
//             init: () => {
//                 initSwiperEvents();
//             }
//         };
//     })()
//
//     // 首页加载动画模块
//     const ScrollRevealPage = (() => {
//         return {
//             init: () => {
//                 // 初始化 ScrollReveal
//                 const sr = ScrollReveal({
//                     // 动画参数配置
//                     distance: '30px',         // 移动距离
//                     duration: 1000,          // 动画时长
//                     delay: 200,              // 初始延迟
//                     interval: 0,           // 卡片间动画间隔
//                     easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // 弹性缓动曲线
//                     reset: false             // 滚动回视口时是否重复动画
//                 });
//
//                 // 应用动画到卡片
//                 sr.reveal('.wow', {
//                     origin: 'bottom',       // 动画起始方向
//                     opacity: 0,              // 初始透明度
//                     scale: 0.5,             // 初始缩放
//                     mobile: false             // 启用移动端动画
//                 });
//                 const removeScrollReveal = () => {
//                     document.querySelectorAll('[data-sr-id]').forEach(el => {
//                         el.removeAttribute('data-sr-id');
//
//                         // 只清除 ScrollReveal 注入的几个样式
//                         el.style.removeProperty('visibility');
//                         el.style.removeProperty('opacity');
//                         el.style.removeProperty('transform');
//                         el.style.removeProperty('transition');
//                     });
//                 }
//                 btf.addGlobalFn("pjaxSendOnce", removeScrollReveal, 'scrollRevealDestory')
//             }
//         }
//     })();
//
//     // 关于页模块
//     const AboutModule = (() => {
//         const initAboutPage = async () => {
//             const umiToken = "fM7+vUSp/wpEp/mp0LxXrjS46tMQWimFhssZdUuj2SADnmGfHo5rZMOh4PpYSumeLcUNt4a2+q0TNW6VH5vymKH3YFxPNxOm28yjdAAHD/Tew66V/8Ad/K9dXxULUuMWaSL2hUS2zTGIZWipOYUHzkjRFwShDAYQwfbgOGrmgW/P36qqr9FaZaKt9LYVkbY9hQKQ4tRTlhc8zFgwIn/q3Rw/ot7G0HVprAk3PwBkEdyDfPQd7kchi/f+g1g+1X856/v0O7GirvBeQQ7TPhi4/H0/kNm+ZABPDk6+VomlMNnYdZi1KiW90SfTOcUDlvObyKUbCsQpl/LMiDeAtby+0pzkqaSLSpsr7Y5eoR4pDP4Wt+RaZkkHjawJfYjc";
//             // 定义时间范围
//             const now = new Date();
//             const startOfToday = new Date(now.setHours(0, 0, 0, 0));
//             const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
//             const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
//             const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//             const appointedDate = new Date(2024, 1, 1);
//             appointedDate.setHours(0, 0, 0, 0);
//
//             try {
//                 // 获取统计数据
//                 const [yesterdayData, todayData, thisMonthData, allData] = await Promise.all([
//                     Utils.fetchUmami(startOfYesterday, endOfYesterday, umiToken),
//                     Utils.fetchUmami(startOfToday, new Date(), umiToken),
//                     Utils.fetchUmami(firstDayOfMonth, new Date(), umiToken),
//                     Utils.fetchUmami(appointedDate, new Date(), umiToken),
//                 ]);
//
//                 const title = ["最近活跃", "今日人数", "今日访问", "昨日人数", "昨日访问", "本月访问", "总访问量"];
//                 const num = [
//                     null, // 最近活跃保留空值
//                     todayData.visitors?.value || 0,
//                     todayData.pageviews?.value || 0,
//                     yesterdayData.visitors?.value || 0,
//                     yesterdayData.pageviews?.value || 0,
//                     thisMonthData.pageviews?.value || 0,
//                     allData.pageviews?.value || 0
//                 ];
//
//                 let statisticEl = document.getElementById("statistic");
//
//                 if (!statisticEl) {
//                     console.log("Dom元素不存在");
//                     return;
//                 }
//
//                 // 自定义逻辑：不显示 最近活跃访客 和 总访问量
//                 let statistic = [];
//                 for (let i = 0; i < num.length; i++) {
//                     if (i === 0) continue; // 跳过“最近活跃”
//                     statisticEl.innerHTML +=
//                         `<div><span>${title[i]}</span><span id="${title[i]}">${num[i]}</span></div>`;
//                     queueMicrotask(() => {
//                         statistic.push(
//                             new CountUp(title[i], 0, num[i], 0, 2, {
//                                 useEasing: true,
//                                 useGrouping: true,
//                                 separator: ",",
//                                 decimal: ".",
//                                 prefix: "",
//                                 suffix: "",
//                             })
//                         );
//                     });
//                 }
//
//                 // Intersection Observer 触发统计更新
//                 let statisticElement = document.querySelector(".about-statistic.author-content-item");
//
//                 function statisticUP() {
//                     if (!statisticElement) return;
//
//                     const callback = (entries, observer) => {
//                         entries.forEach(entry => {
//                             if (entry.isIntersecting) {
//                                 for (let i = 0; i < num.length; i++) {
//                                     if (i === 0) continue;
//                                     queueMicrotask(() => {
//                                         statistic[i - 1].start();
//                                     });
//                                 }
//                                 observer.disconnect();
//                             }
//                         });
//                     };
//
//                     const options = {
//                         root: null,
//                         rootMargin: "0px",
//                         threshold: 0
//                     };
//                     const observer = new IntersectionObserver(callback, options);
//                     observer.observe(statisticElement);
//                 }
//
//                 statisticUP();
//             } catch (error) {
//                 console.log("获取统计数据失败：", error);
//             }
//
//             let pursuitInterval = null;
//             pursuitInterval = setInterval(function () {
//                 const show = document.querySelector("span[data-show]");
//                 const next = show.nextElementSibling || document.querySelector(".first-tips");
//                 const up = document.querySelector("span[data-up]");
//
//                 if (up) {
//                     up.removeAttribute("data-up");
//                 }
//
//                 show.removeAttribute("data-show");
//                 show.setAttribute("data-up", "");
//
//                 next.setAttribute("data-show", "");
//             }, 2000);
//
//             document.addEventListener("pjax:send", function () {
//                 pursuitInterval && clearInterval(pursuitInterval);
//             });
//         }
//
//         return {
//             init: async () => {
//                 await initAboutPage();
//             }
//         };
//     })()
//
//     // 日常分享页面模块
//     const BbModule = (() => {
//         let svg = '<svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="is-badge"><path  d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"></path></svg>'
//         let total = 0
//         let nowNum = 0
//         let items = []
//         let page = 1
//         let Url = 'https://linghua.aimiliy.top/api/bb/list?page=' // 记住替换为你的API链接
//         let size = 12
//         const more = document.getElementById('more');
//         const bb_loading = document.getElementById('bb_loading');
//         let bbMain = document.getElementById('bb-main')
//
//         // 获取数据
//         const getNew = () => {
//             more.style.display = 'none'
//             bb_loading.style.display = 'block';
//             setTimeout(() => {
//                 fetch(Url + page + '&size=' + size).then(res => res.json()).then((res) => {
//                     total = res.data.total;
//                     items = res.data.items;
//                     nowNum += items.length;
//                     if (page === 1) {
//                         document.querySelector('.bb-info').innerHTML = '<svg style="width:1.20em;height:1.20em;top:5px;fill:currentColor;overflow:hidden;position:relative"><use xlink:href="#icon-chat"></svg> 站长的日常分享(' + total + ')';
//                     }
//                     page += 1;
//                 }).then(() => {
//                     bb();
//                     if (nowNum < total) {
//                         more.style.display = "block"
//                     }
//                     bb_loading.style.display = 'none'
//                 });
//             }, 300); // 设置0.5秒的延迟
//         }
//
//         // 渲染数据
//         const bb = () => {
//             items.forEach((item) => {
//                 let time = Utils.formatDateTime(item.createdAt);
//                 let div = document.createElement('div')
//                 item.content = contentFormat(item.content)
//                 let repeatContent = removeAllHtmlTags(item.content)
//
//                 div.className = 'bb-card'
//                 div.innerHTML = '<div class="card-header">' +
//                     '<div class="avatar">' +
//                     '<img class="nofancybox"src="' + item.author.avatar + '">' +
//                     '</div>' +
//                     '<div class="bb-info-avatar">' + '<span>' + '<div class="name">' + item.author.nickName + '</div>' + svg + '</span>' + '<div class="card-time">' + time + '</div>'
//                     + '</div></div><div class="card-content">' + item.content + '</div><div class="card-footer"><div data-v-185689ea=""class="card-label"style="background: ' + item.tag.bgColor + '; color: white;">' + item.tag.name + '</div><div class="bb-fos" onclick="rmf.rightMenuCommentText(' + `&quot;${repeatContent}&quot;` + ')"><svg style="width:1.60em;height:1.60em;fill:var(--theme-color);overflow:hidden;cursor: pointer;"><use xlink:href="#icon-xiaoxi"></use></svg></div></div>'
//                 bbMain.appendChild(div)
//             })
//         }
//
//         const removeAllHtmlTags = (content) => {
//             const regex = /<[^>]+>.*?<\/[^>]+>|<[^>]+\/>|<[^>]+>/gis;
//             return content.replace(regex, '').replace(/^\s+|\s+$/g, '');
//         }
//
//         // content格式化
//         const contentFormat = (s) => {
//             let br = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//             let re_forimg = /<img(.*?)src=[\"|\']?(.*?)[\"|\']?(.*?)>|!\[(.*?)\]\((.*?)\)/g;
//             let getImgUrl = /(http(.*).[jpg|png|gif])/g;
//             let ls = s.match(getImgUrl)
//             s = s.replace(re_forimg, '')
//             s = s.replace(br, '')
//
//             let html = '<br>'
//             if (ls) {
//                 ls.forEach((e) => {
//                     html += '<a href="' + e + '" target="_blank" data-fancybox="group" class="fancybox"><img src="' + e + '" style="max-width: 100%; object-fit: cover"></a>'
//                 })
//             }
//             s += html
//             return s.replace(/(<br\s*\/?>)+$/, '');
//         }
//
//         return {
//             init: () => {
//                 getNew();
//                 if (!more) return;
//                 btf.addEventListenerPjax('click', more, getNew, 'click-more-button');
//             }
//         };
//     })()
//
//     // 网站统计模块
//     const WebModule = (() => {
//         const webSiteStats = async () => {
//             // 如果不在目标路径，则直接返回
//             // 定义时间范围
//             const now = new Date();
//             const startOfToday = new Date(now.setHours(0, 0, 0, 0));
//             const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
//             const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
//             const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//
//             try {
//                 // 并发获取统计数据
//                 const [yesterdayData, todayData, thisMonthData] = await Promise.all([
//                     Utils.fetchUmami(startOfYesterday, endOfYesterday, Utils.umiToken),
//                     Utils.fetchUmami(startOfToday, new Date(), Utils.umiToken),
//                     Utils.fetchUmami(firstDayOfMonth, new Date(), Utils.umiToken),
//                 ]);
//
//                 const title = ["今日人数", "昨日人数", "今日访问", "昨日访问", "本月访问"];
//
//                 const num = [
//                     todayData.visitors?.value || 0,
//                     yesterdayData.visitors?.value || 0,
//                     todayData.pageviews?.value || 0,
//                     yesterdayData.pageviews?.value || 0,
//                     thisMonthData.pageviews?.value || 0
//                 ];
//                 const statisticContent = document.querySelector('#statisticW .content');
//                 if (!statisticContent) {
//                     console.log("Dom元素不存在");
//                     return;
//                 }
//                 let statistic = [];
//
//                 for (let i = 0; i < num.length; i++) {
//                     statisticContent.innerHTML +=
//                         `<div><span>${title[i]}</span><span id="${title[i]}" class="num">${num[i]}</span></div>`;
//                     queueMicrotask(() => {
//                         statistic.push(
//                             new CountUp(title[i], 0, num[i], 0, 2, {
//                                 useEasing: true,
//                                 useGrouping: true,
//                                 separator: ",",
//                                 decimal: ".",
//                                 prefix: "",
//                                 suffix: "",
//                             })
//                         );
//                     });
//                 }
//                 // Intersection Observer 触发统计更新
//                 let statisticElement = document.querySelector('#statisticW .content');
//
//                 function statisticUP() {
//                     if (!statisticElement) return;
//
//                     const callback = (entries, observer) => {
//                         entries.forEach(entry => {
//                             if (entry.isIntersecting) {
//                                 for (let i = 0; i < num.length; i++) {
//                                     queueMicrotask(() => {
//                                         statistic[i].start();
//                                     });
//                                 }
//                                 observer.disconnect();
//                             }
//                         });
//                     };
//
//                     const options = {
//                         root: null,
//                         rootMargin: "0px",
//                         threshold: 0
//                     };
//                     const observer = new IntersectionObserver(callback, options);
//                     observer.observe(statisticElement);
//                 }
//
//                 statisticUP();
//             } catch (error) {
//                 console.log("获取统计数据失败：", error);
//             }
//
//         };
//
//         return {
//             init: async () => {
//                 await webSiteStats();
//             }
//         };
//     })()
//
//     const routeInitMap = [
//         {
//             path: "/personal/about/",
//             modules: [AboutModule]
//         },
//         {
//             path: "/personal/bb/",
//             modules: [BbModule]
//         },
//         {
//             path: "/life/music/",
//             modules: [MusicPlayer]
//         },
//         {
//             path: "/social/fcircle/",
//             modules: [FcLiteModule]
//         },
//         {
//             path: "/site/census/",
//             modules: [WebModule]
//         }
//     ];
//
//     // 通用模块（所有页面都需要的）
//     const commonModules = [ScrollRevealPage, SwiperModule];
//
//     // 主初始化函数
//     const init = () => {
//         const path = window.location.pathname;
//
//         // 加载通用模块
//         const regex = /^\/(?:page\/\d+\/|)$/;
//         if (regex.test(window.location.pathname)) {
//             commonModules.forEach(m => m.init?.());
//         }
//         // 查找匹配路径的模块
//         for (const route of routeInitMap) {
//             if (path.startsWith(route.path)) {
//                 route.modules.forEach(m => m.init?.());
//                 break; // 命中一项就退出
//             }
//         }
//     };
//     init();
// })();
//
//
//
//
//
//
//
//
//

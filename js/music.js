// (() => {
//     "use strict";
//     // 音乐播放器功能模块
//     const defaultMusic = {id: "7397995017", type: "playlist", server: "tencent"};
//     let localMusic = null;
//     try {
//         localMusic = JSON.parse(localStorage.getItem("localMusic")) || defaultMusic;
//     } catch (error) {
//         localMusic = defaultMusic;
//         localStorage.removeItem("localMusic");
//         console.log("Error parsing localMusic from localStorage:", error);
//     }
//
//     let musicVolume = 0.8;
//     let musicListCache = null;
//
//
//     const canvas = document.getElementById('visualizer');
//     const ctx = canvas.getContext('2d');
//
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const analyser = audioContext.createAnalyser();
//     analyser.fftSize = 256;
//     analyser.smoothingTimeConstant = 0.9; // 让波形更加平滑
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
//
//     let sourceNode = null; // 用于存储唯一的 MediaElementSourceNode
//     let audioElement = null; // 记录当前 APlayer 内部的 audio
//     let fftId;
//
// // 初始化localStorage
//     const initLocalStorage = () => {
//         if (!localStorage.getItem("defaultMusic")) {
//             localStorage.setItem("defaultMusic", JSON.stringify(defaultMusic));
//         }
//         if (!localStorage.getItem("localMusic")) {
//             localStorage.setItem("localMusic", JSON.stringify(localMusic));
//         }
//     }
//
//
// // 加载歌单缓存
//     const loadMusicListCache = async () => {
//         if (!musicListCache) {
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
//     }
//
//
//     const musicPlayerModule = (() => {
//         // 切换背景图片
//         const changeMusicBg = (isChangeBg = true) => {
//             if (window.location.pathname !== "/life/music/") return;
//             const anMusicBg = document.getElementById("an_music_bg");
//
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
//         // 绑定音乐相关事件
//         const addMusicEventListeners = () => {
//             const anMusicPage = document.getElementById("anMusic-page");
//             const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
//             const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
//             const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
//             const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
//
//             const metingAplayer = document.getElementById("anMusic-page").querySelector("meting-js").aplayer;
//             metingAplayer.volume(musicVolume, true);
//             metingAplayer.on("loadeddata", changeMusicBg);
//             canvas.width = window.innerWidth > 1500 ? 1500 : window.innerWidth * 0.95;
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
//                     ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除画布内容
//                 }, 1000); // 延迟 1 秒执行
//             });
//
//             window.addEventListener("resize", throttleMu(() => {
//                 canvas.width = window.innerWidth > 1500 ? 1500 : window.innerWidth * 0.95;
//             }, 50));
//
//
//             // 绑定事件
//             aplayerIconMenu.addEventListener("click", openMenu);
//             document.getElementById("menu-mask").addEventListener("click", closeMenu);
//
//             anMusicBtnGetSong.addEventListener("click", () => playRandomSong(metingAplayer));
//             anMusicRefreshBtn.addEventListener("click", refreshMusicList);
//             anMusicSwitchingBtn.addEventListener("click", changeMusicList);
//
//             // 切换页面时销毁aplayer实例
//             document.addEventListener("onbeforeunload", () => {
//                 if (metingAplayer) {
//                     metingAplayer.destroy();
//                 }
//             })
//             document.addEventListener("keydown", (event) => handleKeyboardEvents(event, metingAplayer));
//         }
//
//
//         const throttleMu = (fn, wait) => {
//             let lastTime = 0;
//             return function (...args) {
//                 const now = Date.now();
//                 if (now - lastTime >= wait) {
//                     lastTime = now;
//                     fn(...args);
//                 }
//             };
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
//         let localColor = map.get(localStorage.getItem("themeColor"));
//         let lightColor = getLightColorFromString(localColor);
//
//
//         const draw = () => {
//             fftId = requestAnimationFrame(draw);
//             analyser.getByteFrequencyData(dataArray);
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             if (localColor !== map.get(localStorage.getItem("themeColor"))) {
//                 localColor = map.get(localStorage.getItem("themeColor"));
//                 lightColor = getLightColorFromString(localColor);
//             }
//             const gap = 1;
//             const middleGap = 1; // 控制中间的间距
//             const totalBars = bufferLength * 2;
//             const totalGaps = totalBars - 1;
//             const barWidth = (canvas.width - totalGaps * gap - middleGap) / totalBars;
//             const centerX = canvas.width / 2;
//
//             const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//             gradient.addColorStop(0, localColor);
//             ctx.shadowBlur = 15;
//             ctx.shadowColor = lightColor;
//             ctx.fillStyle = gradient;
//
//             for (let i = 0; i < bufferLength; i++) {
//                 const barHeight = dataArray[i] * 0.5;
//                 const topWidth = barWidth * (1 - (barHeight / canvas.height));
//
//                 const xLeft = centerX - middleGap / 2 - (i * (barWidth + gap)) - barWidth;
//                 const xRight = centerX + middleGap / 2 + (i * (barWidth + gap));
//
//                 // 左侧条纹
//                 ctx.beginPath();
//                 ctx.moveTo(xLeft, canvas.height);
//                 ctx.lineTo(xLeft + barWidth, canvas.height);
//                 ctx.lineTo(xLeft + barWidth - topWidth / 2, canvas.height - barHeight);
//                 ctx.lineTo(xLeft + topWidth / 2, canvas.height - barHeight);
//                 ctx.closePath();
//                 ctx.fill();
//
//                 // 右侧条纹
//                 ctx.beginPath();
//                 ctx.moveTo(xRight, canvas.height);
//                 ctx.lineTo(xRight + barWidth, canvas.height);
//                 ctx.lineTo(xRight + barWidth - topWidth / 2, canvas.height - barHeight);
//                 ctx.lineTo(xRight + topWidth / 2, canvas.height - barHeight);
//                 ctx.closePath();
//                 ctx.fill();
//             }
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
//             if (window.location.pathname !== "/life/music/") return;
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
//             localMusic = defaultMusic;
//             localStorage.setItem("localMusic", JSON.stringify(defaultMusic));
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
//             metingAplayer.seek(0); // 将播放进度重置为 0
//             metingAplayer.pause(); // 触发暂停事件
//             const nextIndex = shuffledMusicList.shift();
//             localStorage.setItem("shuffledMusicList", JSON.stringify(shuffledMusicList));
//
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
//
//         // 键盘事件处理
//         const handleKeyboardEvents = (event, metingAplayer) => {
//             if (window.location.pathname !== "/life/music/") return;
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
//         return {
//             init: async () => {
//                 changeMusicBg(false);
//             }
//         };
//     })();
//
//
//     const init = () => {
//         if (window.location.pathname !== "/life/music/") return;
//         const anMusicPageMeting = document.getElementById("anMusic-page-meting");
//         anMusicPageMeting.innerHTML = `<meting-js id="7397995017" server="tencent" type="playlist" mutex="true" preload="auto" theme="var(--theme-color)" order="list" list-max-height="320px"></meting-js>`;
//         musicPlayerModule.init(false).catch(console.error);
//         initLocalStorage();
//         loadMusicListCache().then(r => {})
//     }
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

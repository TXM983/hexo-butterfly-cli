var music = [
    {id: "6787417362", type: "playlist", server: "netease"},
    {id: "5279950644", type: "playlist", server: "netease"},
    {id: "12400563817", type: "playlist", server: "netease"},
    {id: "5321409260", type: "playlist", server: "netease"},
    {id: "6986639455", type: "playlist", server: "netease"},
    {id: "7735981148", type: "playlist", server: "netease"},
    {id: "8829414068", type: "playlist", server: "netease"},
    {id: "7017408987", type: "playlist", server: "netease"},
    {id: "7666409008", type: "playlist", server: "netease"},
    {id: "8712166945", type: "playlist", server: "netease"}
];


var defaultMusic = { id: "8712166945", type: "playlist", server: "netease" };
var localMusic = JSON.parse(localStorage.getItem("localMusic")) || defaultMusic;

if (!localStorage.getItem("defaultMusic")) {
    localStorage.setItem("defaultMusic", JSON.stringify(defaultMusic));
}

if (!localStorage.getItem("localMusic")) {
    localStorage.setItem("localMusic", JSON.stringify(localMusic));
}

var musicVolume = 0.8;
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audio = window.aplayers[0].audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 512;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

var muxiaochen = {
    // 音乐节目切换背景
    changeMusicBg: function (isChangeBg = true) {
        if (window.location.pathname != "/life/music/") {
            return;
        }
        const anMusicBg = document.getElementById("an_music_bg");

        if (isChangeBg) {
            // player listswitch 会进入此处
            const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
            anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
        } else {
            // 第一次进入，绑定事件，改背景
            let timer = setInterval(() => {
                const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
                // 确保player加载完成
                if (musiccover) {
                    clearInterval(timer);
                    anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
                    // 绑定事件
                    muxiaochen.addEventListenerMusic();
                    // 确保第一次能够正确替换背景
                    muxiaochen.changeMusicBg();
                    // 暂停nav的音乐
                    // if (
                    //     document.querySelector("#nav-music").aplayer &&
                    //     !document.querySelector("#nav-music").aplayer.audio.paused
                    // ) {
                    //     muxiaochen.musicToggle();
                    // }
                }
            }, 100);
        }
    },
    setGradientColor: function (baseColor){
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        // 生成从主题颜色逐渐变浅的颜色
        const colors = [
            baseColor, // 顶部颜色
            muxiaochen.lightenColor(baseColor, 20), // 渐变到更浅的颜色
            muxiaochen.lightenColor(baseColor, 40), // 渐变到更浅的颜色
            muxiaochen.lightenColor(baseColor, 60), // 渐变到更浅的颜色
            muxiaochen.lightenColor(baseColor, 80)  // 渐变到最浅的颜色
        ];

        colors.forEach((color, index) => {
            gradient.addColorStop(index * 0.25, color);
        });
        return gradient;
    },
    lightenColor: function (rgbString, amount){
        const rgb = rgbString.match(/\d+/g).map(Number); // 从 RGB 字符串中提取 RGB 值
        const newRgb = rgb.map(value => Math.min(255, value + amount));
        return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
    },
    draw: function (){
        requestAnimationFrame(muxiaochen.draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = 3; // 条纹宽度
        const gap = 2;      // 条纹间的间隙
        const barCount = Math.floor(canvas.width / (barWidth + gap)); // 条纹数量
        const centerX = canvas.width / 2; // 画布中心
        let barHeight;

        // 限制最大高度
        const maxHeight = canvas.height * 0.5; // 最大高度为画布的 30%
        const fixedPeakHeight = 15; // 尖角高度固定为 15 像素

        // 获取数据数组的最大值
        const maxValue = Math.max(...dataArray);

        // 使用指定的颜色生成渐变
        const gradient = muxiaochen.setGradientColor(document.documentElement.style.getPropertyValue("--theme-color"));

        // 设置柔和的发光效果
        ctx.shadowBlur = 5;  // 较弱的发光效果
        ctx.shadowColor = shadowColor; // 发光颜色设置为主题颜色

        // 绘制条纹
        for (let i = 0; i < barCount / 2; i++) {
            // 等比例缩放条纹高度，保留尖角高度
            const scaledValue = (dataArray[i] / maxValue) * (maxHeight - fixedPeakHeight);
            barHeight = Math.min(scaledValue, maxHeight - fixedPeakHeight); // 限制条纹最大高度

            const xLeft = centerX - ((barCount / 2 - i) * (barWidth + gap)) - barWidth; // 左侧条纹位置
            const xRight = centerX + ((barCount / 2 - i) * (barWidth + gap));           // 右侧条纹位置

            // 绘制左侧条纹，带固定高度尖角
            ctx.beginPath();
            ctx.moveTo(xLeft, canvas.height);  // 底部
            ctx.lineTo(xLeft + barWidth / 2, canvas.height - barHeight - fixedPeakHeight);  // 顶部尖角
            ctx.lineTo(xLeft + barWidth, canvas.height);  // 回到底部
            ctx.closePath();
            ctx.fill();

            // 绘制右侧条纹，带固定高度尖角
            ctx.beginPath();
            ctx.moveTo(xRight, canvas.height);
            ctx.lineTo(xRight + barWidth / 2, canvas.height - barHeight - fixedPeakHeight);
            ctx.lineTo(xRight + barWidth, canvas.height);
            ctx.closePath();
            ctx.fill();
        }

        // 中间条纹，使用主题颜色
        ctx.fillStyle = baseColor; // 设置中间条纹颜色为主题颜色
        const midHeight = Math.min((dataArray[Math.floor(barCount / 2)] / maxValue) * (maxHeight - fixedPeakHeight), maxHeight - fixedPeakHeight);
        ctx.beginPath();
        ctx.moveTo(centerX, canvas.height); // 中间条纹的底部
        ctx.lineTo(centerX + barWidth / 2, canvas.height - midHeight - fixedPeakHeight); // 中间条纹的顶部尖角
        ctx.lineTo(centerX + barWidth, canvas.height); // 中间条纹的另一端底部
        ctx.closePath();
        ctx.fill();
    },
    addEventListenerMusic: function () {
        const anMusicPage = document.getElementById("anMusic-page");
        const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
        const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
        const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
        const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
        const metingAplayer = window.aplayers[0];
        //初始化音量
        metingAplayer.volume(0.8, true);
        metingAplayer.on("loadeddata", function () {
            muxiaochen.changeMusicBg();
        });

        aplayerIconMenu.addEventListener("click", function () {
            document.getElementById("menu-mask").style.display = "block";
            document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
            anMusicPage.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity = "1";
        });

        function anMusicPageMenuAask() {
            if (window.location.pathname != "/life/music/") {
                document.getElementById("menu-mask").removeEventListener("click", anMusicPageMenuAask);
                return;
            }
            anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
        }
        document.getElementById("menu-mask").addEventListener("click", anMusicPageMenuAask);

        // 监听增加单曲按钮
        anMusicBtnGetSong.addEventListener("click", () => {
            const anMusicPage = document.getElementById("anMusic-page");
            const metingAplayer = window.aplayers[0];
            const allAudios = metingAplayer.list.audios;
            const randomIndex = Math.floor(Math.random() * allAudios.length);
            // 随机播放一首
            metingAplayer.list.switch(randomIndex);
        });
        anMusicRefreshBtn.addEventListener("click", () => {
            muxiaochen.refreshMusicList();
        });
        anMusicSwitchingBtn.addEventListener("click", () => {
            muxiaochen.changeMusicList();
        });

        // 监听键盘事件
        //空格控制音乐
        document.addEventListener("keydown", function (event) {
            //暂停开启音乐
            if (event.code === "Space") {
                event.preventDefault();
                metingAplayer.toggle();
            }
            //切换下一曲
            if (event.keyCode === 39) {
                event.preventDefault();
                metingAplayer.skipForward();
            }
            //切换上一曲
            if (event.keyCode === 37) {
                event.preventDefault();
                metingAplayer.skipBack();
            }
            //增加音量
            if (event.keyCode === 38) {
                if (musicVolume <= 1) {
                    musicVolume += 0.1;
                    metingAplayer.volume(musicVolume, true);
                }
            }
            //减小音量
            if (event.keyCode === 40) {
                if (musicVolume >= 0) {
                    musicVolume += -0.1;
                    metingAplayer.volume(musicVolume, true);
                }
            }
        });
    },
    refreshMusicList: async function () {
        const metingAplayer = window.aplayers[0];
        let songs = [];
        localMusic = defaultMusic;
        localStorage.setItem("localMusic", JSON.stringify(defaultMusic));
        let url = `https://twikoo.aimiliy.top/music/api?server=${localMusic.server}&type=${localMusic.type}&id=${localMusic.id}&auth=undefined&r=${Math.random() * Date.now()}`;
        songs = await muxiaochen.fetchSongs(url);
        if (songs.length > 0) {
            metingAplayer.list.clear();
            metingAplayer.list.add(songs);
        }
    },
    // 切换歌单
    changeMusicList: async function () {
        const metingAplayer = window.aplayers[0];
        let songs = [];
        let randomMusic = Math.floor(Math.random() * music.length);
        while (JSON.parse(localStorage.getItem("localMusic")).id === music[randomMusic].id) {
            randomMusic = Math.floor(Math.random() * music.length);
        }
        localMusic = music[randomMusic];
        localStorage.setItem("localMusic", JSON.stringify(music[randomMusic]));
        let url = `https://twikoo.aimiliy.top/music/api?server=${music[randomMusic].server}&type=${music[randomMusic].type}&id=${music[randomMusic].id}&auth=undefined&r=${Math.random() * Date.now()}`;
        songs = await muxiaochen.fetchSongs(url);
        if (songs.length > 0) {
            metingAplayer.list.clear();
            metingAplayer.list.add(songs);
        }
    },
    async fetchSongs(url) {
        let songs = []; // 默认初始化为空数组
        try {
            const response = await fetch(url);
            // 检查响应是否为成功状态（200-299）
            if (!response.ok) {
                songs = []
            }
            // 解析 JSON 数据
            songs = await response.json();
        } catch (error) {
            // 处理异常情况，将 songs 置为空数组
            console.error("获取歌曲时出错:", error.message);
            songs = []; // 出现异常时确保 songs 为空数组
        }
        return songs; // 返回获取到的歌曲数据或空数组
    }
};

// 调用
muxiaochen.changeMusicBg(false);
audio.onplay = () => {
    audioContext.resume().then(() => {
        muxiaochen.draw();
    });
};
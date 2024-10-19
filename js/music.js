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


const defaultMusic = {id: "8712166945", type: "playlist", server: "netease"};
let localMusic = JSON.parse(localStorage.getItem("localMusic")) || defaultMusic;

if (!localStorage.getItem("defaultMusic")) {
    localStorage.setItem("defaultMusic", JSON.stringify(defaultMusic));
}

if (!localStorage.getItem("localMusic")) {
    localStorage.setItem("localMusic", JSON.stringify(localMusic));
}

let musicVolume = 0.8;
const muxiaochen = {
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
                }
            }, 100);
        }
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

//
// document.addEventListener("DOMContentLoaded", function () {
//     muxiaochen.changeMusicBg(false);
// });

document.addEventListener("pjax:complete", function () {
    muxiaochen.changeMusicBg(false);
});
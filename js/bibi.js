// (() => {
//     "use strict";
//     // 初始化说说
//     let svg = '<svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="is-badge"><path  d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"></path></svg>'
//     let total = 0
//     let nowNum = 0
//     let items = []
//     let page = 1
//     let Url = 'https://linghua.aimiliy.top/api/bb/list?page=' // 记住替换为你的API链接
//     let size = 12
//     const more = document.getElementById('more');
//     const bb_loading = document.getElementById('bb_loading');
//     let bbMain = document.getElementById('bb-main')
//
//     // 获取数据
//     function getNew() {
//         if (window.location.pathname !== "/personal/bb/") {
//             return
//         }
//         more.style.display = 'none'
//         bb_loading.style.display = 'block';
//         setTimeout(() => {
//             fetch(Url + page + '&size=' + size).then(res => res.json()).then((res) => {
//                 total = res.data.total;
//                 items = res.data.items;
//                 nowNum += items.length;
//                 if (page === 1) {
//                     document.querySelector('.bb-info').innerHTML = '<svg style="width:1.20em;height:1.20em;top:5px;fill:currentColor;overflow:hidden;position:relative"><use xlink:href="#icon-chat"></svg> 站长的日常分享(' + total + ')';
//                 }
//                 page += 1;
//             }).then(() => {
//                 bb();
//                 if (nowNum < total) {
//                     more.style.display = "block"
//                 }
//                 bb_loading.style.display = 'none'
//             });
//         }, 300); // 设置0.5秒的延迟
//     }
//
// // 渲染数据
//     function bb() {
//         items.forEach((item) => {
//             let time = formatDateTime(item.createdAt);
//             let div = document.createElement('div')
//             item.content = contentFormat(item.content)
//             let repeatContent = removeAllHtmlTags(item.content)
//
//             div.className = 'bb-card'
//             div.innerHTML = '<div class="card-header">' +
//                 '<div class="avatar">' +
//                 '<img class="nofancybox"src="' + item.author.avatar + '">' +
//                 '</div>' +
//                 '<div class="bb-info-avatar">' + '<span>' + '<div class="name">' + item.author.nickName + '</div>' + svg + '</span>' + '<div class="card-time">' + time + '</div>'
//                 + '</div></div><div class="card-content">' + item.content + '</div><div class="card-footer"><div data-v-185689ea=""class="card-label"style="background: ' + item.tag.bgColor + '; color: white;">' + item.tag.name + '</div><div class="bb-fos" onclick="rmf.rightMenuCommentText(' + `&quot;${repeatContent}&quot;` + ')"><svg style="width:1.60em;height:1.60em;fill:var(--theme-color);overflow:hidden;cursor: pointer;"><use xlink:href="#icon-xiaoxi"></use></svg></div></div>'
//             bbMain.appendChild(div)
//         })
//     }
//
//     function removeAllHtmlTags(content) {
//         const regex = /<[^>]+>.*?<\/[^>]+>|<[^>]+\/>|<[^>]+>/gis;
//         return content.replace(regex, '').replace(/^\s+|\s+$/g, '');
//     }
//
//     function formatDateTime(timeString) {
//         const date = new Date(timeString);
//
//         // 获取各个部分并转换为 GMT+8
//         const year = date.getUTCFullYear();
//         const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//         const day = String(date.getUTCDate()).padStart(2, '0');
//
//         // 计算 GMT+8 时区的小时、分钟和秒
//         const localHours = String(date.getUTCHours() + 8).padStart(2, '0');
//         const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//         const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//
//         // 返回格式化后的字符串
//         return `${year}-${month}-${day} ${localHours}:${minutes}:${seconds}`;
//     }
//
//     // content格式化
//     function contentFormat(s) {
//         let br = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//         let re_forimg = /<img(.*?)src=[\"|\']?(.*?)[\"|\']?(.*?)>|!\[(.*?)\]\((.*?)\)/g;
//         let getImgUrl = /(http(.*).[jpg|png|gif])/g;
//         let ls = s.match(getImgUrl)
//         s = s.replace(re_forimg, '')
//         s = s.replace(br, '')
//
//         let html = '<br>'
//         if (ls) {
//             ls.forEach((e) => {
//                 html += '<a href="' + e + '" target="_blank" data-fancybox="group" class="fancybox"><img src="' + e + '" style="max-width: 100%; object-fit: cover"></a>'
//             })
//         }
//         s += html
//         return s.replace(/(<br\s*\/?>)+$/, '');
//     }
//
//     if(more){
//         more.addEventListener("click", getNew);
//     }
//
//     getNew();
// })();
//
//
//
//

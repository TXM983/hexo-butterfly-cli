document.addEventListener("DOMContentLoaded",(function(){let e,t,n,o,i=!1;const s=i=>{if(i){e=document.getElementById("site-name").offsetWidth;const i=document.querySelectorAll("#menus .menus_item");t=0,i.length&&i.forEach((e=>{t+=e.offsetWidth}));const s=document.querySelector("#search-button");n=s?s.offsetWidth:0,o=document.getElementById("nav")}let s="";window.innerWidth<=800&&(s=!0),s?o.classList.add("hide-menu"):o.classList.remove("hide-menu")},c=()=>{btf.sidebarPaddingR(),document.body.style.overflow="hidden",btf.animateIn(document.getElementById("menu-mask"),"to_show 0.5s"),document.getElementById("sidebar-menus").classList.add("open"),i=!0},a=()=>{const e=document.body;e.style.overflow="",e.style.paddingRight="",btf.animateOut(document.getElementById("menu-mask"),"to_hide 0.5s"),document.getElementById("sidebar-menus").classList.remove("open"),i=!1},l=function(){const e=GLOBAL_CONFIG.highlight;if(!e)return;const t=e.highlightCopy,n=e.highlightLang,o=GLOBAL_CONFIG_SITE.isHighlightShrink,i=e.highlightHeightLimit,s=t||n||void 0!==o,c="highlighjs"===e.plugin?document.querySelectorAll("figure.highlight"):document.querySelectorAll('pre[class*="language-"]');if(!s&&!i||!c.length)return;const a="prismjs"===e.plugin;let l="",d="";const r=!0===o?"closed":"";void 0!==o&&(l=`<i class="fas fa-angle-down expand ${r}"></i>`),t&&(d='<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>');const u=e=>{const t=e.parentNode;t.classList.add("copy-true");const n=window.getSelection(),o=document.createRange();a?o.selectNodeContents(t.querySelectorAll("pre code")[0]):o.selectNodeContents(t.querySelectorAll("table .code pre")[0]),n.removeAllRanges(),n.addRange(o);n.toString();((e,t)=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy"))if(document.execCommand("copy"),void 0!==GLOBAL_CONFIG.Snackbar);else{const e=t.previousElementSibling;e.innerText=GLOBAL_CONFIG.copy.success,e.style.opacity=1,setTimeout((()=>{e.style.opacity=0}),700)}else void 0!==GLOBAL_CONFIG.Snackbar||(t.previousElementSibling.innerText=GLOBAL_CONFIG.copy.noSupport)})(0,e.lastChild),n.removeAllRanges(),t.classList.remove("copy-true")},m=function(e){const t=e.target.classList;t.contains("expand")?(e=>{const t=[...e.parentNode.children].slice(1);e.firstChild.classList.toggle("closed"),btf.isHidden(t[t.length-1])?t.forEach((e=>{e.style.display="block"})):t.forEach((e=>{e.style.display="none"}))})(this):t.contains("copy-button")&&u(this)},h=function(){this.classList.toggle("expand-done")};function g(e,t,n){const o=document.createDocumentFragment();if(s){const t=document.createElement("div");t.className=`highlight-tools ${r}`,t.innerHTML=l+e+d,t.addEventListener("click",m),o.appendChild(t)}if(i&&t.offsetHeight>i+30){const e=document.createElement("div");e.className="code-expand-btn",e.innerHTML='<i class="fas fa-angle-double-down"></i>',e.addEventListener("click",h),o.appendChild(e)}"hl"===n?t.insertBefore(o,t.firstChild):t.parentNode.insertBefore(o,t)}n?a?c.forEach((function(e){const t=`<div class="code-lang">${e.getAttribute("data-language")?e.getAttribute("data-language"):"Code"}</div>`;btf.wrap(e,"figure",{class:"highlight"}),g(t,e)})):c.forEach((function(e){let t=e.getAttribute("class").split(" ")[1];"plain"!==t&&void 0!==t||(t="Code");g(`<div class="code-lang">${t}</div>`,e,"hl")})):a?c.forEach((function(e){btf.wrap(e,"figure",{class:"highlight"}),g("",e)})):c.forEach((function(e){g("",e,"hl")}))};const d=function(){const e=document.getElementById("rightside"),t=document.getElementById("fps"),n=window.innerHeight+56,o=()=>document.body.scrollHeight<=n&&(e.classList.remove("rightside-show"),t.classList.remove("fps-show"),!0);if(o())return;let i=0,s=!0;const c=document.getElementById("page-header"),a="function"==typeof chatBtnHide,l="function"==typeof chatBtnShow;let d="";const r=btf.throttle((()=>{const n=window.scrollY||document.documentElement.scrollTop,r=(e=>{const t=e>i;return i=e,t})(n);n>56?(""===d&&"/life/music/"!==window.location.pathname&&(c.classList.contains("nav-fixed")||c.classList.add("nav-fixed"),e.classList.contains("rightside-show")||"block"!==localStorage.getItem("rs")||e.classList.add("rightside-show"),t.classList.contains("fps-show")||"1"!==localStorage.getItem("fpson")||t.classList.add("fps-show")),r?"down"!==d&&(c.classList.contains("nav-visible")&&c.classList.remove("nav-visible"),l&&!0===s&&(chatBtnHide(),s=!1),d="down"):"up"!==d&&(c.classList.contains("nav-visible")||c.classList.add("nav-visible"),a&&!1===s&&(chatBtnShow(),s=!0),d="up")):(d="",0===n&&c.classList.remove("nav-fixed","nav-visible"),e.classList.remove("rightside-show"),t.classList.remove("fps-show")),o()}),300);window.addEventListener("scroll",r)},r=function(){const e=GLOBAL_CONFIG_SITE.isToc,t=GLOBAL_CONFIG.isAnchor,n=document.getElementById("article-container");if(!n||!e&&!t)return;let o,i,s,c,a;if(e){const e=document.getElementById("card-toc");i=e.getElementsByClassName("toc-content")[0],o=i.querySelectorAll(".toc-link");const t=e.querySelector(".toc-percentage");a=i.classList.contains("is-expand"),s=e=>{const o=n.clientHeight,i=document.documentElement.clientHeight,s=(e-n.offsetTop)/(o>i?o-i:document.documentElement.scrollHeight-i),c=Math.round(100*s),a=c>100?100:c<=0?0:c;t.textContent=a},window.mobileToc={open:()=>{e.style.cssText="animation: toc-open .3s; opacity: 1; right: 55px"},close:()=>{e.style.animation="toc-close .2s",setTimeout((()=>{e.style.cssText="opacity:''; animation: ''; right: ''"}),100)}},i.addEventListener("click",(e=>{e.preventDefault();const t=e.target.classList;if(t.contains("toc-content"))return;const n=t.contains("toc-link")?e.target:e.target.parentElement;btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI(n.getAttribute("href")).replace("#",""))),300),window.innerWidth<900&&window.mobileToc.close()})),c=e=>{const t=e.getBoundingClientRect().top,n=i.scrollTop;t>document.documentElement.clientHeight-100&&(i.scrollTop=n+150),t<100&&(i.scrollTop=n-150)}}const l=n.querySelectorAll("h1,h2,h3,h4,h5,h6");let d="";window.tocScrollFn=function(){return btf.throttle((function(){const n=window.scrollY||document.documentElement.scrollTop;e&&s(n),function(n){if(0===n)return!1;let s="",r="";if(l.forEach((function(e,t){if(n>btf.getEleTop(e)-80){const n=e.id;s=n?"#"+encodeURI(n):"",r=t}})),d!==r&&(t&&btf.updateAnchor(s),d=r,e)){if(i.querySelectorAll(".active").forEach((e=>{e.classList.remove("active")})),""===s)return;const e=o[r];if(e.classList.add("active"),setTimeout((()=>{c(e)}),0),a)return;let t=e.parentNode;for(;!t.matches(".toc");t=t.parentNode)t.matches("li")&&t.classList.add("active")}}(n)}),100)()},window.addEventListener("scroll",tocScrollFn)},u=()=>{const e=document.body;e.classList.add("read-mode");const t=document.createElement("button");t.type="button",t.className="fas fa-sign-out-alt exit-readmode",e.appendChild(t),t.addEventListener("click",(function n(){e.classList.remove("read-mode"),t.remove(),t.removeEventListener("click",n)}))},m=()=>{"light"===("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(activateDarkMode(),saveToLocal.set("theme","dark",2)):(activateLightMode(),saveToLocal.set("theme","light",2)),"function"==typeof utterancesTheme&&utterancesTheme(),"function"==typeof changeGiscusTheme&&changeGiscusTheme(),"object"==typeof FB&&window.loadFBComment(),"function"==typeof runMermaid&&window.runMermaid()},h=e=>{const t=document.getElementById("rightside-config-hide").classList;t.toggle("show"),e.classList.contains("show")&&(t.add("status"),setTimeout((()=>{t.remove("status")}),300)),e.classList.toggle("show")},g=()=>{const e=document.getElementById("rightside"),t=document.getElementById("fps");e.classList.contains("rightside-show")||e.classList.add("rightside-show"),t.classList.contains("fps-show")||t.classList.add("fps-show"),btf.scrollToDest(document.body.scrollHeight,500)},f=()=>{btf.scrollToDest(0,500)},p=()=>{const e=document.documentElement.classList;e.contains("hide-aside")?saveToLocal.set("aside-status","show",2):saveToLocal.set("aside-status","hide",2),e.toggle("hide-aside")},y=()=>{"0"===window.getComputedStyle(document.getElementById("card-toc")).getPropertyValue("opacity")?window.mobileToc.open():window.mobileToc.close()};document.getElementById("rightside").addEventListener("click",(function(e){const t=e.target.id?e.target:e.target.parentNode;switch(t.id){case"go-up":f();break;case"rightside_config":h(t);break;case"mobile-toc-button":y();break;case"readmode":u();break;case"darkmode":m();break;case"hide-aside-btn":p();break;case"go-down":g()}}));const L=()=>{document.querySelectorAll("#sidebar-menus .site-page.group").forEach((function(e){e.addEventListener("click",(function(){this.classList.toggle("hide")}))}))},b=function(){document.querySelectorAll("#article-container .tab > button").forEach((function(e){e.addEventListener("click",(function(e){const t=this,n=t.parentNode;if(!n.classList.contains("active")){const e=n.parentNode.nextElementSibling,o=btf.siblings(n,".active")[0];o&&o.classList.remove("active"),n.classList.add("active");const i=t.getAttribute("data-href").replace("#","");[...e.children].forEach((e=>{e.id===i?e.classList.add("active"):e.classList.remove("active")}));const s=e.querySelectorAll(`#${i} .fj-gallery`);s.length>0&&btf.initJustifiedGallery(s)}}))}))},v=()=>{document.querySelectorAll("#article-container .tabs .tab-to-top").forEach((function(e){e.addEventListener("click",(function(){btf.scrollToDest(btf.getEleTop(btf.getParents(this,".tabs")),300)}))}))},E=function(e){e.forEach((e=>{const t=e,n=t.getAttribute("datetime");t.innerText=btf.diffDate(n,!0),t.style.display="inline"}))};window.refreshFn=function(){s(!0),o.classList.add("show"),GLOBAL_CONFIG_SITE.isPost?(void 0!==GLOBAL_CONFIG.noticeOutdate&&function(){const e=GLOBAL_CONFIG.noticeOutdate,t=btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);if(t>=e.limitDay){const n=document.createElement("div");n.className="post-outdate-notice",n.textContent=e.messagePrev+" "+t+" "+e.messageNext;const o=document.getElementById("article-container");"top"===e.position?o.insertBefore(n,o.firstChild):o.appendChild(n)}}(),GLOBAL_CONFIG.relativeDate.post&&E(document.querySelectorAll("#post-meta time"))):(GLOBAL_CONFIG.relativeDate.homepage&&E(document.querySelectorAll("#recent-posts time")),GLOBAL_CONFIG.runtime&&(()=>{const e=document.getElementById("runtimeshow");if(e){const t=e.getAttribute("data-publishDate");e.innerText=btf.diffDate(t)+" "+GLOBAL_CONFIG.runtime}})(),(()=>{const e=document.getElementById("last-push-date");if(e){const t=e.getAttribute("data-lastPushDate");e.innerText=btf.diffDate(t,!0)}})(),function(){const e=document.querySelectorAll("#aside-cat-list .card-category-list-item.parent i");e.length&&e.forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),this.classList.toggle("expand");const t=this.parentNode.nextElementSibling;btf.isHidden(t)?t.style.display="block":t.style.display="none"}))}))}()),r(),GLOBAL_CONFIG_SITE.isHome&&(()=>{const e=document.getElementById("scroll-down");e&&e.addEventListener("click",(function(){btf.scrollToDest(document.getElementById("content-inner").offsetTop,300)}))})(),l(),GLOBAL_CONFIG.isPhotoFigcaption&&document.querySelectorAll("#article-container img").forEach((function(e){const t=e.parentNode,n=e.title||e.alt;if(n&&!t.parentNode.classList.contains("justified-gallery")){const o=document.createElement("div");o.className="img-alt is-center",o.textContent=n,t.insertBefore(o,e.nextSibling)}})),d();const e=document.querySelectorAll("#article-container .fj-gallery");e.length&&function(e){if(e.forEach((e=>{e.querySelectorAll("img").forEach((e=>{const t=e.getAttribute("data-lazy-src");t&&(e.src=t),btf.wrap(e,"div",{class:"fj-gallery-item"})}))})),window.fjGallery)return void setTimeout((()=>{btf.initJustifiedGallery(e)}),100);const t=document.createElement("link");t.rel="stylesheet",t.href=GLOBAL_CONFIG.source.justifiedGallery.css,document.body.appendChild(t),getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then((()=>{btf.initJustifiedGallery(e)}))}(e),btf.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)")),(()=>{const e=document.querySelectorAll("#article-container :not(.highlight) > table, #article-container > table");e.length&&e.forEach((e=>{btf.wrap(e,"div",{class:"table-wrap"})}))})(),function(){const e=document.querySelectorAll("#article-container .hide-button");e.length&&e.forEach((function(e){e.addEventListener("click",(function(e){this.classList.add("open");const t=this.nextElementSibling.querySelectorAll(".fj-gallery");t.length&&btf.initJustifiedGallery(t)}))}))}(),b(),v(),function(){let e=!1;const t=document.querySelector("#comment-switch > .switch-btn");t&&t.addEventListener("click",(function(){this.classList.toggle("move"),document.querySelectorAll("#post-comment > .comment-wrap > div").forEach((function(e){btf.isHidden(e)?e.style.cssText="display: block;animation: tabshow .5s":e.style.cssText="display: none;animation: ''"})),e||"function"!=typeof loadOtherComment||(e=!0,loadOtherComment())}))}(),document.getElementById("toggle-menu").addEventListener("click",(()=>{c()}))},refreshFn(),window.addEventListener("resize",(()=>{s(!1),btf.isHidden(document.getElementById("toggle-menu"))&&i&&a()})),document.getElementById("menu-mask").addEventListener("click",(e=>{a()})),L(),GLOBAL_CONFIG.islazyload&&(window.lazyLoadInstance=new LazyLoad({elements_selector:"img",threshold:0,data_src:"lazy-src"})),void 0!==GLOBAL_CONFIG.copyright&&(()=>{const e=GLOBAL_CONFIG.copyright;document.body.oncopy=t=>{let n;t.preventDefault();const o=window.getSelection(0).toString();return n=o.length>e.limitCount?o+"\n\n\n"+e.languages.author+"\n"+e.languages.link+window.location.href+"\n"+e.languages.source+"\n"+e.languages.info:o,t.clipboardData?t.clipboardData.setData("text",n):window.clipboardData.setData("text",n)}})()}));
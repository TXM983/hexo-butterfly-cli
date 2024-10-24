
const scrollFn = function () {
    const $rightside = document.getElementById('rightside')
    const innerHeight = window.innerHeight + 56

    // 當滾動條小于 56 的時候
    if (document.body.scrollHeight <= innerHeight) {
        $rightside.style.cssText = 'opacity: 1; transform: translateX(-58px)'
        return
    }

    // find the scroll direction
    function scrollDirection (currentTop) {
        const result = currentTop > initTop // true is down & false is up
        initTop = currentTop
        return result
    }

    let initTop = 0
    let isChatShow = true
    const $header = document.getElementById('page-header')
    const isChatBtnHide = typeof chatBtnHide === 'function'
    const isChatBtnShow = typeof chatBtnShow === 'function'

    window.scrollCollect = () => {
        return btf.throttle(function (e) {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            const isDown = scrollDirection(currentTop)
            if (currentTop > 56) {
                if (isDown) {
                    if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible')
                    if (isChatBtnShow && isChatShow === true) {
                        chatBtnHide()
                        isChatShow = false
                    }
                } else {
                    if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible')
                    if (isChatBtnHide && isChatShow === false) {
                        chatBtnShow()
                        isChatShow = true
                    }
                }
                $header.classList.add('nav-fixed')
                if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
                    $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
                }
            } else {
                if (currentTop === 0) {
                    $header.classList.remove('nav-fixed', 'nav-visible')
                }
                $rightside.style.cssText = "opacity: ''; transform: ''"
            }

            if (document.body.scrollHeight <= innerHeight) {
                $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
            }
        }, 200)()
    }

    window.addEventListener('scroll', scrollCollect)
}


document.addEventListener('pjax:complete', scrollFn);
document.addEventListener('DOMContentLoaded', scrollFn);
scrollFn();
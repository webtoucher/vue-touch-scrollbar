/**
 * @name VueJS vTouchScrollbox (vue-touch-scrollbox)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Alexey Kuznetsov <mirakuru@webtoucher.ru>
 * @file v-touch-scrollbox  directive definition
 */

const scrollToBottom = (el, smooth) => {
    if (typeof el.scroll === 'function') {
        el.scroll({
            top: el.scrollHeight,
            behavior: smooth ? 'smooth' : 'instant',
        })
    } else {
        el.scrollTop = el.scrollHeight
    }
}

const touchScroll = (wrapper, content, scrollBar) => {
    if (scrollBar) {
        const sliderScale = wrapper.clientHeight / content.offsetHeight
        if (sliderScale >= 1) {
            scrollBar.style.display = 'none'
        }
        scrollBar.style.height = wrapper.clientHeight * sliderScale + 'px'
        scrollBar.style.opacity = '0'
        scrollBar.style.transition = 'opacity .3s'
    }

    content.addEventListener('touchstart', function (event) {
        // 停止定时
        clearInterval(this.intervalId);
        if (scrollBar) {
            clearInterval(scrollBar.intervalId);
        }
        // 获取触点对象
        var touch = event.changedTouches[0];
        // 获取触点的起始位置
        this.startY = touch.clientY;
        // 获取元素的起始位置
        this.eleY = transformCss(content, 'translateY');
        // 初始化手指滑动距离
        this.dstY = 0;
        // 计算当前时间
        this.startTime = (new Date).getTime();

        // 滚动条显示
        if (scrollBar) {
            scrollBar.style.opacity = 1;
        }

    });
    //手指移动 触摸移动
    content.addEventListener('touchmove', function (event) {
        //获取触点对象
        var touch = event.changedTouches[0];
        // 获取触点的结束位置
        var endY = touch.clientY;
        // 计算滑动的距离
        this.dstY = endY - this.startY;

        // 计算内容的位置
        var translateY = this.eleY + this.dstY;

        // 如果到达临界值，开始橡皮筋
        if(translateY > 0) {
            // 计算比例
            var scale = 1 - translateY / (app.clientHeight * 1.8);
            // 重新计算位置
            translateY *= scale

        } else if (translateY < app.clientHeight - content.offsetHeight) {
            // 计算内容距离视口下边的距离
            var bottomY = app.clientHeight - (content.offsetHeight + translateY) ;
            // 计算比例
            var scale =  1 - bottomY / (app.clientHeight * 1.8);
            // 重新计算容距离视口下边的距离
            bottomY *= scale;
            // 计算新的位置
            translateY = (app.clientHeight - bottomY) - content.offsetHeight
        }

        // 设置内容位置
        transformCss(content, 'translateY', translateY);

        // 计算滚动条的位置
        if (scrollBar) {
            transformCss(scrollBar, 'translateY', -translateY * sliderScale);
        }

    });
    //手指离开 触摸结束
    content.addEventListener('touchend', function(event){
        //计算结束事件
        var endTime = (new Date).getTime();
        // 计算时间间隔
        var dstTime = endTime - this.startTime;
        // 计算加速距离
        var speed = this.dstY / dstTime * 200;
        //获取当前位置
        var translateY = transformCss(content, 'translateY');
        // 加上加速距离
        translateY += speed;

        // 定义过渡类型
        var type = 'ease';
        // 临界值 执行回弹
        if (translateY > 0) {
            translateY = 0;
            type = 'backEaseOut';
        } else if (translateY < app.clientHeight - content.offsetHeight) {
            translateY =  app.clientHeight - content.offsetHeight;
            type = 'backEaseOut';
        }

        moveTo(content, translateY, 500, type);
        if (scrollBar) {
            moveTo(scrollBar, -translateY * sliderScale, 500, type);
        }

    });
}

const vTouchScrollbox = {
    bind: (el, binding) => {
        let scrolled = false

        el.addEventListener('scroll', e => {
            scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight
            if (scrolled && el.scrollTop === 0) {
                el.dispatchEvent(new Event('v-touch-scrollbox-top-reached'))
            }
        })

        new MutationObserver(e => {
            let config = binding.value || {}
            if (config.enabled === false) return
            let pause = config.always === false && scrolled
            const addedNodes = e[e.length - 1].addedNodes.length
            const removedNodes = e[e.length - 1].removedNodes.length

            if (config.scrollonremoved) {
                if (pause || (addedNodes !== 1 && removedNodes !== 1)) return
            } else {
                if (pause || addedNodes !== 1) return
            }

            let smooth = config.smooth
            const loadingRemoved = !addedNodes && removedNodes === 1
            if (loadingRemoved && config.scrollonremoved && 'smoothonremoved' in config) {
                smooth = config.smoothonremoved
            }
            scrollToBottom(el, smooth)
        }).observe(el, { childList: true, subtree: true })
    },
    inserted: (el, binding) => {
        const config = binding.value || {}
        scrollToBottom(el, config.notSmoothOnInit ? false : config.smooth)
    },
}

export default vTouchScrollbox

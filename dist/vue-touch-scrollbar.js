;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global['vue-touch-scrollbar'] = factory()))
})(this, function () {
    'use strict'

    /**
     * @name VueJS vTouchScrollbar (vue-touch-scrollbar)
     * @description Monitors an element and scrolls to the bottom if a new child is added
     * @author Alexey Kuznetsov <mirakuru@webtoucher.ru>
     * @file v-touch-scrollbar  directive definition
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

    const vTouchScrollbar = {
        bind: (el, binding) => {
            let scrolled = false
            el.addEventListener('scroll', e => {
                scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight

                if (scrolled && el.scrollTop === 0) {
                    el.dispatchEvent(new Event('v-touch-scrollbar-top-reached'))
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
            }).observe(el, {
                childList: true,
                subtree: true,
            })
        },
        inserted: (el, binding) => {
            const config = binding.value || {}
            scrollToBottom(el, config.notSmoothOnInit ? false : config.smooth)
        },
    }

    /**
     * @name VueJS vTouchScrollbar (vue-touch-scrollbar)
     * @description Monitors an element and scrolls to the bottom if a new child is added
     * @author Alexey Kuznetsov <mirakuru@webtoucher.ru>
     * @file vue-touch-scrollbar plugin definition
     */
    var VueTouchScrollbar = {
        install: (Vue, options) => {
            Vue.directive('touch-scrollbar', vTouchScrollbar)
        },
    }

    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(VueTouchScrollbar)
    }

    return VueTouchScrollbar
})

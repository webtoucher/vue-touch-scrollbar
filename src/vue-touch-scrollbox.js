/**
 * @name VueJS vTouchScrollbox (vue-touch-scrollbox)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Alexey Kuznetsov <mirakuru@webtoucher.ru>
 * @file vue-touch-scrollbox plugin definition
 */

import vTouchScrollbox from './directives/v-touch-scrollbox.js'

var VueTouchScrollbox = {
    install: (Vue, options) => {
        Vue.directive('touch-scrollbox', vTouchScrollbox)
    },
}

export default VueTouchScrollbox

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueTouchScrollbox)
}

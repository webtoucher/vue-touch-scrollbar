/**
 * @name VueJS vTouchScrollbar (vue-touch-scrollbar)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Alexey Kuznetsov <mirakuru@webtoucher.ru>
 * @file vue-touch-scrollbar plugin definition
 */

import vTouchScrollbar from './directives/v-touch-scrollbar.js';

var VueTouchScrollbar = {
  install: (Vue, options) => {
    Vue.directive('touch-scrollbar', vTouchScrollbar)
  }
};

export default VueTouchScrollbar;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTouchScrollbar)
}

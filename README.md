# vue-touch-scrollbox
[![](https://flat.badgen.net/npm/v/vue-touch-scrollbox?color=red)](https://www.npmjs.com/package/vue-touch-scrollbox) 
[![](https://flat.badgen.net/jsdelivr/hits/npm/vue-touch-scrollbox)](https://www.jsdelivr.com/package/npm/vue-touch-scrollbox) [![](https://flat.badgen.net/bundlephobia/minzip/vue-touch-scrollbox?color=orange)](https://bundlephobia.com/result?p=vue-touch-scrollbox) [![](https://flat.badgen.net/npm/license/vue-touch-scrollbox)](https://github.com/webtoucher/vue-touch-scrollbox/blob/master/license)

A plugin for Vue.js 2 that scrolls via css-transformation instead of native scrolling. It is based on plugin [vue-chat-scroll](https://github.com/theomessin/vue-chat-scroll) and can be used for chats or another dynamic content that need scrolling to the bottom of an element when new content is added within said element.

## Installation

### NPM (recommended)

```
npm install --save vue-touch-scrollbox
```

``` js
import Vue from 'vue'
import VueTouchScrollbox from 'vue-touch-scrollbox'

Vue.use(VueTouchScrollbox)
```

### Simple Script Tag

Just include `dist/vue-touch-scrollbox.js` _after including Vue_.
```html
<script src="https://cdn.jsdelivr.net/npm/vue-touch-scrollbox/dist/vue-touch-scrollbox.min.js"></script>
```

## Usage

There's nothing you need to do in JavaScript except for installation. To use the plugin, simply use the `v-touch-scrollbox` directive.

``` html
<ul class="messages" v-touch-scrollbox>
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```

#### Prevent scroll down when user has scrolled up & smooth scrolling

Alternatively, you can pass a config value to the directive:

``` html
<ul class="messages" v-touch-scrollbox="{always: false, smooth: true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```

#### Smooth scrolling for updates but not the first time the container comes in view

``` html
<ul class="messages" v-touch-scrollbox="{smooth: true, notSmoothOnInit: true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```

#### Scroll with dissapearing elements in chat window

If you have a "loading" animation that disappears when you receive a message from an external source, use the `scrollonremoved` option to ensure the scroll will happen after the element has been removed 

``` html
<ul class="messages" v-touch-scrollbox="{always: false, smooth: true, scrollonremoved:true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
  <li v-if="loading">&bull;&bull;&bull;</li>
</ul>
```

If you want to avoid having smooth scroll in this situation (so it instantly scrolls to bottom after loading), but keep it when new messages come, use the `smoothonremoved` set to `false`, while being able to keep `smooth` set to `true` for later messages.
``` html
<ul class="messages" v-touch-scrollbox="{always: false, smooth: true, scrollonremoved:true, smoothonremoved: false}">
  <li class="message" v-for="n in messages">{{ n }}</li>
  <li v-if="loading">&bull;&bull;&bull;</li>
</ul>
```
This option only applies if `scrollonremoved` is set to `true`. When not defined behavior defaults to `smooth` property.

#### Disable vue-touch-scrollbox using configuration prop

You may use the `enabled` configuration property to control `v-touch-scrollbox`.

``` html
<ul class="messages" :v-touch-scrollbox="{enabled: enabled}">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```
```js
data () => {
  enabled: false,
}
```

### Events

- **v-touch-scrollbox-top-reached**
Will be triggered when the top of scrollbar is reached. If you are using this event for prepending items to the list then also make sure that the config option **always** is set to false.
``` html
<ul class="messages" v-touch-scrollbox="{always: false}" @v-touch-scrollbox-top-reached="customMethod">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```

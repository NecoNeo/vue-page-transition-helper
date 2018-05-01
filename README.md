# vue-page-transition-helper

## description
helps to get a push pop state when you build an app with a native app like behavior based on vue-router
it returns different value regardless of depth of link:
<pre><code>
// returns 'forward'
this.$router.push('/some-link')
// returns 'back'
this.$router.go(-1)
</code></pre>

## usage

<pre><code>
npm install --save vue-page-transition-helper
</code></pre>

main.js

<pre><code>
import { VuePageTransitionHelper } from 'vue-page-transition-helper'
import router from './router'

Vue.use(VuePageTransitionHelper, { router })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

</code></pre>

./router/router.js

<pre><code>

// dosen't have to be changed

Vue.use(Router)

export default new Router({
  ...
})
</code></pre>

App.vue

<pre><code>
<transition :name="transitionName">
  <router-view></router-view>
</transition>
</pre></code>

<pre><code>
import { VuePageTransitionHelper } from 'vue-page-transition-helper'

export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {

      // here does slightly changes to the official vue-router example

      if (VuePageTransitionHelper.getState() === 'forward') {
        this.transitionName = 'slide-left'
      } else if (VuePageTransitionHelper.getState() === 'back') {
        this.transitionName = 'slide-right'
      }
    }
  }
}

...
</code></pre>
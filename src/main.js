import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import 'bootstrap'
import VueChatScroll from 'vue-chat-scroll'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueChatScroll)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

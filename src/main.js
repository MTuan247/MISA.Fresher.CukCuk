import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import EventBus from './plugins/eventbus'

Vue.config.productionTip = false

Vue.prototype.$eventBus = EventBus


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

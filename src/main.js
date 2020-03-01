import Vue from 'vue'
import App from './App.vue'
// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import store from './store'

import './assets/iconfont/iconfont.css'

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

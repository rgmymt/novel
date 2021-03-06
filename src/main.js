import Vue from 'vue'
import App from './App.vue'
// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import store from './store'
// 公共封装请求
import request from './axios'
import './assets/iconfont/iconfont.css'
import Util from './common/util'
Vue.prototype.util = Util
import Mui from 'vue-awesome-mui'
// // mount with global
Vue.use(Mui)
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$request = request
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

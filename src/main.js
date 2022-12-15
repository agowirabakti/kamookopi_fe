import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/id'

Vue.use(ElementUI, {locale});

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faLocationDot, faList, faArrowRightFromBracket, faArrowRightToBracket, faClipboardList, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleRight, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({faCheckCircle, faLocationDot, faInstagram, faWhatsapp, faCircleRight, faClipboard, faList, faArrowRightFromBracket, faArrowRightToBracket, faClipboardList, faCircle})

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

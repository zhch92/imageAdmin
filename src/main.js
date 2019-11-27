// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import {
//   Button,
//   Form,
//   FormItem,
//   Input,
//   Message,
//   Menu,
//   Submenu,
//   MenuItem,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Table,
//   TableColumn,
//   Dialog
// } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {apiData} from './ulits/common.js'

Vue.config.productionTip = false
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Dialog)
// Vue.prototype.$message = Message
Vue.use(ElementUI)
Vue.prototype.apiData = apiData
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

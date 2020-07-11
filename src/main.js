// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import VueFire from 'vuefire';
import App from './App'

Vue.config.productionTip = false


//import {VueFire} from 'vuefire';
Vue.use(firestorePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

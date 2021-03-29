import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';

require('dotenv').config();

Vue.config.productionTip = false;
Vue.use(Toasted, {
  iconPack: 'fontawesome',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

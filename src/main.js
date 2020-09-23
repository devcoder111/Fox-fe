import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuse";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { createI18n } from "./i18n/index";
import Toasted from 'vue-toasted';
import filter from "./utils/filters";

Vue.config.productionTip = false;

const i18n = createI18n();

// let count = 0;
// Vue.mixin({
//   created() {
//     console.log(++count);
//   },
//   destroyed() {
//     console.log(--count);
//   }
// });

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 3000
});
Vue.use(filter);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

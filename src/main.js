import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import "./plugins/vuesax.js";
import "./assets/styles/main.scss";
import store from "./store";
import "./plugins/responsiveScreen";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

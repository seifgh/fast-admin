import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import "./assets/styles/main.scss";
import "boxicons/css/boxicons.min.css";
import store from "./store";
import "./plugins/vueMeta";
import "./plugins/responsiveScreen";
import "./plugins/loading";
import "./plugins/notification";
// configs
import { colors } from "./fast-admin.config";
import setCssVars from "./utils/setCssVars";

setCssVars(colors, "-cl");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

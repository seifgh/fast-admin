import Vue from "vue";
import Loading from "./Loading.vue";

const loadingPlugin = {
  install(Vue) {
    Vue.component("loading", Loading);
    Vue.prototype.$loading = Vue.observable({
      isLoading: false,
      message: "Loading...",
    });
    Vue.prototype.$startLoading = (message = "Loading...") => {
      Vue.prototype.$loading.message = message;
      Vue.prototype.$loading.isLoading = true;
    };
    Vue.prototype.$closeLoading = () => {
      Vue.prototype.$loading.isLoading = false;
      Vue.prototype.$loading.message = null;
    };
  },
};

Vue.use(loadingPlugin);

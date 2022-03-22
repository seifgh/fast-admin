import Vue from "vue";
import Loading from "./Loading.vue";

const loadingPlugin = {
  install(Vue) {
    Vue.component("loading", Loading);
    Vue.prototype.$loading = Vue.observable({
      isLoading: false,
      message: "Loading...",
      id: "root",
    });
    Vue.prototype.$startLoading = ({ message = "Loading...", id = "root" }) => {
      Vue.prototype.$loading.message = message;
      Vue.prototype.$loading.id = id;
      Vue.prototype.$loading.isLoading = true;
    };
    Vue.prototype.$closeLoading = () => {
      Vue.prototype.$loading.isLoading = false;
      Vue.prototype.$loading.message = "Loading...";
      Vue.prototype.$loading.id = "root";
    };
  },
};

Vue.use(loadingPlugin);

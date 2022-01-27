import Vue from "vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
import fastAdminConfigs from "../../fast-admin.config";
import setCssVars from "../utils/setCssVars";

setCssVars(fastAdminConfigs.colors, "-cl");

Vue.use(Vuesax, {
  colors: fastAdminConfigs.colors,
});

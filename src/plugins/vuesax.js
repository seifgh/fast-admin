import Vue from "vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
import { colors } from "../fast-admin.config";
import setCssVars from "../utils/setCssVars";

setCssVars(colors, "-cl");

Vue.use(Vuesax, {
  colors,
});

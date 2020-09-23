import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#263A74",
    secondary: colors.pink.base,
    accent: "#1F88E5",
    error: colors.red.accent4,
    info: colors.blue.lighten1,
    success: colors.green.accent4,
    warning: colors.amber.darken2
  },
  options: {
    themeVariations: ["primary", "secondary"]
  }
});

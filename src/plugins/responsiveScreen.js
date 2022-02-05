import Vue from "vue";

const matchBreakpoint = (maxWidth) => {
  return window.matchMedia(`(max-width: ${maxWidth - 1}px)`).matches;
};

const responsiveScreenPlugin = {
  install(
    Vue,
    breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  ) {
    const getNewScreenSize = () => ({
      isSm: matchBreakpoint(breakpoints.sm),
      isMd: matchBreakpoint(breakpoints.md),
      isLg: matchBreakpoint(breakpoints.lg),
      isXl: matchBreakpoint(breakpoints.xl),
      isXxl: matchBreakpoint(breakpoints.xxl),
    });

    Vue.prototype.$screen = Vue.observable({ size: getNewScreenSize() });

    window.addEventListener("resize", () => {
      Vue.prototype.$screen.size = getNewScreenSize();
    });
  },
};

Vue.use(responsiveScreenPlugin);

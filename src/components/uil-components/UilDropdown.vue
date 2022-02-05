<template>
  <div class="uil-dropdown">
    <div @click.stop="toggleContent">
      <slot name="toggler" :open="open" />
    </div>
    <transition :name="transitionName">
      <div :class="contentClassName" v-show="open">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    transitionName: {
      // transitions names in anims.scss
      type: String,
      default: "fade",
    },
    direction: {
      type: String,
      default: "rb", // left bottom
    },
  },
  data() {
    return {
      open: this.show,
    };
  },
  computed: {
    contentClassName() {
      return `ct d-${this.direction}`;
    },
  },
  methods: {
    toggleContent() {
      this.open = !this.open;
      if (this.open) {
        document.addEventListener("click", this.toggleContent);
      } else {
        document.removeEventListener("click", this.toggleContent);
      }
    },
  },
  mounted() {
    if (this.show) {
      document.addEventListener("click", this.toggleContent);
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.toggleContent);
  },
};
</script>

<style lang="scss" scoped>
.uil-dropdown {
  @apply relative inline-block;
}
.ct {
  /* content */
  @apply absolute z-20;
}
/* direction */
.d-lb {
  /* left bottom */
  top: 100%;
  @apply left-0 mt-3;
}
.d-lt {
  /* left top */
  bottom: 100%;
  @apply left-0 mb-3;
}
.d-rb {
  /* right bottom */
  top: 100%;
  @apply right-0 mt-3;
}
.d-rt {
  /* right top */
  bottom: 100%;
  @apply right-0 mb-3;
}
.d-l {
  // left
  right: calc(100% + 4px);
  @apply top-0 mb-3;
}
</style>
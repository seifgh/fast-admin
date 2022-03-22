<template>
  <div v-if="showLoading" class="loading-plugin" :style="getPositionStyles()">
    <div class="spinner">
      <span class="spin"></span>
      <span class="spin spin-2"></span>
    </div>

    <small>{{ message }}</small>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: "root",
    },
  },
  computed: {
    message() {
      return this.$loading.message;
    },
    showLoading() {
      return this.$loading.isLoading && this.$loading.id == this.id;
    },
    // styles() {}
  },
  methods: {
    getPositionStyles() {
      const { parentElement } = this.$el;
      const parentElementclientRect = parentElement.getBoundingClientRect();
      return {
        top: parentElementclientRect.top + "px",
        left: parentElementclientRect.left + "px",
        width: parentElementclientRect.width + "px",
        height: parentElementclientRect.height + "px",
      };
    },
  },
  watch: {
    "$loading.isLoading"() {
      document.scrollingElement.style.overflow = this.showLoading
        ? "hidden"
        : "auto";
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-plugin {
  @apply z-50 fixed top-0 left-0 flex flex-col items-center 
  justify-center w-full h-full bg-gray-100 bg-opacity-40;
}
small {
  @apply text-primary font-semibold mt-2;
}

.spinner {
  @apply relative w-12 h-12;
  .spin {
    &::after {
      content: "";
      @apply absolute  block rounded-full border-primary
    w-full h-full z-10;
      border-width: 3px;
      border-top-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
      animation: spin 1s linear infinite;
    }
    &.spin-2::after {
      @apply z-0;
      border-style: dotted;
      border-bottom-color: var(--primary-cl);

      animation: spin 1s ease infinite;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
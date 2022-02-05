<template>
  <div
    class="drop-drag-space"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    :class="{
      ov: dragIsOver,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragIsOver: false,
    };
  },
  methods: {
    updateValue(files) {
      this.$emit("input", files);
    },
    handleDragOver(e) {
      e.preventDefault();
      this.dragIsOver = true;
    },
    handleDragLeave(e) {
      e.preventDefault();
      this.dragIsOver = false;
    },
    handleDrop(e) {
      e.preventDefault();
      this.dragIsOver = false;
      this.updateValue(e.dataTransfer.files);
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-drag-space {
  @apply opacity-100 bg-white shadow-md border-2 border-dotted rounded-lg p-8;
  &.ov {
    // drag is over
    @apply opacity-75 border-primary;
    transition: 0.3s opacity;
  }
}
</style>
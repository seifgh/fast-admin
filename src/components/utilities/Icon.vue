<template>
  <i :class="className"></i>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: "bx",
    },
  },
  computed: {
    /**
     * @returns {string}
     */
    className() {
      return `${this.prefix} ${this.iconName}`;
    },
  },
};
</script>

<style>
</style>
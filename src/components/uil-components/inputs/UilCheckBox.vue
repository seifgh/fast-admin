<template>
  <button class="uil-checkbox" :class="{ checked: value }" @click.stop="toggle">
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 4.00004L3.58 6.83004L9.25 1.17004"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.uil-checkbox {
  @apply relative inline-flex items-center justify-center
   cursor-pointer w-6 h-6 border-gray-300 border-2
   transition-all overflow-hidden rounded-md transform;
  svg {
    @apply opacity-0 block w-3 h-3;
  }
  &:active {
    @apply scale-90;
  }
  &.checked {
    @apply bg-primary border-primary;
    svg {
      @apply opacity-100;
    }
  }
}
</style>
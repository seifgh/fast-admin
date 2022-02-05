<template>
  <div class="text-input-container">
    <label>{{ label }}</label>
    <textarea
      :value="value"
      :placeholder="placeholder"
      @input="inputChange"
      @blur="$forceUpdate()"
      class="text-input"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: undefined,
    label: {
      type: String,
      required: true,
    },
    validator: {
      type: Function,
      default: () => true,
    },
    formatter: {
      type: Function,
      default: (v) => v,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    inputChange({ target }) {
      const value = this.type == "number" ? target.valueAsNumber : target.value;
      if (this.validator(value)) this.$emit("input", this.formatter(value));
    },
  },
};
</script>

<style lang="scss" scoped>
.text-input-container {
  @apply block mb-4;
}

.text-input {
  @apply shadow-md w-full mt-1 mb-2 inline-flex bg-white items-center py-3 px-5 rounded-lg border font-medium h-32;
  &:focus {
    @apply border-primary;
  }
  &[type="color"]:focus {
    @apply border-gray-200;
  }
  &[type="color"] {
    @apply p-2;
  }
  &[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border: 0;
  }
  &[type="color"]::-webkit-color-swatch {
    @apply rounded-md border-0 shadow-sm;
  }
}

small {
  @apply text-sm;
  &.err {
    @apply text-red-500;
  }
}
</style>
<template>
  <div class="text-input-container">
    <label>{{ label }}</label>
    <input
      :type="type"
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
    type: {
      type: String,
      default: "text",
    },
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
      let value = target.value;
      if (this.type == "number") {
        value = value == "" ? null : Number(value);
      }
      if (this.validator(value)) this.$emit("input", this.formatter(value));
    },
  },
};
</script>

<style lang="scss" scoped>
.text-input-container {
  @apply block mb-4;
  &.has-err {
    .text-input {
      @apply border-danger;
      animation: shake 0.3s;
    }
  }
}

.text-input {
  @apply shadow-sm w-full inline-flex bg-white items-center 
  py-3 px-5 rounded-lg border font-medium;
  &:focus {
    @apply border-primary outline-none shadow-md;
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
label {
  @apply text-sm ml-1;
}
small {
  @apply text-sm;
  &.err {
    @apply text-danger;
  }
}
</style>
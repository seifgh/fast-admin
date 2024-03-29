<template>
  <div class="uil-select-input">
    <label>{{ label }}</label>
    <button @click.stop="toggleContent" type="button">
      <small>{{ selectedValue || "Please select an option" }} </small
      ><svg
        class="icon"
        :class="{ ac: open }"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>

    <slot />

    <div ref="options">
      <transition name="fade-down">
        <div v-if="open" class="options">
          <ul>
            <li
              v-for="option in options"
              :key="option.value"
              @click="updateValue(option.value)"
              :class="{ ac: option.value === value }"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: { type: Array, required: true },
  },
  data() {
    return { open: false };
  },
  computed: {
    selectedValue() {
      const selected = this.options.find(({ value }) => value === this.value);
      return selected && selected.label;
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
    updateValue(value) {
      this.$emit("input", value);
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.toggleContent);
  },
};
</script>

<style lang="scss" scoped>
.uil-select-input {
  @apply relative mb-4;
  &.has-err {
    button {
      @apply border-danger;
      animation: shake 0.3s;
    }
  }
}
.uil-select-input > button {
  @apply justify-between shadow-sm w-full inline-flex bg-white items-center py-3 px-5 rounded-lg border font-medium h-12;

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

.icon {
  @apply duration-200 transition-transform transform w-4
     rounded;
  &.ac {
    /* active */
    @apply rotate-180;
  }
}
button {
  span {
    @apply truncate;
  }
}
.options {
  /* options container */
  top: 100%;
  max-height: 200px;
  @apply mt-2 absolute w-full bg-white h-auto z-20 right-0 py-3 shadow-md rounded-md border overflow-auto;
}
li {
  @apply py-2 px-3 text-sm cursor-pointer;
  &:hover {
    @apply bg-gray-100;
  }
  &.ac {
    @apply font-semibold text-primary bg-transparent;
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
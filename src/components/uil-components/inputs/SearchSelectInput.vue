<template>
  <div class="search-select-input mb-4">
    <label>{{ label }}</label>
    <button @click.stop="toggleContent" class="">
      <span>{{ selectedValue || $t("globals.emptySelectList") }} </span
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
          <div class="search">
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                  stroke="#343A40"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 15.75L12.4875 12.4875"
                  stroke="#343A40"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                v-model="searchInput"
                class="w-full ml-2"
                type="text"
                :placeholder="placeholder"
              />
            </div>
          </div>
          <ul>
            <li
              v-for="option in options"
              :key="option.id"
              @click="updateValue(option.id)"
              :class="{ ac: option.id === value }"
            >
              {{ option.value }}
            </li>
          </ul>
          <div
            v-if="options.length == 0 && searchInput"
            class="flex items-center justify-center"
          >
            <small>Nothing found for "{{ searchInput }}"</small>
          </div>
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
    placeholder: {
      type: String,
      required: true,
    },
    options: { type: Array, required: true },
  },
  data() {
    return { open: false, searchInput: "" };
  },
  computed: {
    selectedValue() {
      const selected = this.options.find(({ id }) => id === this.value);
      return selected && selected.value;
    },
  },
  methods: {
    toggleContent({ target }) {
      if (
        target != this.$refs.options &&
        !this.$refs.options.contains(target)
      ) {
        this.open = !this.open;
        if (this.open) {
          document.addEventListener("click", this.toggleContent);
        } else {
          document.removeEventListener("click", this.toggleContent);
        }
      }
    },
    updateValue(value) {
      this.$emit("input", value);
      this.open = false;
      document.removeEventListener("click", this.toggleContent);
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.toggleContent);
  },
  watch: {
    searchInput() {
      this.$emit("filterOptions", this.searchInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-select-input {
  @apply relative;
}
.search-select-input > button {
  @apply justify-between shadow-md w-full mt-1 mb-2 inline-flex bg-white items-center py-3 px-5 rounded-lg border font-medium h-12;

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
  max-height: 24rem;
  @apply absolute w-full bg-white h-auto z-20 right-0 mt-3 pb-3 shadow-md rounded-md border overflow-auto;
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

.search {
  @apply sticky top-0 bg-white p-4 mb-4 shadow-sm;
  & > div {
    @apply flex items-center border rounded-lg p-2 shadow-sm;
  }
}

small {
  @apply text-sm;
  &.err {
    @apply text-red-500;
  }
}
</style>
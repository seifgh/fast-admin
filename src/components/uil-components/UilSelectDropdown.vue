<template>
  <div class="input">
    <button @click.stop="toggleContent" :data-name="name">
      <span>
        {{ label }}
        <small
          >{{
            (value && options.find((opt) => opt.value === value).label) ||
            "Choose an option"
          }}
        </small> </span
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
    <transition name="fade-down">
      <ul v-if="open">
        <li
          v-for="option in options"
          :key="option.value"
          @click="updateValue(option.value)"
          :class="{ ac: option.value === value }"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
    <p v-if="description && description.length">{{ description }}</p>
    <p
      :class="{ err: errors && errors.length }"
      v-for="(err, i) in errors"
      :key="i"
    >
      {{ err }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    name: String,
    value: undefined,
    options: Array,
    description: String,
    errors: Array,
  },
  data() {
    return { open: false };
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
button {
  @apply w-auto px-3 py-2 rounded-md border shadow-sm bg-white 
  flex items-center text-sm justify-between;
  min-width: 150px;
}
.input {
  @apply relative;
}
label {
  @apply font-semibold text-sm mb-1;
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
  @apply font-semibold;
  small {
    @apply font-normal;
  }
  span {
    @apply truncate mr-2;
  }
}
ul {
  /* options container */
  top: 100%;
  max-height: 32rem;
  @apply absolute w-full bg-white h-auto z-20 right-0 mt-3 py-2 shadow-md rounded-md border overflow-auto;
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
p {
  @apply text-xs pt-1;
  &.err {
    /* has errors */
    @apply italic text-danger;
  }
}
</style>
<template>
  <div :role="role" @click="$emit('click')" :class="className">
    <UilSpinnerLoading v-if="loading" />
    <slot v-else />
  </div>
</template>

<script>
import UilSpinnerLoading from "./UilSpinnerLoading";
export default {
  components: {
    UilSpinnerLoading,
  },
  props: {
    size: {
      type: String,
      default: "sm",
    },
    type: {
      type: String,
      default: "txt",
    },
    disabled: Boolean,
    loading: Boolean,
    hover: undefined,
    rounded: undefined,
    role: String,
  },
  computed: {
    className() {
      return `uil-btn s-${this.size} t-${this.type}${
        this.disabled ? " dis" : ""
      }${this.loading ? " n-ev" : ""}${
        this.hover === undefined || this.disabled ? "" : " hov"
      }${this.rounded === undefined ? "" : " r-f"}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.uil-btn {
  /* basics ( personalized ) */
  @apply inline-flex items-center justify-center font-semibold cursor-pointer 
   rounded-md shadow-sm  transform transition-all select-none;
  transition-duration: 0.3s;
  &:hover {
    // @apply shadow-md;
  }
  &:focus {
    @apply outline-none;
  }
  &:active {
    @apply transform scale-95;
  }
}

/* loading ( spinner ) */

.r-f {
  /* rounded-full */
  @apply rounded-full;
}
.dis {
  /* disabled */
  @apply pointer-events-none opacity-50 shadow-none;
}
.n-ev {
  /* no events */
  @apply pointer-events-none;
}

/* sizes */
.s-sq-sm {
  /* square small */
  @apply w-8 h-8;
  .uil-icon {
    @apply w-5;
  }
  .uil-spinner::after {
    @apply h-4 w-4;
  }
  i {
    @apply text-lg;
  }
}

.s-sq-md {
  /* square medium */
  @apply w-12 h-12;
  .uil-icon {
    @apply w-8;
  }
  .uil-spinner::after {
    @apply h-6 w-6;
  }
  i {
    @apply text-xl;
  }
}
.s-sm {
  /* small */
  @apply px-4 py-1 text-sm;
  .uil-icon:first-child {
    @apply mr-1 w-5;
  }
  .uil-icon:last-child {
    @apply ml-1 w-5;
  }
  .uil-spinner::after {
    @apply h-4 w-4 mx-3;
  }
  i {
    @apply mr-2  text-lg;
  }
}
.s-md {
  /* medium */
  @apply px-5 py-2;
  .uil-icon:first-child {
    @apply mr-2 w-6;
  }
  .uil-icon:last-child {
    @apply ml-2 w-6;
  }
  .uil-spinner::after {
    @apply h-6 w-6 mx-4;
  }
  i {
    @apply mr-2 text-xl;
  }
}
.s-lg {
  /* large */
  @apply px-6 py-3 text-lg;
  .uil-icon:first-child {
    @apply mr-3 w-8;
  }
  .uil-icon:last-child {
    @apply ml-3 w-8;
  }
  i {
    @apply mr-2 text-2xl;
  }
  .uil-spinner::after {
    @apply h-8 w-8 border-4 mx-6;
  }
}
.s-exp {
  /* expanded */
  @apply p-2 w-full;
  .uil-icon:first-child {
    @apply mr-3 w-8;
  }
  .uil-icon:last-child {
    @apply ml-3 w-8;
  }
  .uil-spinner::after {
    @apply h-8 w-8 border-4;
  }
  i {
    @apply mr-2  text-2xl;
  }
}

/* types */
.t-txt {
  /* text */
  @apply bg-white border;
  color: var(--primary-cl);
  &.hov:hover {
    @apply underline;
  }
  .uil-spinner::after {
    border-color: var(--primary-cl);
  }
}
.t-cl {
  /* classic */
  @apply text-white;
  background: var(--primary-cl);

  &.hov:hover {
    background: var(--primary-dark-cl);
  }
  .uil-spinner::after {
    @apply border-white;
  }
}
.t-danger {
  /* danger */
  @apply text-white bg-danger;
  &.hov:hover {
    @apply opacity-90;
  }
  .uil-spinner::after {
    @apply border-white;
  }
}
.t-ot {
  /* outlined */
  @apply border-2;
  border-color: var(--primary-cl);
  color: var(--primary-cl);
  &.hov:hover {
    @apply text-white;
    background: var(--primary-cl);

    .uil-spinner::after {
      @apply border-white;
    }
  }
  .uil-spinner::after {
    border-color: var(--primary-cl);
  }
}
.t-lt {
  /* light */
  color: var(--primary-cl);
  background: var(--primary-light-cl);

  &.hov:hover {
    @apply text-white;
    background: var(--primary-cl);
    .uil-spinner::after {
      @apply border-white;
    }
  }
  .uil-spinner::after {
    border-color: var(--primary-dark-cl);
  }
}
.t-lt-ot {
  @apply border-2;
  background: var(--primary-light-cl);
  border-color: var(--primary-dark-cl);
  color: var(--primary-cl);
  &.hov:hover {
    @apply text-white;
    background: var(--primary-cl);

    .uil-spinner::after {
      @apply border-white;
    }
  }
  .uil-spinner::after {
    border-color: var(--primary-dark-cl);
  }
}
</style>
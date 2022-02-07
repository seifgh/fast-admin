<template>
  <router-link class="logo" to="/" :class="{ reduce }">
    <img src="@/assets/images/logo.svg" />
  </router-link>
</template>

<script>
export default {
  props: {
    reduce: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  // img
  @apply relative block;

  img {
    @apply w-full;
    max-height: 100% !important;
    max-width: 100% !important;
  }
}
</style>
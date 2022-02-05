<template>
  <span :class="{ active: value }">{{ value == true ? "Yes" : "No" }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: undefined,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
span {
  @apply py-1 px-2 border rounded-lg text-gray-600;
}
</style>
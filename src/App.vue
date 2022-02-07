<template>
  <div>
    <notifications />
    <loading />
    <router-view />
  </div>
</template>
<script>
export default {
  metaInfo: {
    titleTemplate: "%s | Fast admin",
  },
};
</script>
<style lang="scss" scoped>
</style>

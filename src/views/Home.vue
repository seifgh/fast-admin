<template>
  <section class="home">
    <side-bar />
    <div class="content">
      <loading id="home" />
      <router-view />
    </div>
  </section>
</template>

<script>
import SideBar from "../components/SideBar.vue";
export default {
  components: {
    SideBar,
  },
  name: "Home",
  mounted() {},
};
</script>
<style lang="scss" scoped>
.home {
  @apply relative bg-gray-50;
  @apply h-screen overflow-hidden flex items-start;
}
.content {
  @apply block relative w-full overflow-y-auto h-full min-h-screen;
}
</style>

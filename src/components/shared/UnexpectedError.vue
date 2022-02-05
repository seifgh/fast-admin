<template>
  <div class="container-1">
    <img src="@/assets/images/unexpected-error.svg" alt="empty" />
    <div class="details">
      <h3>Something went wrong!</h3>
      <p>Please check your connection and refresh.</p>
      <uil-button size="exp" type="danger" hover @click="refreshPage">
        <i class="bx bx-refresh" />
        Refresh
      </uil-button>
    </div>
  </div>
</template>

<script>
import UilButton from "../uil-components/UilButton.vue";
import refreshPage from "./../../utils/refreshPage";
export default {
  components: { UilButton },
  methods: {
    refreshPage,
  },
};
</script>

<style>
</style>
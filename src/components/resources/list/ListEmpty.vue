<template>
  <div class="container-1">
    <img src="@/assets/images/empty.svg" alt="empty" />
    <div class="details">
      <h3>No data found</h3>
      <p>Click the button below to create your first item.</p>
      <router-link :to="{ name: 'Create' }">
        <uil-button size="exp" type="cl" hover>
          <i class="bx bx-plus" />
          Create new
        </uil-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import UilButton from "../../uil-components/UilButton.vue";
export default {
  components: { UilButton },
};
</script>

<style>
</style>
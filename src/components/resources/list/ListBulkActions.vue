<template>
  <div class="bulk-actions">
    <uil-button size="sm" type="danger" hover @click="$emit('bulkDelete')">
      <icon iconName="bx-trash" />
      Delete all</uil-button
    >
  </div>
</template>

<script>
import Resource from "../../../resources/classes/Resource";
import UilButton from "../../uil-components/UilButton.vue";
import Icon from "../../utilities/Icon.vue";
export default {
  components: {
    Icon,
    UilButton,
  },
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.bulk-actions {
  // @apply mb-3;
}
button {
  i {
    @apply text-sm mr-2;
  }
}
</style>
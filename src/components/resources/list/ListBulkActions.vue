<template>
  <div class="bulk-actions">
    <uil-button size="sm" type="danger" hover @click="handleBulkDeleteAction">
      <icon iconName="bx-trash" />
      Delete all</uil-button
    >
    <uil-button
      v-for="(action, i) in bulkActions"
      :key="i"
      size="sm"
      @click="handleActionBtnClick(action)"
    >
      <icon v-if="action.icon" :iconName="action.icon" />
      {{ action.name }}
    </uil-button>
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
    selectedRecords: {
      type: Array,
      required: true,
    },
    resource: {
      type: Resource,
      required: true,
    },
  },
  computed: {
    bulkActions() {
      return this.resource.bulkActions;
    },
    selectedRecordsIds() {
      return this.selectedRecords.map((record) =>
        this.resource.getRecordId(record)
      );
    },
  },
  methods: {
    async handleBulkDeleteAction() {
      if (confirm("Are you sure you want to delete these elements?")) {
        this.handleBeforeAction();
        try {
          await this.resource.deleteItem(this.selectedRecordsIds);
        } catch (err) {
          console.log(err);
        }
        this.handleAfterAction();
      }
    },
    async handleActionBtnClick(action) {
      if (confirm("Are you sure you want to apply this action?")) {
        this.handleBeforeAction();
        try {
          await action.handler(this.selectedRecordsIds);
        } catch (err) {
          console.log(err);
        }
        this.handleAfterAction();
      }
    },
    handleBeforeAction() {
      this.$startLoading({ id: "home" });
    },
    handleAfterAction() {
      this.$closeLoading();
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.bulk-actions {
  @apply mb-2 flex flex-wrap;
}
button {
  @apply mr-2 mt-2;
  i {
    @apply text-sm mr-2;
  }
}
</style>
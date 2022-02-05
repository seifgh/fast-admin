<template>
  <td>
    <uil-dropdown direction="l">
      <template #toggler>
        <uil-button size="sq-sm" type="txt">
          <i class="bx bx-dots-vertical-rounded"></i>
        </uil-button>
      </template>

      <template #content>
        <div class="dropdown-actions">
          <button
            class="btn"
            @click="routeTo({ name: 'Show', params: { itemId } })"
          >
            <i class="bx bx-show" />
            Show
          </button>
          <button
            class="btn"
            @click="routeTo({ name: 'Edit', params: { itemId } })"
          >
            <i class="bx bx-edit-alt" />
            Edit
          </button>
          <button class="btn danger" @click="$emit('delete', itemId)">
            <i class="bx bx-trash" />
            Delete
          </button>
        </div>
      </template>
    </uil-dropdown>
  </td>
</template>

<script>
import UilButton from "../../uil-components/UilButton.vue";
import UilDropdown from "../../uil-components/UilDropdown.vue";
export default {
  components: { UilButton, UilDropdown },
  props: {
    itemId: {
      type: [String, Number],
      required: true,
    },
  },
  data: () => ({
    open: false,
  }),
  methods: {
    routeTo(routerTo) {
      this.open = false;
      this.$nextTick(() => this.$router.push(routerTo));
    },
  },
};
</script>
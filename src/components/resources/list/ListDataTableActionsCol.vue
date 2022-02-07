<template>
  <td>
    <uil-dropdown direction="l">
      <template #toggler>
        <uil-button size="sq-sm" type="txt">
          <i class="bx bx-dots-vertical-rounded"></i>
        </uil-button>
      </template>

      <template #content>
        <div class="dropdown-actions" @click.stop>
          <router-link class="btn" :to="{ name: 'Show', params: { itemId } }">
            <i class="bx bx-show" />
            Show
          </router-link>
          <router-link class="btn" :to="{ name: 'Edit', params: { itemId } }">
            <i class="bx bx-edit-alt" />
            Edit
          </router-link>
          <button class="btn danger" @click.stop="handleDelete">
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
  methods: {
    handleDelete() {
      if (window.confirm("Are you sure you want to delete this element?")) {
        this.$emit("delete", this.itemId);
      }
      document.scrollingElement.click();
    },
  },
};
</script>
<template>
  <header class="top-header">
    <div>
      <h3>{{ resource.name }}</h3>
      <uil-breadcrumb :paths="breadcrumbPaths" />
    </div>
    <div class="buttons">
      <router-link :to="{ name: 'Edit' }" class="mr-2">
        <uil-button>
          <i class="bx bx-edit-alt" />
          Edit</uil-button
        ></router-link
      >
      <uil-button type="danger" hover @click="handleDelete">
        <i class="bx bx-trash" />
        Delete</uil-button
      >
    </div>
  </header>
</template>

<script>
import Resource from "../../../resources/classes/Resource";
import UilBreadcrumb from "../../uil-components/UilBreadcrumb.vue";
import UilButton from "../../uil-components/UilButton.vue";
export default {
  components: { UilButton, UilBreadcrumb },
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
  computed: {
    breadcrumbPaths() {
      return [
        {
          name: this.resource.name,
          to: {
            name: "List",
          },
        },
        {
          name: "Show",
        },
        {
          name: this.$route.params.itemId,
        },
      ];
    },
  },
  methods: {
    handleDelete() {
      if (window.confirm("Are you sure you want to delete this element?")) {
        console.log("Delete called");
      }
    },
  },
};
</script>
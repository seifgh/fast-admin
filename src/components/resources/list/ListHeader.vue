<template>
  <header class="top-header">
    <div>
      <h3>{{ resource.name }}</h3>
      <uil-breadcrumb :paths="breadcrumbPaths" />
    </div>
    <div class="buttons">
      <uil-button type="txt" class="mr-2">
        <i class="bx bx-filter-alt" /> Filters
      </uil-button>
      <router-link :to="{ name: 'Create' }">
        <uil-button type="cl" hover>
          <i class="bx bx-plus" />
          Create new</uil-button
        ></router-link
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
        { name: this.resource.name },
        {
          name: "List",
        },
      ];
    },
  },
};
</script>
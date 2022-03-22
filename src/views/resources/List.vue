<template>
  <section>
    <list-header :resource="resource" />
    <list-data-table :resource="resource" />
  </section>
</template>

<script>
import ListDataTable from "../../components/resources/list/ListDataTable.vue";
import ListHeader from "../../components/resources/list/ListHeader.vue";
import resourceMixin from "./../../components/mixins/resourceMixin";
export default {
  components: { ListHeader, ListDataTable },
  mixins: [resourceMixin],
  metaInfo() {
    return {
      title: this.resource.name,
    };
  },
};
</script>

<style>
</style>
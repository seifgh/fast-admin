<template>
  <section>
    <show-header :resource="resource" />
    <show-display-record :resource="resource" />
  </section>
</template>

<script>
import resourceMixin from "../../components/mixins/resourceMixin";
import ShowDisplayRecord from "../../components/resources/show/ShowDisplayRecord.vue";
import ShowHeader from "../../components/resources/show/ShowHeader.vue";
export default {
  components: { ShowHeader, ShowDisplayRecord },
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
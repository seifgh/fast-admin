<template>
  <div>
    <small class="font-semibold block">Custom component</small>
    <small v-if="value > 0"> {{ value }}</small>
    <small v-else>No views</small>
  </div>
</template>

<script>
import ResourceField from "../../resources/classes/ResourceField";
export default {
  props: {
    value: {
      type: undefined,
      required: true,
    },
    field: {
      type: ResourceField,
      required: true,
    },
  },
};
</script>

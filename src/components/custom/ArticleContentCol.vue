<template>
  <div>
    <small class="font-semibold block">Custom component</small>
    <small> {{ value.slice(0, 50) }}...</small>
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

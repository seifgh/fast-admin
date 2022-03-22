<template>
  <component
    :is="field.type.customComponents.list"
    :value="value"
    :field="field"
  />
</template>

<script>
import ResourceField from "../../../../resources/classes/ResourceField";
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

<style>
</style>
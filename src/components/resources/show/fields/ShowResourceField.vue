<template>
  <div class="">
    <span v-for="(item, i) in formatedRecordData" :key="i" class="block w-full">
      <show-field :value="item.value" :field="item.field" />
    </span>
  </div>
</template>

<script>
import ResourceField from "../../../../resources/classes/ResourceField";

export default {
  components: {
    ShowField: () => import("../ShowField.vue"),
  },
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
  computed: {
    resource() {
      return this.field.type.resource;
    },
    formatedRecordData() {
      return this.resource.getFormatedRecordData(this.value);
    },
  },
};
</script>
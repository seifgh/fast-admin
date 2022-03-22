<template>
  <span v-if="field.type.hasChoices" :class="formatedValue.className || ''">
    {{ formatedValue.label }}
  </span>
  <span v-else>{{ formatedValue }}</span>
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
  computed: {
    /**
     * @returns {string | number | {value: string | number, label: string | number, className: string?}}
     */
    formatedValue() {
      if (this.field.type.hasChoices) {
        return this.field.type.getChoiceByValue(this.value);
      }
      const valueFormater = this.field.type.valueFormater.show;
      if (valueFormater) {
        return valueFormater(this.value);
      }
      return this.value;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
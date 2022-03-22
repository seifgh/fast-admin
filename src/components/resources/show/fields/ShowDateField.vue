<template>
  <div v-if="formatedValue">
    <span class="date-time" v-if="formatedValue.date">
      <i class="bx bx-calendar" />
      {{ formatedValue.date }}</span
    >
    <span class="date-time" v-if="formatedValue.time">
      <i class="bx bxs-watch" />
      {{ formatedValue.time }}</span
    >
  </div>
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
     * @returns {{date: string, time: string}}
     */
    formatedValue() {
      const valueFormater = this.field.type.valueFormater.show;
      if (valueFormater) {
        return valueFormater(this.Value);
      }
      const valueAsDate = new Date(this.value);
      return {
        date: valueAsDate.toLocaleDateString(),
        time: valueAsDate.toLocaleTimeString(),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.date-time {
  @apply flex items-center text-gray-600;
  i {
    @apply text-lg mr-2;
  }
}
</style>
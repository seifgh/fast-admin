<template>
  <list-choices-filter
    :choices="choices"
    @addFilter="(args) => $emit('addFilter', args)"
  />
</template>

<script>
import { BOOLEAN_FIELD_LABELS } from ".";
import ListChoicesFilter from "./ListChoicesFilter.vue";
const BOOLEAN_FIELD_CHOICES = [
  { value: true, label: BOOLEAN_FIELD_LABELS[true] },
  { value: false, label: BOOLEAN_FIELD_LABELS[false] },
];
export default {
  components: { ListChoicesFilter },
  computed: {
    choices() {
      return BOOLEAN_FIELD_CHOICES;
    },
  },
};
</script>

<style>
</style>
<template>
  <span v-if="value && value.length">
    <small class="font-semibold"> {{ value.length }} Likes</small>
    <span v-for="(value, i) in value" :key="i">
      <list-resource-field :value="value" :field="field" />
    </span>
  </span>
  <small v-else>No likes</small>
</template>

<script>
import ListResourceField from "../resources/list/fields/ListResourceField.vue";
export default {
  components: { ListResourceField },
  props: ["value", "field"],
};
</script>

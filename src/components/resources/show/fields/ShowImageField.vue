<template>
  <div v-if="imageUrl" class="img-field">
    <img :src="imageUrl" />
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
    imageUrl() {
      return this.field.type.fileUrlGetter(this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.img-field {
  max-width: 6rem;
  max-height: 6rem;
  @apply block relative object-cover rounded-md shadow-sm overflow-hidden mr-2 mb-2;
  img {
    @apply block w-full h-full transform transition-transform;
    &:hover {
      @apply scale-110;
    }
  }
}
</style>
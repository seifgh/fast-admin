<template>
  <div v-if="fileUrl" class="file-field">
    <a :href="fileUrl" target="_blank" flat>
      <i class="bx bxs-file" />
      <span>{{ formatedValue }}</span></a
    >
  </div>
  <span v-else class="empty-col">- - -</span>
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
    fileUrl() {
      return this.field.type.fileUrlGetter(this.value);
    },
    formatedValue() {
      const valueFormater = this.field.type.valueFormater;
      if (valueFormater) {
        return valueFormater(this.fileUrl);
      }
      return this.defaultValueFormatter(this.fileUrl);
    },
  },
  methods: {
    /**
     * @param {string} fileUrl
     */
    defaultValueFormatter(fileUrl) {
      const splited = fileUrl.split("/");
      return splited[splited.length - 1];
    },
  },
};
</script>
<style lang="scss" scoped>
.file-field a {
  max-width: 150px;
  @apply inline-flex items-center w-auto my-1 py-1 px-2 border 
  rounded-lg text-gray-600 overflow-hidden;

  i {
    @apply text-lg mr-2;
  }
}
</style>
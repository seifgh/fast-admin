<template>
  <div v-if="fileUrl" class="file-field">
    <a :href="fileUrl" target="_blank" flat>
      <i class="bx bxs-file" />
      <span>{{ formatedValue }}</span></a
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
    fileUrl() {
      return this.field.type.fileUrlGetter(this.value);
    },
    formatedValue() {
      const valueFormater = this.field.type.valueFormater.show;
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
  @apply inline-flex items-center w-auto py-1 px-2 border 
  rounded-lg  mr-2 mb-2;

  i {
    @apply text-lg mr-2;
  }
}
</style>
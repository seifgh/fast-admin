<template>
  <td>
    <span v-for="(value, i) in values" :key="i">
      <template v-if="value || value === 0 || value === false">
        <text-list-field
          v-if="field.type.isString || field.type.isText || field.type.isNumber"
          :value="value"
          :field="field"
        />
        <date-list-field
          v-else-if="field.type.isDate"
          :value="value"
          :field="field"
        />
        <image-list-field
          v-else-if="field.type.isImage"
          :value="value"
          :field="field"
        />
        <file-list-field
          v-else-if="field.type.isFile"
          :value="value"
          :field="field"
        />
        <boolean-list-field v-else-if="field.type.isBoolean" :value="value" />
      </template>
      <span v-else class="empty-col">- - -</span>
    </span>
  </td>
</template>

<script>
import ResourceField from "../../../resources/classes/ResourceField";
import BooleanListField from "./fields/BooleanListField.vue";
import DateListField from "./fields/DateListField.vue";
import FileListField from "./fields/FileListField.vue";
import ImageListField from "./fields/ImageListField.vue";
import TextListField from "./fields/TextListField.vue";
export default {
  components: {
    TextListField,
    DateListField,
    ImageListField,
    FileListField,
    BooleanListField,
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
    values() {
      // for multiple values field
      if (this.field.type.isMultiple && Array.isArray(this.value)) {
        return this.value;
      }
      return [this.value];
    },
  },
};
</script>

<style lang="scss" scoped>
.vs-table__td {
  max-width: 200px !important;
}
</style>
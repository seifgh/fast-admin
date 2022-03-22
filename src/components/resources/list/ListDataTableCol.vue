<template>
  <td>
    <list-custom-component-field
      v-if="field.type.customComponents.list"
      :value="value"
      :field="field"
    />
    <template v-if="!field.type.customComponents.list">
      <span v-for="(value, i) in values" :key="i">
        <template v-if="value || value === 0 || value === false">
          <list-date-field
            v-if="field.type.isDate"
            :value="value"
            :field="field"
          />
          <list-image-field
            v-else-if="field.type.isImage"
            :value="value"
            :field="field"
          />
          <list-file-field
            v-else-if="field.type.isFile"
            :value="value"
            :field="field"
          />
          <list-reference-field
            v-else-if="field.type.isResource && field.type.isReference"
            :value="value"
            :field="field"
          />
          <list-resource-field
            v-else-if="field.type.isResource"
            :value="value"
            :field="field"
          />
          <list-boolean-field v-else-if="field.type.isBoolean" :value="value" />
          <list-text-field v-else :value="value" :field="field" />
        </template>
        <span v-else class="empty-col">- - -</span>
      </span>
    </template>
  </td>
</template>

<script>
import ResourceField from "../../../resources/classes/ResourceField";
import ListBooleanField from "./fields/ListBooleanField.vue";
import ListCustomComponentField from "./fields/ListCustomComponentField.vue";
import ListDateField from "./fields/ListDateField.vue";
import ListFileField from "./fields/ListFileField.vue";
import ListImageField from "./fields/ListImageField.vue";
import ListReferenceField from "./fields/ListReferenceField.vue";
import ListResourceField from "./fields/ListResourceField.vue";
import ListTextField from "./fields/ListTextField.vue";
export default {
  components: {
    ListTextField,
    ListDateField,
    ListImageField,
    ListFileField,
    ListBooleanField,
    ListReferenceField,
    ListResourceField,
    ListCustomComponentField,
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
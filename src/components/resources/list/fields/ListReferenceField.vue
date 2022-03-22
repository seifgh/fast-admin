<template>
  <span @click.stop class="resource-field-values">
    <router-link
      v-for="({ value, id }, i) in values"
      :key="i"
      :to="{
        name: 'Show',
        params: {
          resourceId: resource.resourceId,
          itemId: id,
        },
      }"
    >
      <template v-if="value || value === 0 || value === false">
        <list-date-field
          v-if="resourceTitleField.type.isDate"
          :value="value"
          :field="resourceTitleField"
        />
        <list-image-field
          v-else-if="resourceTitleField.type.isImage"
          :value="value"
          :field="resourceTitleField"
        />
        <list-file-field
          v-else-if="resourceTitleField.type.isFile"
          :value="value"
          :field="resourceTitleField"
        />
        <list-boolean-field
          v-else-if="resourceTitleField.type.isBoolean"
          :value="value"
        />
        <list-text-field v-else :value="value" :field="resourceTitleField" />
      </template>
    </router-link>
  </span>
</template>

<script>
import ResourceField from "../../../../resources/classes/ResourceField";
import ListBooleanField from "./ListBooleanField.vue";
import ListDateField from "./ListDateField.vue";
import ListFileField from "./ListFileField.vue";
import ListImageField from "./ListImageField.vue";
import ListTextField from "./ListTextField.vue";
export default {
  components: {
    ListBooleanField,
    ListDateField,
    ListFileField,
    ListImageField,
    ListTextField,
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
    resourceTitleField() {
      return this.resource.getTitleField();
    },
    values() {
      // for multiple values field
      if (this.field.type.isMultiple && Array.isArray(this.value)) {
        return this.value.map((v) => ({
          value: this.resource.getRecordTitle(v),
          id: this.resource.getRecordId(v),
        }));
      }
      return [
        {
          value: this.resource.getRecordTitle(this.value),
          id: this.resource.getRecordId(this.value),
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.resource-field-values {
  @apply flex flex-col;
}
.resource-field-values a {
  @apply text-primary-dark hover:underline my-1;
}
</style>


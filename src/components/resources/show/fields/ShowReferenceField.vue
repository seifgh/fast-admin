
<template>
  <div class="resource-field-values">
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
        <show-date-field
          v-if="resourceTitleField.type.isDate"
          :value="value"
          :field="resourceTitleField"
        />
        <show-image-field
          v-else-if="resourceTitleField.type.isImage"
          :value="value"
          :field="resourceTitleField"
        />
        <show-file-field
          v-else-if="resourceTitleField.type.isFile"
          :value="value"
          :field="resourceTitleField"
        />
        <show-boolean-field
          v-else-if="resourceTitleField.type.isBoolean"
          :value="value"
        />
        <show-text-field v-else :value="value" :field="resourceTitleField" />
      </template>
    </router-link>
  </div>
</template>

<script>
import ResourceField from "../../../../resources/classes/ResourceField";
import ShowBooleanField from "./ShowBooleanField.vue";
import ShowDateField from "./ShowDateField.vue";
import ShowFileField from "./ShowFileField.vue";
import ShowImageField from "./ShowImageField.vue";
import ShowTextField from "./ShowTextField.vue";
export default {
  components: {
    ShowTextField,
    ShowDateField,
    ShowImageField,
    ShowFileField,
    ShowBooleanField,
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
  methods: {
    getFieldValueTo(itemId) {
      return `/resources/${this.resource.id}/show/${itemId}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.resource-field-values a {
  @apply text-primary-dark hover:underline;
}
</style>




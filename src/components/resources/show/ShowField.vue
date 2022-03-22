<template>
  <div class="show-field">
    <span class="field-name">{{ field.name }}</span>
    <show-custom-component-field
      v-if="field.type.customComponents.show"
      :value="value"
      :field="field"
    />
    <div
      v-else
      class="field-values"
      :class="{
        'has-counter': hasCounter,
      }"
    >
      <div v-for="(value, i) in values" :key="i">
        <template v-if="value || value === 0 || value === false">
          <show-date-field
            v-if="field.type.isDate"
            :value="value"
            :field="field"
          />
          <show-image-field
            v-else-if="field.type.isImage"
            :value="value"
            :field="field"
          />
          <show-file-field
            v-else-if="field.type.isFile"
            :value="value"
            :field="field"
          />
          <show-boolean-field v-else-if="field.type.isBoolean" :value="value" />
          <show-reference-field
            v-else-if="field.type.isResource && field.type.isReference"
            :value="value"
            :field="field"
          />
          <show-resource-field
            v-else-if="field.type.isResource"
            :value="value"
            :field="field"
          />
          <show-text-field v-else :value="value" :field="field" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceField from "../../../resources/classes/ResourceField";
import ShowBooleanField from "./fields/ShowBooleanField.vue";
import ShowCustomComponentField from "./fields/ShowCustomComponentField.vue";
import ShowDateField from "./fields/ShowDateField.vue";
import ShowFileField from "./fields/ShowFileField.vue";
import ShowImageField from "./fields/ShowImageField.vue";
import ShowReferenceField from "./fields/ShowReferenceField.vue";
import ShowResourceField from "./fields/ShowResourceField.vue";
import ShowTextField from "./fields/ShowTextField.vue";
export default {
  components: {
    ShowTextField,
    ShowDateField,
    ShowImageField,
    ShowFileField,
    ShowBooleanField,
    ShowReferenceField,
    ShowResourceField,
    ShowCustomComponentField,
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
    hasCounter() {
      const { type } = this.field;
      return type.isMultiple;
    },
  },
};
</script>
<style lang="scss" scoped>
.show-field {
  @apply bg-white border rounded-md p-4 mb-4 flex flex-col w-full;
}
.field-name {
  @apply text-xs font-semibold text-gray-500 mb-3;
}
.field-values {
  @apply flex items-center flex-wrap ml-1 w-full;
  &.has-counter {
    @apply flex flex-wrap items-start;
    counter-reset: section;

    & > * {
      @apply relative my-3 pl-8 mr-6;
      & > *::before {
        content: counter(section);
        counter-increment: section;
        @apply absolute top-0 left-0 z-10 
        w-6 h-6 bg-white border rounded-md
       flex items-center justify-center text-primary font-semibold text-xs;
      }
    }
  }
}
</style>

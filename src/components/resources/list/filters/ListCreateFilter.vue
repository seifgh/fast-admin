<template>
  <uil-modal direction="r" :closeBtn="false">
    <template #toggler>
      <uil-button type="txt" class="mr-2">
        <i class="bx bx-filter-alt" /> New filter
      </uil-button>
    </template>
    <template #content>
      <div class="create-filter" anim="fade-right">
        <div class="header">
          <uil-button
            ref="closeBtn"
            class="mr-2 mt-1"
            size="sq-sm"
            role="close"
          >
            <i class="bx bx-chevron-left" role="close"></i>
          </uil-button>
          <div>
            <h3>Create new filter</h3>
            <small
              >Choose a column and filter, set filter value then add it.</small
            >
          </div>
        </div>
        <div class="content">
          <uil-select-input
            label="Column"
            :options="selectFieldOptions"
            v-model="selectedField"
          />
          <div :class="{ 'disable-content': selectedField == null }">
            <template v-if="selectedResourceField">
              <list-choices-filter
                v-if="selectedFieldType.hasChoices"
                :choices="selectedFieldType.choices"
                @addFilter="addFilter"
              />
              <list-boolean-filter
                v-else-if="selectedFieldType.isBoolean"
                @addFilter="addFilter"
              />
              <list-number-filter
                v-else-if="selectedFieldType.isNumber"
                @addFilter="addFilter"
              />
              <list-date-filter
                v-else-if="selectedFieldType.isDate"
                @addFilter="addFilter"
              />
              <list-text-filter
                v-else-if="
                  selectedFieldType.isText || selectedFieldType.isString
                "
                @addFilter="addFilter"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
  </uil-modal>
</template>

<script>
import Resource from "../../../../resources/classes/Resource";
import UilSelectInput from "../../../uil-components/inputs/UilSelectInput.vue";
import UilButton from "../../../uil-components/UilButton.vue";
import UilModal from "../../../uil-components/UilModal.vue";
import ListBooleanFilter from "./ListBooleanFilter.vue";
import ListChoicesFilter from "./ListChoicesFilter.vue";
import ListDateFilter from "./ListDateFilter.vue";
import ListNumberFilter from "./ListNumberFilter.vue";
import ListTextFilter from "./ListTextFilter.vue";

export default {
  components: {
    UilModal,
    UilButton,
    UilSelectInput,
    ListTextFilter,
    ListChoicesFilter,
    ListBooleanFilter,
    ListNumberFilter,
    ListDateFilter,
  },
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
  data() {
    return {
      selectedField: null,
    };
  },
  computed: {
    fields() {
      return this.resource.getFilterFields();
    },
    selectFieldOptions() {
      return this.fields.map((field) => ({
        value: field.id,
        label: field.name,
      }));
    },
    selectedResourceField() {
      return this.fields.find(({ id }) => id == this.selectedField);
    },
    selectedFieldType() {
      return this.selectedResourceField.type;
    },
    filters() {
      try {
        return JSON.parse(this.$route.query.filters);
      } catch (err) {
        return [];
      }
    },
  },
  methods: {
    addFilter(colFilter) {
      this.$router.push({
        query: {
          filters: JSON.stringify([
            ...this.filters.filter(
              // remove old colFilter with same col and filter
              ({ col, filter }) =>
                !(col == this.selectedField && filter == colFilter.filter)
            ),
            {
              col: this.selectedField,
              filter: colFilter.filter,
              value: colFilter.value,
            },
          ]),
        },
      });
      this.selectedField = null;
      this.colseModal();
    },
    colseModal() {
      this.$refs.closeBtn.$el.click();
    },
  },
  created() {
    this.selectedField = this.selectFieldOptions[0].value;
  }
};
</script>

<style lang="scss" scoped>
.create-filter {
  width: 500px;
  max-width: 100%;
  @apply relative block bg-white overflow-y-auto max-h-full;
}
.header {
  @apply border-b p-4 flex sticky top-0 z-50 bg-gray-50;
  small {
    @apply text-sm ml-1;
  }
}

.content {
  @apply block w-full p-4;
}
</style>
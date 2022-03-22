<template>
  <section v-if="queryFilters.length" class="filters">
    <button class="filter-col" v-for="(filter, i) in formatedFilters" :key="i">
      {{ filter.fieldName }}
      <small>
        <span class="filter">
          {{ filter.filterName }}
        </span>
        {{ filter.value }}
      </small>
      <span @click="removeFilter(i)" class="remove-btn">
        <i class="bx bx-minus"></i>
      </span>
    </button>
  </section>
</template>

<script>
import { BOOLEAN_FIELD_LABELS, FILTER_LABELS } from ".";
import Resource from "../../../../resources/classes/Resource";
export default {
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
  computed: {
    /**
     * @returns {{col: string, filter: string, value: string}[]}
     */
    queryFilters() {
      try {
        return JSON.parse(this.$route.query.filters);
      } catch (err) {
        return [];
      }
    },
    formatedFilters() {
      return this.queryFilters.map(({ col, filter, value }) => {
        const field = this.resource.getFieldById(col);
        if (field.type.hasChoices) {
          value = field.type.getChoiceByValue(value).label;
        } else if (field.type.isBoolean) {
          value = BOOLEAN_FIELD_LABELS[value];
        }
        return {
          fieldName: field.name,
          filterName: FILTER_LABELS[filter],
          value,
        };
      });
    },
  },
  methods: {
    removeFilter(index) {
      this.$router.push({
        query: {
          filters: JSON.stringify(
            this.queryFilters.filter((_, i) => i != index)
          ),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  @apply flex items-center flex-wrap w-full mb-2;
}
.filter-col {
  @apply relative mr-2 mb-2 p-2 border bg-white rounded-md text-sm 
  font-semibold text-gray-700;
  &:hover .remove-btn {
    @apply scale-100;
  }
}
small {
  @apply ml-1 text-xs text-gray-500;
  span {
    @apply text-primary;
  }
}
.remove-btn {
  @apply w-5 h-5 font-bold flex items-center justify-center rounded-full
  absolute right-0 top-0 -mx-2 -mt-2 bg-danger text-white shadow-md
  transform scale-0 transition-transform;
}
</style>
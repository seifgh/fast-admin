<template>
  <div>
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th v-if="hasCheckbox">
              <uil-check-box :value="checkAll" @input="toggleCheckAll" />
            </th>
            <th v-for="(col, i) in cols" :key="i" @click="setSortBy(col)">
              <span>
                {{ col.name }}
                <span
                  class="sort-col"
                  v-if="col.sort && col.id == sortBy.colId"
                >
                  <i
                    v-if="sortBy.direction == -1"
                    class="bx bxs-down-arrow-alt"
                  ></i>
                  <i
                    v-if="sortBy.direction == 1"
                    class="bx bxs-up-arrow-alt"
                  ></i>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
    <div v-if="maxPages > 1" class="pagination">
      <small
        >{{ currentPageNumber }} of {{ maxPages }}
        pages
        <span v-if="totalCount">| {{ totalCount }} Items found </span>
      </small>
      <div class="flex items-center">
        <uil-button
          class="mr-2"
          size="sq-sm"
          :disabled="!hasPreviousPage"
          @click="$emit('getPreviousPage')"
        >
          <i class="bx bx-chevron-left"></i>
        </uil-button>

        <uil-button
          size="sq-sm"
          :disabled="!hasNextPage"
          @click="$emit('getNextPage')"
        >
          <i class="bx bx-chevron-right"></i>
        </uil-button>
      </div>
    </div>
  </div>
</template>


<script>
import UilCheckBox from "./inputs/UilCheckBox.vue";
import UilButton from "./UilButton.vue";
export default {
  components: { UilButton, UilCheckBox },
  props: {
    cols: {
      required: true,
      type: Array,
    },
    maxPages: {
      type: Number,
      default: 1,
    },
    currentPageNumber: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
    },
    checkbox: undefined,
    checkAll: {
      type: Boolean,
      default: false,
    },
    sortBy: Object,
  },
  computed: {
    hasCheckbox() {
      return this.checkbox || this.checkbox != undefined;
    },
    hasNextPage() {
      return this.currentPageNumber < this.maxPages;
    },

    hasPreviousPage() {
      return this.currentPageNumber > 1;
    },
  },
  methods: {
    toggleCheckAll() {
      this.$emit("toggleCheckAll");
    },
    setSortBy(col) {
      if (col.sort) {
        if (col.id == this.sortBy.colId) {
          this.$emit("setSortBy", col.id, -this.sortBy.direction);
        } else {
          this.$emit("setSortBy", col.id);
        }
      }
    },
  },
};
</script>

<style lang="scss" >
.data-table {
  @apply relative block w-full overflow-auto rounded-md border;
  & > table {
    @apply table-auto bg-white w-full shadow;
    thead {
      @apply bg-gray-50;
    }

    th {
      @apply cursor-pointer;
      i {
        @apply text-base;
      }
    }

    tbody > tr > th,
    thead > tr > th,
    tbody > tr > td {
      @apply px-4 py-5 text-left text-sm;
    }
    thead > tr > th {
      @apply text-gray-800 py-4;
      & > span {
        @apply flex w-max items-center;
      }
    }
    tbody > tr > td {
      @apply select-text text-gray-700  font-normal;

      > * {
        @apply select-text;
      }
    }
    tbody > tr > td,
    thead > tr > th {
      min-width: 150px;
      width: 150px;
      &:first-child,
      &:last-child {
        min-width: 25px;
        width: 25px;
      }
    }
    thead {
      @apply border-b;
    }
    thead > tr,
    tbody > tr {
      @apply border-b;
      &:last-child {
        @apply border-0;
      }
    }
  }
}
.pagination {
  @apply flex mt-4 items-center justify-between w-full;
  small {
    @apply font-semibold text-gray-600;
  }
}
</style>
<template>
  <section ref="dataTable" class="data-container">
    <transition name="fade-down">
      <list-bulk-actions
        v-if="selected.length"
        :resource="resource"
        :selectedRecords="selected"
      />
    </transition>
    <list-table-filters :resource="resource" />
    <uil-data-table
      v-if="list.data.length"
      checkbox
      :sortBy="sortBy"
      @setSortBy="setSortBy"
      :checkAll="allChecked"
      @toggleCheckAll="toggleCheckAll"
      :cols="fields"
      :maxPages="list.pages"
      :currentPageNumber="currentPage"
      @getPreviousPage="getPreviousPage"
      @getNextPage="getNextPage"
    >
      <tr
        :key="i"
        v-for="(cols, i) in formatedData"
        @click="
          $router.push({
            name: 'Show',
            params: {
              itemId: getListItemId(i),
            },
          })
        "
        :class="{ checked: isChecked(i) }"
      >
        <td>
          <uil-check-box :value="isChecked(i)" @input="toggleCheckItem(i)" />
        </td>
        <list-data-table-col
          v-for="(col, i) in cols"
          :key="i"
          :value="col.value"
          :field="col.field"
        />
        <list-data-table-actions-col
          :itemId="getListItemId(i)"
          :resource="resource"
        />
      </tr>
    </uil-data-table>
    <unexpected-error v-if="unexpectedError" />
    <list-empty v-else-if="listIsEmpty" />
  </section>
</template>

<script>
import Resource from "../../../resources/classes/Resource";
import ListDataTableCol from "./ListDataTableCol.vue";
import ListDataTableActionsCol from "./ListDataTableActionsCol.vue";
import ListBulkActions from "./ListBulkActions.vue";
import ListEmpty from "./ListEmpty.vue";
import UnexpectedError from "../../shared/UnexpectedError.vue";
import UilDataTable from "../../uil-components/UilDataTable.vue";
import UilCheckBox from "../../uil-components/inputs/UilCheckBox.vue";
import ListTableFilters from "./filters/ListTableFilters.vue";

const initData = () => ({
  allCheck: false,
  selected: [],
  list: {
    data: [],
    page: 1,
    pages: 0,
    total: 0,
  },
  unexpectedError: false,
  isLoading: false,
});
export default {
  components: {
    ListDataTableCol,
    ListDataTableActionsCol,
    ListBulkActions,
    ListEmpty,
    UnexpectedError,
    UilDataTable,
    UilCheckBox,
    ListTableFilters,
  },
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
  data() {
    return initData();
  },
  computed: {
    fields() {
      return [
        ...this.resource.getListFields().map((field) => ({
          id: field.id,
          name: field.name,
          sort: field.sort,
        })),
        {
          id: "actions",
          name: "Actions",
          sort: false,
        },
      ];
    },

    formatedData() {
      return this.resource.getFormatedListData(this.list.data);
    },
    allChecked() {
      return this.selected.length == this.list.data.length;
    },
    sortBy() {
      const defautlSortBy = this.resource.defaultSortBy;
      const { sortByColId, sortByDirection } = this.$route.query;
      return {
        colId: sortByColId || defautlSortBy.colId,
        direction: Number.parseInt(sortByDirection) || defautlSortBy.direction,
      };
    },
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },
    listIsEmpty() {
      return !this.list.pages && !this.isLoading;
    },
    filters() {
      const { filters } = this.$route.query;
      try {
        return JSON.parse(filters);
      } catch (err) {
        return [];
      }
    },
  },
  methods: {
    getListItemId(index) {
      const item = this.list.data[index];
      return this.resource.getRecordId(item);
    },
    async fetchList() {
      this.handleBeforeFetchActions();
      try {
        const list = await this.resource.getList({
          page: this.currentPage,
          limit: 6,
          sortBy: this.sortBy,
          filters: this.filters,
        });
        this.list = list;
      } catch (err) {
        this.handleApiFetchErrors(err);
      }
      this.handleAfterFetchActions();
    },
    handleBeforeFetchActions() {
      this.selected = [];
      this.unexpectedError = false;
      this.isLoading = true;
      this.$startLoading({ id: "home" });
    },
    handleAfterFetchActions() {
      this.$closeLoading();
      this.isLoading = false;
    },
    handleApiFetchErrors(err) {
      this.unexpectedError = true;
      this.$notify({ messageRef: "UNEXPECTED_ERROR" });
      console.log(err);
    },
    isChecked(itemIndex) {
      return this.selected.includes(this.list.data[itemIndex]);
    },
    toggleCheckItem(itemIndex) {
      const itemToToggle = this.list.data[itemIndex];

      if (this.isChecked(itemIndex)) {
        this.selected = this.selected.filter((item) => item != itemToToggle);
      } else {
        this.selected.push(itemToToggle);
      }
    },
    getPreviousPage() {
      this.updateUrlQuery(this.currentPage - 1, this.sortBy);
    },
    getNextPage() {
      this.updateUrlQuery(this.currentPage + 1, this.sortBy);
    },
    toggleCheckAll() {
      if (this.allChecked) {
        this.selected = [];
      } else {
        this.selected = this.list.data;
      }
    },
    setSortBy(colId, direction = 1) {
      this.updateUrlQuery(this.currentPage, {
        colId,
        direction,
      });
    },
    updateUrlQuery(page, sortBy) {
      this.$router.push({
        query: {
          page: page,
          sortByColId: sortBy.colId,
          sortByDirection: sortBy.direction,
          filters: this.$route.query.filters || [],
        },
      });
    },
  },
  mounted() {
    // this.setDataFromUrlQuery();
    // this.updateUrlQuery();
    this.fetchList();
  },
  watch: {
    "$route.params.resourceId"() {
      Object.assign(this.$data, initData(this.resource.defaultSortBy));
    },
    "$route.query"() {
      this.fetchList();
    },
  },
};
</script>

<style lang="scss" scoped>
.data-container {
  @apply p-2 bg-transparent;
  @screen md {
    @apply p-4;
  }
}
tr {
  @apply cursor-pointer;
  &:hover,
  &.checked {
    background: rgb(251, 251, 251);
  }
}

.pagination {
  @apply mt-4 flex items-center justify-center pt-4;
  & > small {
    @apply block p-2 font-semibold text-gray-500;
  }
}
</style>
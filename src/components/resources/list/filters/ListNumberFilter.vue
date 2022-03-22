<template>
  <form @submit.prevent="handleSubmit">
    <uil-select-input
      label="Filter"
      :options="filterOptions"
      v-model="selectedFilter"
    />
    <uil-text-input
      :class="{ 'has-err': $v.filterValue.$error && submited }"
      :label="selectFilterLabel"
      type="number"
      placeholder="Please enter your filter value"
      v-model="filterValue"
    >
      <template v-if="$v.filterValue.$error && submited">
        <small class="err" v-if="!$v.filterValue.required"
          >This field is required</small
        >
      </template>
    </uil-text-input>
    <uil-button class="mt-2" type="cl" size="md">
      <i class="bx bx-plus" />
      Add filter</uil-button
    >
  </form>
</template>

<script>
import UilSelectInput from "../../../uil-components/inputs/UilSelectInput.vue";
import UilTextInput from "../../../uil-components/inputs/UilTextInput.vue";
import UilButton from "../../../uil-components/UilButton.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { FILTER_LABELS } from ".";
const FILTER_OPTIONS = [
  { value: "eq", label: FILTER_LABELS["eq"] },
  { value: "lt", label: FILTER_LABELS["lt"] },
  { value: "gt", label: FILTER_LABELS["gt"] },
  { value: "lte", label: FILTER_LABELS["lte"] },
  { value: "gte", label: FILTER_LABELS["gte"] },
];
export default {
  components: { UilSelectInput, UilTextInput, UilButton },
  mixins: [validationMixin],
  data: () => ({
    selectedFilter: FILTER_OPTIONS[0].value,
    filterValue: "",
    submited: false,
  }),
  validations: {
    filterValue: { required },
  },
  computed: {
    filterOptions() {
      return FILTER_OPTIONS;
    },
    selectFilterLabel() {
      return this.filterOptions.find(
        ({ value }) => value == this.selectedFilter
      ).label;
    },
  },
  methods: {
    handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("addFilter", {
          filter: this.selectedFilter,
          value: this.filterValue,
        });
      }
    },
  },
};
</script>

<style>
</style>
<template>
  <form @submit.prevent="handleSubmit">
    <uil-select-input
      :class="{ 'has-err': $v.filterValue.$error && submited }"
      label="Equal to"
      :options="choices"
      v-model="filterValue"
    >
      <template v-if="$v.filterValue.$error && submited">
        <small class="err" v-if="!$v.filterValue.required"
          >This field is required</small
        >
      </template>
    </uil-select-input>
    <uil-button class="mt-2" type="cl" size="md">
      <i class="bx bx-plus" />
      Add filter</uil-button
    >
  </form>
</template>

<script>
import UilSelectInput from "../../../uil-components/inputs/UilSelectInput.vue";
import UilButton from "../../../uil-components/UilButton.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  components: { UilSelectInput, UilButton },
  mixins: [validationMixin],
  props: {
    choices: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    filterValue: "",
    submited: false,
  }),
  validations: {
    filterValue: { required },
  },
  methods: {
    handleSubmit() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("addFilter", {
          filter: "eq",
          value: this.filterValue,
        });
      }
    },
  },
};
</script>

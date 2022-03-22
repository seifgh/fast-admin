<template>
  <section class="display-record">
    <div v-if="!isLoading && !unexpectedError" class="record">
      <show-field
        v-for="(item, i) in formatedRecordData"
        :value="item.value"
        :field="item.field"
        :key="i"
      />
    </div>
    <unexpected-error v-if="unexpectedError" />
  </section>
</template>

<script>
import Resource from "../../../resources/classes/Resource";
import UnexpectedError from "../../shared/UnexpectedError.vue";
import ShowField from "./ShowField.vue";
export default {
  components: { UnexpectedError, ShowField },
  props: {
    resource: {
      type: Resource,
      required: true,
    },
  },
  data() {
    return {
      record: {},
      unexpectedError: false,
      isLoading: false,
    };
  },
  computed: {
    formatedRecordData() {
      return this.resource.getFormatedRecordData(this.record);
    },
  },
  methods: {
    async fetchRecord() {
      this.isLoading = true;
      this.unexpectedError = false;
      this.$startLoading({ id: "home" });
      try {
        this.record = (
          await this.resource.getItem(this.$route.params.itemId)
        ).data;
      } catch (err) {
        console.log(err);
        this.unexpectedError = true;
        this.$notify({ messageRef: "UNEXPECTED_ERROR" });
      }
      this.isLoading = false;
      this.$closeLoading();
    },
  },
  mounted() {
    this.fetchRecord();
  },
  watch: {
    "$route.params.itemId"() {
      this.fetchRecord();
    },
  },
};
</script>

<style lang="scss" scoped>
.record {
  @apply p-4;
}
</style>
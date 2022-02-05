import Resource from "../../resources/classes/Resource";

/**
 * @type {import("vue").ComponentOptions}
 */
const resourceMixin = {
  computed: {
    resource() {
      return Resource.getResourceById(this.$route.params.resourceId);
    },
  },
};
export default resourceMixin;

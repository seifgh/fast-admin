import ResourcesGroup from "./classes/ResourcesGroup";

export const resourcesGroups = {
  CUSTOMERS: new ResourcesGroup({
    id: "customers",
    name: "Customers",
    icon: "bx-purchase-tag-alt",
  }),
};
export const resourcesGroupsAsArray = Object.values(resourcesGroups);

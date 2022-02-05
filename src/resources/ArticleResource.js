import ResourceField, { ResourceFieldType } from "./classes/ResourceField";
import { resourcesGroups } from "./groups";
import Resource from "./classes/Resource";

export default new Resource({
  id: "articles",
  name: "Articles",
  icon: "bx-spreadsheet",
  group: resourcesGroups.CUSTOMERS,
  primaryKeyFieldId: "_id",
  defaultSortBy: {
    colId: "published",
    direction: -1,
  },
  fields: [
    new ResourceField({
      id: "_id",
      name: "ID",
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "title",
      name: "Title",
      isRequired: true,
      isTitle: true,
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "content",
      name: "Content",
      isRequired: true,
      type: new ResourceFieldType({
        type: ResourceFieldType.types.TEXT,
        valueFormater: (v) => v.slice(0, 100) + "...",
      }),
    }),
    new ResourceField({
      id: "published",
      name: "Published",
      type: new ResourceFieldType({ type: ResourceFieldType.types.DATE }),
    }),
    new ResourceField({
      id: "showAtHome",
      name: "Show at home",
      type: new ResourceFieldType({ type: ResourceFieldType.types.BOOLEAN }),
    }),
  ],
});

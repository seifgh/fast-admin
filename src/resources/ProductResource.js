import ResourceField, { ResourceFieldType } from "./classes/ResourceField";
import Resource from "./classes/Resource";

export default new Resource({
  id: "products",
  name: "Products",
  icon: "bx-basket",
  primaryKeyFieldId: "_id",
  fields: [
    new ResourceField({
      id: "_id",
      name: "ID",
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "name",
      name: "Name",
      isRequired: true,
      isTitle: true,
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "price",
      name: "Price",
      isRequired: true,
      type: new ResourceFieldType({ type: ResourceFieldType.types.NUMBER }),
    }),
  ],
});

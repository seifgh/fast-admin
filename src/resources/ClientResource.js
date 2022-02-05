import ResourceField, { ResourceFieldType } from "./classes/ResourceField";
import { resourcesGroups } from "./groups";
import Resource from "./classes/Resource";

export default new Resource({
  id: "clients",
  name: "Clients",
  icon: "bx-group",
  primaryKeyFieldId: "_id",
  group: resourcesGroups.CUSTOMERS,
  fields: [
    new ResourceField({
      id: "_id",
      name: "ID",
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "profileImage",
      name: "Profile image",
      type: new ResourceFieldType({
        type: ResourceFieldType.types.IMAGE,
        fileUrlGetter: (profileImage) => profileImage.url,
      }),
      sort: false,
    }),
    new ResourceField({
      id: "firstName",
      name: "First name",
      isRequired: true,
      isTitle: true,
      type: new ResourceFieldType({
        type: ResourceFieldType.types.STRING,
        valueFormater: (v) => v.toUpperCase(),
      }),
    }),
    new ResourceField({
      id: "lastName",
      name: "Last name",
      isRequired: true,
      type: new ResourceFieldType({ type: ResourceFieldType.types.STRING }),
    }),
    new ResourceField({
      id: "gender",
      name: "Gender",
      isRequired: true,
      type: new ResourceFieldType({
        type: ResourceFieldType.types.STRING,
        choices: [
          { value: "m", label: "Man", className: "choice-m" },
          { value: "f", label: "Female", className: "choice-w" },
        ],
      }),
      sort: false,
    }),
    new ResourceField({
      id: "isMarried",
      name: "Married",
      isRequired: true,
      type: new ResourceFieldType({
        type: ResourceFieldType.types.BOOLEAN,
      }),
      sort: false,
    }),
    new ResourceField({
      id: "birth",
      name: "Birth",
      type: new ResourceFieldType({ type: ResourceFieldType.types.DATE }),
    }),
    new ResourceField({
      id: "files",
      name: "Files",
      type: new ResourceFieldType({
        type: ResourceFieldType.types.FILE,
        fileUrlGetter: (file) => file.url,
        isMultiple: true,
      }),
      sort: false,
    }),
  ],
});

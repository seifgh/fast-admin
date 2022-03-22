import ResourceField, { ResourceFieldType } from "./classes/ResourceField";
import { resourcesGroups } from "./groups";
import Resource from "./classes/Resource";
import ClientResource from "./ClientResource";

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
      display: {
        show: true,
      },
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
        valueFormater: {
          show: (v) => v.slice(0, 200) + "...",
        },
        customComponents: {
          list: () => import("./../components/custom/ArticleContentCol.vue"),
        },
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
    new ResourceField({
      id: "views",
      name: "Views",

      type: new ResourceFieldType({
        type: ResourceFieldType.types.NUMBER,
        customComponents: {
          show: () => import("./../components/custom/ArticleViewsShow.vue"),
        },
      }),
    }),
    new ResourceField({
      display: {
        list: true,
        show: true,
        edit: true,
      },
      id: "publishedBy",
      name: "Published by",
      type: new ResourceFieldType({
        isMultiple: true,
        type: ResourceFieldType.types.RESOURCE,
        resource: ClientResource,
        isReference: true,
      }),
    }),
    new ResourceField({
      id: "likes",
      name: "Liked by",
      type: new ResourceFieldType({
        isMultiple: true,
        type: ResourceFieldType.types.RESOURCE,
        customComponents: {
          list: () => import("./../components/custom/ArticleLikesCol.vue"),
        },
        resource: new Resource({
          id: "like",
          fields: [
            new ResourceField({
              id: "fullName",
              name: "Full name",
              type: new ResourceFieldType({
                type: ResourceFieldType.types.STRING,
              }),
            }),
            new ResourceField({
              id: "email",
              name: "Email",
              isTitle: true,
              type: new ResourceFieldType({
                type: ResourceFieldType.types.STRING,
                valueFormater: {
                  list: (v) => v.slice(0, 15) + "...",
                  show: (v) => v.slice(0, 15) + "...",
                },
              }),
            }),
          ],
        }),
      }),
    }),
  ],
});

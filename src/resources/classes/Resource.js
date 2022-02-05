import apiClient from "../../api-client";
import resources from "./../index";
export default class Resource {
  /**
   * @param {Object} resource
   * @param {string} resource.id
   * @param {string?} resource.name
   * @param {string?} resource.icon
   * @param {import("./ResourcesGroup").default?} resource.group
   * @param {import("./ResourceField").default[]} resource.fields
   * @param {string} resource.primaryKeyFieldName
   * @param {{colId: string?, direction: 1 | -1}} resource.defaultSortBy
   */
  constructor({
    id,
    name = null,
    icon = null,
    group = null,
    fields,
    primaryKeyFieldId = "id",
    defaultSortBy = {
      colId: null,
      direction: 1,
    },
  }) {
    this.resourceId = id;
    this.name = name || id;
    this.icon = icon;
    this.group = group;
    this.fields = fields;
    this.primaryKeyFieldId = primaryKeyFieldId;
    if (defaultSortBy.colId == null) defaultSortBy.colId = primaryKeyFieldId;
    this.defaultSortBy = defaultSortBy;
  }
  /**
   * @param {string} fieldId
   */
  getFieldById(fieldId) {
    return this.fields.find(({ id }) => id == fieldId);
  }
  getListFields() {
    return this.fields.filter((field) => field.display.list);
  }
  /**
   *
   * @param {{}} item
   * @param {import("./ResourceField").default[]} listFields
   * @returns {{value: any, field: import("./ResourceField").default}[]}
   */
  formatListItem(item, listFields) {
    return listFields.map((field) => ({
      value: item[field.id],
      field,
    }));
  }

  /**
   *
   * @param {Array<{}>} dataList
   * @returns {{value: any, field: import("./ResourceField").default}[][]}
   */
  getFormatedListData(dataList) {
    const listFields = this.getListFields();
    return dataList.map((item) => this.formatListItem(item, listFields));
  }
  /**
   *
   * @param {{}} item
   * @returns {string | number}
   */
  getListDataItemId(item) {
    return item[this.primaryKeyFieldId];
  }

  // Admin api requests
  /**
   * @param {Object} args
   * @param {number} args.page
   * @param {number} args.limit
   * @param {{colId: string, direction: 1 | -1}} args.sortBy
   * @param {Object} args.filters
   * @returns {Promise<Object>}
   */
  async getList({ page = 1, limit = 10, sortBy = null, filters = {} }) {
    const url = `${this.resourceId}/get-list`;
    sortBy = sortBy || this.defaultSortBy;
    const response = await apiClient.get(url, {
      params: {
        page,
        limit,
        sortBy,
        filters,
      },
    });
    return response.data;
  }
  /**
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async getItem(id) {
    const url = `${this.resourceId}/get/${id}`;
    const response = await apiClient.get(url);
    return response;
  }
  /**
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async createItem(data) {
    const url = `${this.resourceId}/create`;
    const response = await apiClient.post(url, data);
    return response;
  }
  /**
   * @param {string|number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateItem(id, data) {
    const url = `${this.resourceId}/update/${id}`;
    const response = await apiClient.put(url, data);
    return response;
  }
  /**
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  async deleteItem(id) {
    const url = `${this.resourceId}/delete/${id}`;
    const response = await apiClient.delete(url);
    return response;
  }
  /**
   * @param {Array<string|number>} ids
   * @returns {Promise<Object>}
   */
  async bulkDelete(ids) {
    const url = `${this.resourceId}/bulk-delete`;
    const response = await apiClient.post(url, {
      ids,
    });
    return response;
  }

  // static methods
  /**
   *
   * @param {string} id
   * @returns {Resource}
   */
  static getResourceById(id) {
    return resources.find(({ resourceId }) => resourceId == id);
  }
}

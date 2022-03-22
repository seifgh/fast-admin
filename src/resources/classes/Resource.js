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
   * @param {import("./ResourceAction").default[]} resource.recordActions
   * @param {import("./ResourceAction").default[]} resource.bulkActions
   */
  constructor({
    id,
    name = null,
    icon = null,
    group = null,
    fields = [],
    primaryKeyFieldId = "id",
    defaultSortBy = {
      colId: null,
      direction: 1,
    },
    recordActions = [],
    bulkActions = [],
  }) {
    this.resourceId = id;
    this.name = name || id;
    this.icon = icon;
    this.group = group;
    this.fields = fields;
    this.primaryKeyFieldId = primaryKeyFieldId;
    if (defaultSortBy.colId == null) defaultSortBy.colId = primaryKeyFieldId;
    this.defaultSortBy = defaultSortBy;
    this.recordActions = recordActions;
    this.bulkActions = bulkActions;
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
  getShowFields() {
    return this.fields.filter((field) => field.display.show);
  }
  getFilterFields() {
    return this.fields.filter(
      (field) =>
        field.filter &&
        !(field.type.isImage || field.type.isFile || field.type.isResource)
    );
  }
  /**
   *
   * @param {{}} record
   * @param {import("./ResourceField").default[]} listFields
   * @returns {{value: any, field: import("./ResourceField").default}[]}
   */
  formatRecordDataItem(record, fields) {
    return fields.map((field) => ({
      value: record[field.id],
      field,
    }));
  }
  getTitleField() {
    return this.fields.find(({ isTitle }) => isTitle);
  }

  /**
   *
   * @param {Array<{}>} records
   * @returns {{value: any, field: import("./ResourceField").default}[][]}
   */
  getFormatedListData(records) {
    const listFields = this.getListFields();
    return records.map((item) => this.formatRecordDataItem(item, listFields));
  }
  /**
   *
   * @param {{}} record
   * @returns {{value: any, field: import("./ResourceField").default}[][]}
   */
  getFormatedRecordData(record) {
    const showFields = this.getShowFields();
    return this.formatRecordDataItem(record, showFields);
  }
  /**
   *
   * @param {{}} record
   * @returns {string | number}
   */
  getRecordId(record) {
    return record[this.primaryKeyFieldId];
  }
  /**
   *
   * @param {{}} record
   * @returns {string | number}
   */
  getRecordTitle(record) {
    return record[this.getTitleField().id];
  }

  // Admin api requests
  /**
   * @param {Object} args
   * @param {number} args.page
   * @param {number} args.limit
   * @param {{colId: string, direction: 1 | -1}} args.sortBy
   * @param {{col:string, filter: string, value: string}[]} args.filters
   * @returns {Promise<Object>}
   */
  async getList({ page = 1, limit = 10, sortBy = null, filters = [] }) {
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

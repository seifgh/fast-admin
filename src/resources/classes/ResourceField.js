export class ResourceFieldType {
  static types = {
    STRING: "string",
    TEXT: "text",
    NUMBER: "number",
    FILE: "file",
    IMAGE: "image",
    RESOURCE: "resource",
    DATE: "date",
    BOOLEAN: "boolean",
  };
  /**
   * @param {Object} resourceFieldType
   * @param {"text" | "boolean" | "string" | "number" | "date" | "file" | "image" | "resource"} resourceFieldType.type
   * @param {boolean?} resourceFieldType.isReference
   * @param {import("./Resource").default?} resourceFieldType.resource
   * @param {Array<{value: string|number, label: string|number, className: string?}>} resourceFieldType.choices
   * @param {boolean?} resourceFieldType.isMultiple
   * @param {{list: function(any): string, show: function(any): string }} valueFormater - Extract the final value from fetched value
   * @param {function(any): string} fileUrlGetter - get file or image url
   * @param {{list: any, show: any }} customComponents - Custom vue components for field type
   */
  constructor({
    type,
    isReference = false,
    resource = null,
    choices = null,
    isMultiple = false,
    valueFormater = { list: null, show: null },
    fileUrlGetter = (v) => v,
    customComponents = { list: null, show: null },
  }) {
    this.type = type;
    this.choices = choices;
    this.isMultiple = isMultiple;
    this.valueFormater = valueFormater;
    this.fileUrlGetter = fileUrlGetter;
    // For RESOURCE type
    this.isReference = isReference;
    this.resource = resource;
    this.customComponents = customComponents;
  }

  get isString() {
    return this.type == ResourceFieldType.types.STRING;
  }
  get isText() {
    return this.type == ResourceFieldType.types.TEXT;
  }
  get isNumber() {
    return this.type == ResourceFieldType.types.NUMBER;
  }
  get isDate() {
    return this.type == ResourceFieldType.types.DATE;
  }
  get isFile() {
    return this.type == ResourceFieldType.types.FILE;
  }
  get isResource() {
    return this.type == ResourceFieldType.types.RESOURCE;
  }
  get isImage() {
    return this.type == ResourceFieldType.types.IMAGE;
  }
  get isBoolean() {
    return this.type == ResourceFieldType.types.BOOLEAN;
  }
  get hasChoices() {
    return this.choices != null;
  }
  /**
   *
   * @param {string | number} value
   * @returns {{value: string|number, label: string|number, className: string?}}
   */
  getChoiceByValue(value) {
    return (
      (this.hasChoices &&
        this.choices.find((choice) => choice.value == value)) || {
        value,
        label: value,
      }
    );
  }
}
export default class ResourceField {
  /**
   * @param {Object} resourceField
   * @param {string} resourceField.id
   * @param {ResourceFieldType} resourceField.type
   * @param {string?} resourceField.name
   * @param {boolean?} resourceField.isRequired
   * @param {{list: boolean, show: boolean, create:boolean, edit: boolean}?} resourceField.display
   * @param {boolean?} resourceField.isTitle
   * @param {boolean?} resourceField.sort
   * @param {boolean?} resourceField.filter
   */
  constructor({
    id,
    type,
    name = null,
    isRequired = false,
    display = {
      list: true,
      show: true,
      create: true,
      edit: true,
    },
    isTitle = false,
    sort = true,
    filter = true,
  }) {
    this.id = id;
    this.type = type;
    this.name = name || id;
    this.isRequired = isRequired;
    this.display = display;
    this.isTitle = isTitle;
    this.sort = sort;
    this.filter = filter;
  }
}

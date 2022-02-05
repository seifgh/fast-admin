export class ResourceFieldType {
  static types = {
    STRING: "string",
    TEXT: "text",
    NUMBER: "number",
    FILE: "file",
    IMAGE: "image",
    REFRENCE: "reference",
    DATE: "date",
    BOOLEAN: "boolean",
  };
  /**
   * @typedef {function(string): string} c
   * @param {Object} resourceFieldType
   * @param {"text" | "boolean" | "string" | "number" | "date" | "file" | "image" | "reference"} resourceFieldType.type
   * @param {Array<{value: string|number, label: string|number, className: string?}>} resourceFieldType.choices
   * @param {string?} resourceFieldType.refResource
   * @param {boolean?} resourceFieldType.isMultiple
   * @param {function(any): string} valueFormater - Extract the final value from fetched value
   * @param {function(any): string} fileUrlGetter - get file or image url
   */
  constructor({
    type,
    choices = null,
    refResourceId = null,
    isMultiple = false,
    valueFormater = null,
    fileUrlGetter = (v) => v,
  }) {
    this.type = type;
    this.choices = choices;
    this.refResourceId = refResourceId;
    this.isMultiple = isMultiple;
    this.valueFormater = valueFormater;
    this.fileUrlGetter = fileUrlGetter;
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
  get isReference() {
    return this.type == ResourceFieldType.types.REFRENCE;
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
  }) {
    this.id = id;
    this.type = type;
    this.name = name || id;
    this.isRequired = isRequired;
    this.display = display;
    this.isTitle = isTitle;
    this.sort = sort;
  }
}

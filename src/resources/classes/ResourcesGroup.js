export default class ResourcesGroup {
  /**
   * @param {object} group
   * @param {string} group.id
   * @param {string} group.name
   * @param {string?} group.icon
   */
  constructor({ id, name, icon }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}

export default class ResourceAction {
  /**
   * @param {Object} action
   * @param {string} action.id
   * @param {string?} action.name
   * @param {string?} action.icon
   * @param {function(number | string | (number | string[])): Promise<any>} action.handler
   */
  constructor({ id, name = null, icon = null, handler }) {
    this.actionId = id;
    this.name = name || id;
    this.icon = icon;
    this.handler = handler;
  }
}

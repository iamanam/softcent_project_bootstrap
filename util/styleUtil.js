/**
 * @export
 * @param {*} property name of css variable name we want to get value of
 * @return {*} return the value of root css variable value
 */
export function getRootCssVariable(property) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

/**
 * @export
 * @param {*} property css variable name that needs to set
 * @param {*} value value of css varibale that will be set
 * @return {*}
 */

export function setRootCssVariable(property, value) {
  return document.documentElement.style.setProperty(property, value);
}

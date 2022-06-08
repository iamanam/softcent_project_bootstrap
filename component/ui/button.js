const VARIANTTPE = ["primary", "dark", "pink"];

/**
 * Button component which will render a button based on variant and type
 *
 * @export
 * @param {String} variant - variant type of the button
 * @param {String} type - Type of button
 * @param {String} children - children of button component,can be anything that can reside inside button
 * @param {Function} onClickHandler -on click handler function for button
 * @param {Boolean} isDisabled - if the button is disabled

 * @return {*}
 */
function Button({ variant, type, children, onClickHandler, isDisabled }) {
  if (!VARIANTTPE.includes(variant))
    throw new Error(`variant ${variant} is not supported !`);
  if (!children) throw new Error(`Button must have a children`);

  return (
    <button
      type="button"
      className={`${variant}-btn${type ? `-${type}` : ""}`}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

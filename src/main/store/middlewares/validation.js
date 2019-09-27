import { MIDDLEWARE_VALIDATE } from "../actions/types";
import { validateField } from "../actions/ValidationActions";

/*
 * Once tha app dispatches the MIDDLEWARE_VALIDATE action this middleware will:
 *  1. Scan for the validation key in global state.
 *  2. If it has any objects it will map over them. Each object has the structure of
 *     "text"(*string*), "validators"(*array*) and "error"(*null* or *string*)
 *  3. Validate based on the text and validators
 *  4. Return boolean
 *  5. If true => continue redux thread.
 *  5. If false return the boolean value.
 *  6. This flag can be used in a submit form action to stop further dispatches if the form is not valid
 */
export default store => next => action => {
  let isValid = true;

  if (!action.type) next(action);
  if (action.type === MIDDLEWARE_VALIDATE) {
    const { dispatch, getState } = store;
    const { validation } = getState();
    const itemsForValidation = Object.keys(validation);

    if (!itemsForValidation.length) return next(action);

    // Validate here
    itemsForValidation.forEach(item => {
      const { label, text, validators } = validation[item];
      const error = dispatch(
        validateField({ text, id: item, label, validators })
      );

      if (error) {
        isValid = false;
      }
    });
  }

  if (!isValid) return isValid;

  return next(action);
};

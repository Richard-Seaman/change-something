import {
  CREATE_FIELD,
  CLEAR_ERROR,
  VALIDATE_FIELD,
  MIDDLEWARE_VALIDATE
} from "./types";
import validatorsCollection from "../../utils/validators";

export const validateField = ({ text, id, label, validators }) => dispatch => {
  const errors = validators
    .map(validator => validatorsCollection[validator](text, label))
    .filter(error => error);
  // Combine errors and add new line after each.
  /* eslint-disable indent */
  const combinedErrors = errors.length
    ? errors.reduce((acc, err) => {
        acc += `${err}\n`;
        return acc;
      }, "")
    : "";
  /* eslint-enable indent */

  dispatch({
    type: VALIDATE_FIELD,
    payload: { id, text, validators, error: combinedErrors }
  });

  return combinedErrors;
};

export const createField = ({ id, label, validators, text = "" }) => dispatch =>
  dispatch({
    type: CREATE_FIELD,
    payload: { id, validators, text, label }
  });

export const clearError = id => dispatch =>
  dispatch({
    type: CLEAR_ERROR,
    payload: { id }
  });

export const validateAllFields = () => dispatch => {
  const isValid = dispatch({ type: MIDDLEWARE_VALIDATE });

  return isValid;
};

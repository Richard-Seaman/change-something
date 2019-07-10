import { VALIDATORS_BY_NAME } from "../constants";

// Validation regexes
export const GLOBAL_STRING_REGEX = new RegExp(/^[a-z0-9]{0,10}$/);
export const NUMBERS_ONLY_REGEX = new RegExp(/^\d+(\.\d+)?$/);
export const EQUATION_INPUT_WHITELIST_REGEX = new RegExp(
  "[^ 0123456789,.()><=+*/-]",
  "g"
);

// Validation for required fields.
export const requiredFieldMessage = label => `${label} is a required field.`;

// We would have all types of validations which would be functions that return an error or null
export default {
  [VALIDATORS_BY_NAME.REQUIRED]: (text, label) =>
    !text ? requiredFieldMessage(label) : "",
  [VALIDATORS_BY_NAME.STRING]: text => {
    let error = "";

    const isValid = GLOBAL_STRING_REGEX.test(text);

    if (!isValid) {
      // Just for testing
      // TODO: Add a rule for all plain strings
      error = "A maximum of 10 characters is allowed";
    }

    return error;
  },
  [VALIDATORS_BY_NAME.NUMBER]: text => {
    let error = "";

    const isValid = NUMBERS_ONLY_REGEX.test(text);

    if (!isValid) {
      error = "Only numbers are allowed.";
    }

    return error;
  }
};

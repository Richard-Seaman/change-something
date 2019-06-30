import * as actionTypes from "./types";

export const setFormData = (objectKey, fieldKey, value) => {
  return {
    type: actionTypes.SET_FORM_DATA,
    payload: {
      objectKey,
      fieldKey,
      value
    }
  };
};

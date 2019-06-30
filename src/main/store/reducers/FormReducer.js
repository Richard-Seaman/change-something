import { SET_FORM_DATA } from "../actions/types";

export const initialState = { pledge: {} };

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      const { objectKey, fieldKey, value } = action.payload;
      const existingObject = state[objectKey] || {};
      const newObject = {
        ...existingObject,
        [fieldKey]: value
      };
      return { ...state, [objectKey]: newObject };
    default:
      return state;
  }
};

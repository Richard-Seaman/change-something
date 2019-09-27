import _ from "lodash";

import { CREATE_FIELD, CLEAR_ERROR, VALIDATE_FIELD } from "../actions/types";

export const initialEntityState = {
  validators: null,
  error: null,
  text: ""
};

export const initialState = {};

export const validationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FIELD: {
      const { id, validators, text, label } = action.payload;

      return {
        ...state,
        [id]: {
          ...initialEntityState,
          validators,
          text,
          label
        }
      };
    }

    case CLEAR_ERROR: {
      const { id } = action.payload;

      return _.omit(state, [id]);
    }

    case VALIDATE_FIELD: {
      const { id, error, text, validators } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          text,
          error,
          validators
        }
      };
    }

    default:
      return state;
  }
};

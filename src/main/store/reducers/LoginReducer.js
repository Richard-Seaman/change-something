import { SHOW_LOGIN, HIDE_LOGIN, CLAIMS_UPDATE } from "../actions/types";

export const initialState = { isOpen: false };

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN:
      return { ...state, isOpen: true };
    case HIDE_LOGIN:
      return { ...state, isOpen: false };
    case CLAIMS_UPDATE:
      return { ...state, claims: action.payload };
    default:
      return state;
  }
};

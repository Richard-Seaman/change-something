import { SHOW_NAV_DRAWER, HIDE_NAV_DRAWER } from "../actions/types";

export const initialState = { isOpen: false };

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NAV_DRAWER:
      return { ...state, isOpen: true };
    case HIDE_NAV_DRAWER:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

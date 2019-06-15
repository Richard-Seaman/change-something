import { SHOW_NAV_DRAWER, HIDE_NAV_DRAWER, SET_TITLE } from "../actions/types";

export const initialState = { isOpen: false, title: "Change Something" };

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NAV_DRAWER:
      return { ...state, isOpen: true };
    case HIDE_NAV_DRAWER:
      return { ...state, isOpen: false };
    case SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

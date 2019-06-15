import * as actionTypes from "./types";

export const showNavDrawer = () => {
  return {
    type: actionTypes.SHOW_NAV_DRAWER
  };
};

export const hideNavDrawer = () => {
  return {
    type: actionTypes.HIDE_NAV_DRAWER
  };
};

export const setTitle = title => {
  return {
    type: actionTypes.SET_TITLE,
    payload: title
  };
};

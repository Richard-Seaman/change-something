import * as actionTypes from "./types";

export const showLogin = () => {
  return {
    type: actionTypes.SHOW_LOGIN
  };
};

export const hideLogin = () => {
  return {
    type: actionTypes.HIDE_LOGIN
  };
};

export const updateClaims = claims => {
  return {
    type: actionTypes.CLAIMS_UPDATE,
    payload: claims
  };
};

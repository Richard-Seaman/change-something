import { createSelector } from "reselect";

/* **** State getters start **** */

export const getFieldError = (state, name) =>
  state.validation[name] ? state.validation[name].error : null;

/* **** State getters end **** */

export const fieldErrorSelector = createSelector(
  getFieldError,
  error => ({ error })
);

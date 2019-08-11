import {
  TOAST_SUCCESS,
  TOAST_ERROR,
  TOAST_WARN,
  TOAST_INFO
} from "../actions/types";

export const initialState = { toasts: null };

export const toastsReducer = (state = initialState, action) => {
  if (action.type === TOAST_WARN) {
    const newToasts = {
      ...state.toasts,
      warning: action.payload.message
    };
    return { ...state, toasts: newToasts };
  } else if (action.type === TOAST_SUCCESS) {
    const newToasts = {
      ...state.toasts,
      success: action.payload.message
    };
    return { ...state, toasts: newToasts };
  } else if (action.type === TOAST_ERROR) {
    const newToasts = {
      ...state.toasts,
      error: action.payload.message
    };
    return { ...state, toasts: newToasts };
  } else if (action.type === TOAST_INFO) {
    const newToasts = {
      ...state.toasts,
      info: action.payload.message
    };
    return { ...state, toasts: newToasts };
  }
  return state;
};

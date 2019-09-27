import * as actionTypes from "./types";
import { toast } from "react-toastify";

const position = toast.POSITION.BOTTOM_RIGHT;

export const toastWarning = message => {
  return dispatch => {
    dispatch({
      type: actionTypes.TOAST_WARN,
      payload: {
        message,
        level: "warning"
      }
    });
    toast.warn(message, { position });
  };
};

export const toastSuccess = message => {
  return dispatch => {
    dispatch({
      type: actionTypes.TOAST_SUCCESS,
      payload: {
        message,
        level: "success"
      }
    });
    toast.success(message, { position });
  };
};

export const toastInfo = message => {
  return dispatch => {
    dispatch({
      type: actionTypes.TOAST_INFO,
      payload: {
        message,
        level: "info"
      }
    });
    toast.info(message, { position });
  };
};

export const toastError = message => {
  return dispatch => {
    dispatch({
      type: actionTypes.TOAST_ERROR,
      payload: {
        message,
        level: "error"
      }
    });
    toast.error(message, { position });
  };
};

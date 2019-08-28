import axios from "axios";

import { MIDDLEWARE_VALIDATE } from "../actions/types";
import { toastError, toastSuccess } from "./ToastActions";

export const sendMail = () => {
  return (dispatch, getState) => {
    // Make sure fields are valid
    if (!dispatch({ type: MIDDLEWARE_VALIDATE })) return;
    const { validation } = getState();
    const name = validation.name.text;
    const email = validation.email.text;
    const message = validation.message.text;
    const data = {
      email,
      name,
      message
    };
    axios
      .post(
        "https://europe-west1-change-something.cloudfunctions.net/submit",
        data
      )
      .then(res => {
        dispatch(toastSuccess("Message sent"));
      })
      .catch(err => {
        console.error(err);
        dispatch(toastError(`Error ${err}`));
      });
  };
};

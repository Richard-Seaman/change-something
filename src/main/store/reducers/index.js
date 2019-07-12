import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { pledgesReducer } from "./PledgesReducer";
import { loginReducer } from "./LoginReducer";
import { navReducer } from "./NavReducer";
import { validationReducer } from "./ValidationReducer";

export const initialState = {};

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  pledges: pledgesReducer,
  login: loginReducer,
  nav: navReducer,
  validation: validationReducer
});

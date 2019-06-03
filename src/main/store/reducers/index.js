import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { pledgesReducer } from "./PledgesReducer";
import { loginReducer } from "./LoginReducer";

export const initialState = {};

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  pledges: pledgesReducer,
  login: loginReducer
});

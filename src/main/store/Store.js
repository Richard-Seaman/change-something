import { createStore, compose, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";
import { initialState, rootReducer } from "./reducers/index";
import { updateClaims } from "./actions/LoginActions";

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.error("Firestore: multiple tabs open, can't persist");
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.error("Firestore: Browser doesn't support persistence");
    }
  });

const enhancers = [
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: "users",
    useFirestoreForProfile: true,
    onAuthStateChanged: async (authData, firebase, dispatch) => {
      if (!authData) {
        dispatch(updateClaims({}));
        return;
      }
      const user = firebase.auth().currentUser;
      const idTokenResult = await user.getIdTokenResult();
      dispatch(updateClaims(idTokenResult.claims));
    }
  })
];

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (
  process.env.NODE_ENV === "development" &&
  typeof reduxDevToolsExtension === "function"
) {
  enhancers.push(reduxDevToolsExtension());
}

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;

import { createStore, compose, applyMiddleware } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';
import { initialState, rootReducer } from './reducers/index';

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

const enhancers = [
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true
  })
];

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (process.env.NODE_ENV === 'development' && typeof reduxDevToolsExtension === 'function') {
  enhancers.push(reduxDevToolsExtension());
}

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;

import * as actionTypes from "./types";
import { collections, storedAs } from "../firebaseConfig";

import firebase from "firebase/app";

export const incrementCounter = (collection, docId, field, number) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const increment = {
      collection,
      docId,
      field,
      number
    };
    firestore
      .collection(collection)
      .doc(docId)
      .update({
        [field]: firebase.firestore.FieldValue.increment(number)
      })
      .then(res => {
        dispatch({
          type: actionTypes.INCREMENT_COUNTER_SUCCESS,
          payload: increment
        });
      })
      .catch(err => {
        console.error("Failed to incremented counter: ", increment, err);
        dispatch({
          type: actionTypes.INCREMENT_COUNTER_FAILED,
          payload: increment
        });
      });
  };
};

export const addCommitment = pledgeId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const userId = state.firebase.auth.uid;
    const userDisplayName = state.firebase.auth.displayName;
    const newCommitment = {
      pledgeId,
      userId,
      userDisplayName
    };
    const myCommitments = state.firestore.ordered[storedAs.myCommitments];
    // First check if commitment already made
    if (
      !myCommitments.some(
        commitment =>
          commitment.userId === userId && commitment.pledgeId === pledgeId
      )
    ) {
      // Ok to add it
      firestore
        .collection(collections.COMMITMENTS)
        .add(newCommitment)
        .then(res => {
          dispatch({
            type: actionTypes.ADD_COMMITMENT_SUCCESS,
            payload: res
          });
          dispatch(
            incrementCounter(collections.PLEDGES, pledgeId, "counter", 1)
          );
        })
        .catch(err => {
          dispatch({
            type: actionTypes.ADD_COMMITMENT_FAILED,
            payload: err
          });
        });
    } else {
      console.error("Failed to add commitment: ", "already exists!");
    }
  };
};

export const deleteCommitment = commitment => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(collections.COMMITMENTS)
      .doc(commitment.id)
      .delete()
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_COMMITMENT_SUCCESS,
          payload: res
        });
        dispatch(
          incrementCounter(
            collections.PLEDGES,
            commitment.pledgeId,
            "counter",
            -1
          )
        );
      })
      .catch(err => {
        dispatch({
          type: actionTypes.DELETE_COMMITMENT_FAILED,
          payload: err
        });
      });
  };
};

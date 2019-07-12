import * as actionTypes from "./types";
import { collections, storedAs } from "../firebaseConfig";
import history from "../../utils/history";
import { paths } from "../../routes/constants";
import { MIDDLEWARE_VALIDATE } from "../actions/types";

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
        [field]: firestore.FieldValue.increment(number)
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
    const myCommitments = state.firestore.ordered[storedAs.MY_COMMITMENTS];
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

export const addPledge = pledge => {
  return (dispatch, getState, { getFirestore }) => {
    // Make sure fields are valid
    if (!dispatch({ type: MIDDLEWARE_VALIDATE })) return;
    const firestore = getFirestore();
    // First check if title already taken
    firestore
      .get({
        collection: collections.PLEDGES,
        where: [["title", "==", pledge.title]],
        storeAs: storedAs.PLEDGES_UNIQUE_CHECK
      })
      .then(snapshot => {
        if (snapshot.size === 0) {
          firestore
            .collection(collections.PLEDGES)
            .add({ ...pledge })
            .then(res => {
              history.push(`/${paths.pledges}/${res.id}`);
              dispatch({
                type: actionTypes.ADD_PLEDGE_SUCCESS,
                payload: res
              });
              console.log(`Added ${pledge.title}`);
            })
            .catch(err => {
              dispatch({
                type: actionTypes.ADD_PLEDGE_FAILED,
                payload: err
              });
              console.log(`Error ${err}`);
            });
        } else {
          console.log(`A pledge already exists with that title`);
        }
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };
};

export const updatePledge = pledge => {
  return (dispatch, getState, { getFirestore }) => {
    // Make sure fields are valid
    if (!dispatch({ type: MIDDLEWARE_VALIDATE })) return;
    const firestore = getFirestore();
    firestore
      .collection(collections.PLEDGES)
      .doc(pledge.id)
      .update(pledge)
      .then(res => {
        dispatch({
          type: actionTypes.UPDATE_PLEDGE_SUCCESS,
          payload: res
        });
        console.log(`Updated ${pledge.title}`);
      })
      .catch(err => {
        dispatch({
          type: actionTypes.UPDATE_PLEDGE_FAILED,
          payload: err
        });
        console.log(`Error ${err}`);
      });
  };
};

export const deletePledge = pledge => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(collections.PLEDGES)
      .doc(pledge.id)
      .delete()
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_PLEDGE_SUCCESS,
          payload: res
        });
        history.push(`/${paths.pledges}`);
        console.log(`Deleted ${pledge.title}`);
      })
      .catch(err => {
        dispatch({
          type: actionTypes.DELETE_PLEDGE_FAILED,
          payload: err
        });
        console.log(`Error ${err}`);
      });
  };
};

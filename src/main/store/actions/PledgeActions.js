import * as actionTypes from "./types";
import { collections } from "../firebaseConfig";

//import firebase from "firebase/app";

export const togglePledge = pledgeId => {
  return {
    type: actionTypes.TOGGLE_PLEDGE,
    payload: pledgeId
  };
};

// export const incrementCounter = (collection, docId, field, number) => {
//   return (dispatch, getState, { getFirestore }) => {
//     const firestore = getFirestore();
//     firestore
//       .collection(collection)
//       .doc(docId)
//       .update({
//         [field]: firebase.firestore.FieldValue.increment(number)
//       })
//       .then(res => {
//         console.log("Incremented counter: ", collection, docId, field, number);
//       })
//       .catch(err => {
//         console.error(
//           "Failed to incremented counter: ",
//           collection,
//           docId,
//           field,
//           number,
//           err
//         );
//       });
//   };
// };

export const addCommitment = pledgeId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const userDisplayName = getState().firebase.auth.displayName;
    const newCommitment = {
      pledgeId,
      userId,
      userDisplayName
    };
    console.log("addCommitment: ", newCommitment);
    // First check if commitment already made
    firestore
      .get({
        collection: collections.COMMITMENTS,
        where: [["userId", "==", userId], ["pledgeId", "==", pledgeId]]
      })
      .then(snapshot => {
        console.log("snapshot: ", snapshot);
        if (snapshot.size === 0) {
          // Ok to add it
          firestore
            .collection(collections.COMMITMENTS)
            .add(newCommitment)
            .then(res => {
              dispatch({
                type: actionTypes.ADD_COMMITMENT_SUCCESS,
                payload: res
              });
              console.log("Added commitment: ", newCommitment);
              // dispatch(
              //   incrementCounter(collections.PLEDGES, pledgeId, "counter", 1)
              // );
            })
            .catch(err => {
              dispatch({
                type: actionTypes.ADD_COMMITMENT_FAILED,
                payload: err
              });
              console.error("Failed to add commitment: ", newCommitment, err);
            });
        } else {
          console.error("Failed to add commitment: ", "already exists!");
        }
      })
      .catch(err => {
        console.error("Failed to check if commitment exists: ", err);
      });
  };
};

export const deleteCommitment = commitment => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log("deleteCommitment: ", commitment);
    firestore
      .collection(collections.COMMITMENTS)
      .doc(commitment.id)
      .delete()
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_COMMITMENT_SUCCESS,
          payload: res
        });
        console.log("Deleted commitment: ", commitment);
      })
      .catch(err => {
        dispatch({
          type: actionTypes.DELETE_COMMITMENT_FAILED,
          payload: err
        });
        console.error("Failed to delete commitment: ", commitment, err);
      });
  };
};

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const region = "europe-west1";

exports.commitmentAdded = functions
  .region(region)
  .firestore.document("commitments/{id}")
  .onCreate(async (snap, context) => {
    const newCommitment = snap.data();
    console.log("newCommitment: ", newCommitment);
    // Increment the counter on the corresponding pledge documnt
    await admin
      .firestore()
      .collection("pledges")
      .doc(newCommitment.pledgeId)
      .update({
        counter: admin.firestore.FieldValue.increment(1)
      });
    return newCommitment;
  });

exports.commitmentDeleted = functions
  .region(region)
  .firestore.document("commitments/{id}")
  .onDelete(async (snap, context) => {
    const deletedCommitment = snap.data();
    console.log("deletedCommitment: ", deletedCommitment);
    // Decrement the counter on the corresponding pledge documnt
    await admin
      .firestore()
      .collection("pledges")
      .doc(deletedCommitment.pledgeId)
      .update({
        counter: admin.firestore.FieldValue.increment(-1)
      });
    return deletedCommitment;
  });

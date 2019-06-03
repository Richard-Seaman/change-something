// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

exports.commitmentAdded = functions.firestore
  .document("commitments/{id}")
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

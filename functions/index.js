// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const region = "europe-west1";

// When deleting a pledge, delete all commitments for that pledge
exports.deletePledge = functions
  .region(region)
  .firestore.document("pledges/{pledgeId}")
  .onDelete((snap, context) => {
    // Get the id of the pledge
    const { pledgeId } = context.params;
    console.log("Delete commitments with pledgeId == ", pledgeId);
    // Delete all committments for that pledge
    admin
      .firestore()
      .collection("commitments")
      .where("pledgeId", "==", pledgeId)
      .get()
      .then(querySnapshot => {
        // Once we get the results, begin a batch
        var batch = admin.firestore().batch();
        querySnapshot.forEach(doc => {
          // For each doc, add a delete operation to the batch
          console.log("Added doc to batch delete: ", doc);
          batch.delete(doc.ref);
        });
        // Commit the batch
        return batch.commit();
      })
      .then(() => {
        console.log("Batch delete complete!");
        return;
      })
      .catch(err => {
        console.error("Something went wrong: ", err);
      });
  });

// exports.commitmentAdded = functions
//   .region(region)
//   .firestore.document("commitments/{id}")
//   .onCreate(async (snap, context) => {
//     const newCommitment = snap.data();
//     console.log("newCommitment: ", newCommitment);
//     // Increment the counter on the corresponding pledge documnt
//     await admin
//       .firestore()
//       .collection("pledges")
//       .doc(newCommitment.pledgeId)
//       .update({
//         counter: admin.firestore.FieldValue.increment(1)
//       });
//     return newCommitment;
//   });

// exports.commitmentDeleted = functions
//   .region(region)
//   .firestore.document("commitments/{id}")
//   .onDelete(async (snap, context) => {
//     const deletedCommitment = snap.data();
//     console.log("deletedCommitment: ", deletedCommitment);
//     // Decrement the counter on the corresponding pledge documnt
//     await admin
//       .firestore()
//       .collection("pledges")
//       .doc(deletedCommitment.pledgeId)
//       .update({
//         counter: admin.firestore.FieldValue.increment(-1)
//       });
//     return deletedCommitment;
//   });

// https://pantaley.com/blog/How-to-integrate-Serverless-contact-form-using-Firebase-Cloud-functions-in-React/
//const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransportGmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.gmail = functions.region(region).https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return;
    }

    const mailOptions = {
      from: req.body.email,
      replyTo: req.body.email,
      to: gmailEmail,
      cc: req.body.email,
      subject: `Change Something - ${req.body.name}`,
      text: req.body.message,
      html: `<p>${req.body.message}</p>`
    };

    mailTransportGmail.sendMail(mailOptions);

    res.status(200).end();
    // or you can pass data to indicate success.
    // res.status(200).send({isEmailSend: true});
  });
});

const reg365Email = functions.config().reg365.email;
const reg365Password = functions.config().reg365.password;
const mailTransportReg365 = nodemailer.createTransport({
  host: "smtp.reg365.net",
  port: 25,
  secure: false,
  auth: {
    user: reg365Email,
    pass: reg365Password
  }
});
exports.mailReg365 = functions.region(region).https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return;
    }

    const mailOptions = {
      from: req.body.email,
      replyTo: req.body.email,
      to: reg365Email,
      cc: req.body.email,
      subject: `Change Something - ${req.body.name}`,
      text: req.body.message,
      html: `<p>${req.body.message}</p>`
    };

    mailTransportReg365.sendMail(mailOptions);

    res.status(200).end();
    // or you can pass data to indicate success.
    // res.status(200).send({isEmailSend: true});
  });
});

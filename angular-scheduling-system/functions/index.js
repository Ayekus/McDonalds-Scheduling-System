const functions = require('firebase-functions');
const admins = require('firebase-admin');

admins.initializeApp();

const sgMail = require('@sendgrid/mail');
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = 'd-6648d3a660f94ad696117f605032cf85';

sgMail.setApiKey(API_KEY);

exports.sendEmailMessage = functions.firestore
  .document('contactCollection/{docId}')
  .onCreate(async (change, context) => {
    const data = change.data() || {};

    functions.logger.log(data);

    const msg = {
      to: data.to,
      from: 'aekus.trehan@gmail.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        subject: 'Employees needed',
        shiftDate: data.shiftDate,
        shiftTime: data.shiftTime,
        shiftType: data.shiftType,
      },
    };

    functions.logger.log(msg);

    sgMail.send(msg);

    return { success: true };
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

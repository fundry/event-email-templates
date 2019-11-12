require('dotenv').config();
var api_key = process.env.MAILGUN_API;
var domain = process.env.MAILGUN_SANDBOX;
const nodemailer = require('nodemailer');

const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;

exports.emailVerification = function(req, _res) {
  let sender = process.env.SENDER;
  let reciever = req.query.email;
  let account_type = req.query.account_type;

  console.log(username);
  console.log(password);
  console.log(reciever, account_type); // test with postman

  var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  });

  transport.sendMail(
    {
      from: sender,
      to: reciever,
      subject: ' Verify Email Address',
      text: 'Verify your registered mail for you workspace',
      html: { path: 'dist/welcome.template.html' },
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('message sent');
      }
      transport.close();
    }
  );
};

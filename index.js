require('dotenv').config();
var api_key = process.env.MAILGUN_API;
var domain = process.env.MAILGUN_SANDBOX;
const nodemailer = require('nodemailer');

const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;

exports.Emailer = function(req, _res) {
  let sender = process.env.SENDER;
  let reciever = req.query.email;
  let account_type = req.query.account_type;
  let token = req.query.token
  let account_name = req.account_name

  console.table([username , password , reciever , account_type , token]);

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
      text: `Verify your registered mail for your ${account_name} ${account_type}`,
      html: { path: 'dist/organizations.template.html' },
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

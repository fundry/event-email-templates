require('dotenv').config();
var api_key = process.env.MAILGUN_API;
var domain = process.env.MAILGUN_SANDBOX;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const nodemailer = require('nodemailer');

exports.emailVerification = function(req, _res) {
  let sender = process.env.SENDER;
  let reciever = req.query.email;
  let account_type = req.query.account_type;

  console.log(api_key, domain);
  console.log(reciever, account_type); // try testing with postman if it doesnt work with CURL

  var transport = nodemailer.createTransport({
    host: domain,
    port: 587,
    secure: false,
    tls: { ciphers: 'SSLv3' },
    auth: {
      user: api_key,
      pass: '<Mailgun SMTP password>',
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
    (error) => {
      console.log(error);
    }
  );

  /*
  var data = {
    from: sender,
    to: reciever,
    subject: 'Verify Email for ' + account_type + 'Remotify Account',
    text: 'Testing some Mailgun awesomeness!',
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
    if (error) {
      console.log(error);
    }
  }); */
};

//recieve and send welcome email to users
require('@google/cloud-debug');

var api_key = 'XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

exports.emailVerification = function(req, _res) {
  let sender = 'vickywane@gmail.com';
  let reciever = req.query.email;

  let account_type = req.query.account_type;

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
  });
};

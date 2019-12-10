require('dotenv').config();
var api_key = process.env.MAILGUN_API;
var domain = process.env.MAILGUN_SANDBOX;
const nodemailer = require('nodemailer');

const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;

exports.Emailer = function(req, res) {
  let sender = process.env.SENDER;
  let reciever = req.query.email;
  let type = req.query.type;
  let token = req.query.token;
  let name = req.query.name;


  console.log(req)
  console.table([username , password , reciever , type , name]);

  var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  });

  transport.verify(function(error , success){
    if(error){
      res.status(401).send({error: `failed to connect with stmp. check credentials`})
    } else {
      res.status(200).send()
          }
  })

switch(res, type, transport  , name){
  case type == 'Organization' : 
       transport.sendMail(
        {
          from: sender,
          to: reciever,
          subject: ' Verify Email Address',
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
  )
  break; 

  case type == 'Member' : 
    transport.sendMail(
    {
      from: sender,
      to: reciever,
      subject: 'Accept Organization Invite',
      html: { path: 'dist/members-invite.template.html' },
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('message sent');
      }
      transport.close();
    }
  )

  break;
  default: 
  res.status(405).send({error: `Email recipient type hasnt been matched in ${type}`})
};
}
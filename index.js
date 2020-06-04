require("dotenv").config();
var api_key = process.env.MAILGUN_API;
var domain = process.env.MAILGUN_SANDBOX;
const nodemailer = require("nodemailer");

const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;

exports.Emailer = function(req, res) {
  let sender = process.env.SENDER;
  let reciever = req.query.email;
  let type = req.query.type;
  let token = req.query.token;
  let EventName = req.query.EventName;
  let InviteType = req.query.InviteType;

  console.table([username , password , reciever , type , name]);
  var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: username,
      pass: password
    }
  });

  transport.verify(function(error, success) {
    if (error) {
      res
        .status(401)
        .send({ error: `failed to connect with stmp. check credentials` });
    } else {
      res.status(200).send();
    }
  });

  if (reciever == null) {
    res.status(401).send({ error: `Empty email address` });
  } else {
    switch (type) {
      case "Forgot Password":
        transport.sendMail(
          {
            from: sender,
            to: reciever,
            subject: "Confirm Oasis Account Password Reset",
            html: { path: "dist/forgot-password.html" }
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("message sent");
            }
            transport.close();
          }
        );
        break;

      case "Create Event":
        transport.sendMail(
          {
            from: sender,
            to: reciever,
            subject: `Confirm ${EventName} Email Address`,
            html: { path: "dist/create-event.html" }
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("message sent");
            }
            transport.close();
          }
        );
        break;

      case "Invite":
        transport.sendMail(
          {
            from: sender,
            to: reciever,
            subject: `Confirm ${InviteType} Invitation`,
            html: { path: "dist/ivite.html" }
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("message sent");
            }
            transport.close();
          }
        );
        break;

      default:
        res.status(405).send({
          error: "An available email template type has not been matched."
        });
    }
  }
};

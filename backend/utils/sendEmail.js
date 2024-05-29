const sendGrid = require("@sendgrid/mail");

require("dotenv").config();

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ from, to, subject, text, html }) => {
  return sendGrid.send({ from, to, subject, text, html });
};

module.exports = sendEmail;

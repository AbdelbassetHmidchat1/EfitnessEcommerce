const sendGrid = require("@sendgrid/mail");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "../.env" });

// Initialize SendGrid with the API key
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

// Define the sendEmail function
const sendEmail = async ({ from, to, subject, text, html }) => {
  try {
    // Send email using SendGrid
    await sendGrid.send({ from, to, subject, text, html });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

module.exports = sendEmail;

const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASS,  
    },
  });
async function sendEmail(senderEmail, recipientEmail, subject, content) {
  try {
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: subject,
      text: content, // Or HTML content if applicable
    };

    console.log("mailOptions ==> ",mailOptions)

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  try {

    // CREATE TRANSPORTER
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    // SEND EMAIL
    const info =
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      });

    console.log(
      "Email sent successfully ✅"
    );

    console.log(info.response);

  } catch (error) {

    console.log(error);

    throw new Error(
      "Email sending failed"
    );
  }
};

module.exports = sendEmail;
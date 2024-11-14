const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (data, request, response) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `Hey 🙋‍♀️ Digitic`,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });

  console.log("Message sent, %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = { sendEmail };

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth:{
    //     user: process.env.EMAIL_USERNAME
    //     pass: process.env.EMAIL_PASS
    // }
    //activate in gmail "less secure app" option
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "961bf1e0a36c1d",
      pass: "d735f4ae4aa938",
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Aleksandra Pawelska <aaspyr@test.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

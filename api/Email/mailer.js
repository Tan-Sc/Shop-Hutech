const nodemailer = require("nodemailer");
//  const env = require("../.env")
// import 'dotenv/config';

const { MAIL_USER, MAIL_PASS, RESET_CALLBACK } = process.env;

module.exports.sendMail = async(email, mess) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    to: email,
    subject: 'Your password reset link',
    text: `${RESET_CALLBACK}?token=${mess}`,
    html: `<p>Someone requested a password reset for your account. If this was not you,
    please disregard this email. If you'd like to continue click the link below.</p>
    <p>This link will expire in 5 minutes.</p>
    <a href="${RESET_CALLBACK}?token=${mess}"><button>Reset your password</button></a>`,
  };
  transporter.sendMail(mailOptions);
};

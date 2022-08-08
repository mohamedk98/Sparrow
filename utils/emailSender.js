const sendgridEmail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");
const verifyEmailTemplate = fs.readFileSync(
  path.join(__dirname, "verifyEmailTemplate.html"),
  "utf-8"
);
const resetPasswordTemplate = fs.readFileSync(
  path.join(__dirname, "ResetPasswordTemplate.html"),
  "utf-8"
);
sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerifyEmail = async (name, email, verificationCode) => {
  sendgridEmail.send({
    from: "zombie.hat.iti@gmail.com",
    to: email,
    subject: "ZombieHat Verification Required",
    text: `Dear ${name}, Thank you for joining our family. To activate your account please lick the following link`,
    substitutionWrappers: [':', ''],
    substitutions: {
      email: email,
      verificationCode: verificationCode,
    },
    html: verifyEmailTemplate,
  });
};

const sendResetPassword = (name, email,resetToken) => {
  sendgridEmail.send({
    from: "zombie.hat.iti@gmail.com",
    to: email,
    subject: "ZombieHat Password Reset",
    substitutionWrappers: [':', ''],
    substitutions: {
      name:name,
      email: email,
      resetToken: resetToken,
    },
    html: resetPasswordTemplate,
  });
};

module.exports = { sendVerifyEmail, sendResetPassword };

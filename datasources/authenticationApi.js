const User = require("../models/User");
const crypto = require("crypto");

//Authentication data source
class AuthenticationApi {
  //if the email or username was already used,don't create account
  //else,create a new account
  async signup({
    username,
    firstName,
    lastName,
    email,
    hashedPassword,
    date,
    gender,
    verificationCode,
  }) {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: date,
        age: new Date().getFullYear() - date.slice(0, 4),
        gender: gender,
        verificationCode: verificationCode,
      });

      try {
        user.save();
        return { message: "Successfully registered", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    } else {
      const error = new Error("User Already Exists");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async login(email) {
    const exisitngUser = await User.findOne({ email });
    if (!exisitngUser) {
      const error = new Error("Incorrect email or Password");
      error.httpStatusCode = 400;
      return error;
    } else {
      return exisitngUser;
    }
  }

  async verifyEmail(email, verificationCode) {
    let exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      const error = new Error("Email address doesn't exists");
      return error;
    }

    if (exisitingUser.verified === true) {
      const error = new Error("Email Already Verified");
      return error;
    }

    if (exisitingUser.verificationCode === verificationCode) {
      exisitingUser.verificationCode = "";
      exisitingUser.verified = true;
      try {
        await exisitingUser.save();
        return { message: "Email Verified Successfully" };
      } catch {
        return { message: "Incorrect or bad token" };
      }
    }
  }

  async sendResetPasswordEmail(email) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Email or account doesn't exists");
      return error;
    }

    try {
      user.resetPasswordCode = resetToken;
      user.passwordResetMode = true;
      await user.save();
      return {
        message: `An email has sent to ${email} for steps to change password, please check your spam`,
      };
    } catch {
      const error = new Error("Something went wrong pelaase try again later");
      return error;
    }
  }

  async resetPassword (email,resetToken,newPassword){
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Email or account doesn't exists");
      return error;
    }

    if (user.resetPasswordCode !== resetToken) {
      const error = new Error("Could not change your password, please try again later ");
      return error;
    }

    if (user.passwordResetMode !== false || user.resetPasswordCode === "") {
      const error = new Error("Could not change your password, please try again later");
      return error;
    }

   
    try {
      user.password = newPassword
      user.resetPasswordCode = "";
      user.passwordResetMode = false;
      await user.save();
      return {
        message: "Password Changed Successfully, you can log in your account again",
      };
    } catch {
      const error = new Error("Something went wrong pelaase try again later");
      return error;
    }
  }

  async changePassword(userId,newPassword) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Email or account doesn't exists");
      return error;
    }

    try {
      user.password = newPassword
      await user.save();
      return {
        message: "Password Changed Successfully",
      };
    } catch {
      const error = new Error("Something went wrong pelaase try again later");
      return error;
    }
  }
}

module.exports = new AuthenticationApi();

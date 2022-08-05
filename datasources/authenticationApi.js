const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      const error = new Error("Email address doesn't exists")
      return error
    }

    if (exisitingUser.verified === true) {
      const error = new Error("Email Already Verified")
      return error
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
}

module.exports = new AuthenticationApi();

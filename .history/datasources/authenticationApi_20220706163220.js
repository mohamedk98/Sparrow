const User = require("../models/User");
const bcrypt = require("bcrypt");

//Authentication data source
class AuthenticationApi {
  //if the email or username was already used,don't create account
  //else,create a new account
  async signup({
    userId,
    username,
    firstName,
    lastName,
    email,
    hashedPassword,
    date,
    gender,
  }) {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const user = new User({
        userId: userId,
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: date,
        age: new Date().getFullYear() - date.slice(0, 4),
        gender: gender,
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
    const exisitngUser = User.findOne({ email });
    if (!exisitngUser) {
      const error = new Error("Incorrect email or Password");
      error.httpStatusCode = 400;
      return error;
    }
    else {
        return exisitngUser
    }
  }
}

module.exports = new AuthenticationApi();

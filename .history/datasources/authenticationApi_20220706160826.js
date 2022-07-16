const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthenticationApi {
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
    } else {
      return Error("User Already Exists");
    }
  }
}

module.exports = AuthenticationApi;

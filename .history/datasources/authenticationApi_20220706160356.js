const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthenticationApi {
  async signup({ firstName, lastName, email, password, date, gender }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User Already Exists");
    } else {
        
    }
  }
}

module.exports = AuthenticationApi;

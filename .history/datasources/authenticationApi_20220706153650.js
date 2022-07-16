const User = require("../models/User");
class AuthenticationApi {
  async signup({ firstName, lastName, email, password, date, gender }) {
    const user = await User.findOne({ email });
    if (user) {
      throw Error("User Already Exists");
    } else {
        
    }
  }
}

module.exports = AuthenticationApi;

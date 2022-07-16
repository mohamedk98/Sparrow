const User = require("../models/User");
class AuthenticationApi {
  async signup(email) {
    const user = await User.findOne({ email })
    if (!user){
        
    }
  }
}

module.exports = AuthenticationApi;

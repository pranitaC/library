var mongoose = require("../db/connection");
var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
}); 

var User = mongoose.model("user", UserSchema); 
module.exports = User; 

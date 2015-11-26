var mongoose = require("../db/connection");
var BookUserSchema = mongoose.Schema({
  user_id: String,
  book_id: String,
  issued_on: Date,
  returned_on: Date
}); 

var BookUser = mongoose.model("bookuser", BookUserSchema); 
module.exports = BookUser; 

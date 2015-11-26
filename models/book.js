var mongoose = require("../db/connection");
var BookSchema = mongoose.Schema({
  title: String,
  author: String,
  edition: String,
  status: String
}); 

var Book = mongoose.model("book", BookSchema); 
module.exports = Book; 

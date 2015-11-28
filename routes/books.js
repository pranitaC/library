var express = require('express');
var router = express.Router();
var Book = require("../models/book");

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.find({}, function(err,books){
    if(err){
      res.send(err.message);
    }else{
      res.json(books);
      //res.render("books/index",{
      //  books: books 
      //});
    }
  });
});

router.get('/new', function(req, res, next){
  res.render("books/new");
});

router.get("/:id", function(req, res, next){
  Book.findById(req.params["id"], function(err, book){
    //console.log(book);
    if(err){
      res.redirect("/books");
    }else{
      res.render("books/show",{
        book: book
      });    
    }
  });  
});

router.post('/', function(req, res, next){
  console.log(req.body);
  var book = new Book(req.body);
  book.save(function(err){
    if(err){
      res.render("books/new");
    }else{
      res.redirect("/books/"+book._id);
    }
  });
});

router.get('/:id/edit', function(req, res, next){
  Book.findById(req.params["id"], function(err, book){
    if(err) {
      res.redirect('/books');
    } else {
      res.render('books/edit', { 
        book: book 
      });
    }
  });
});

router.put("/:id", function(req, res, next){
  Book.findById(req.params["id"], function(err, book){
    if(err) {
      console.log(" Book details not found ");
      res.redirect("/books");
    } else {
      Book.update({ _id: req.params["id"]}, req.body, {multi: true}, function(err, raw){
        if(err){
          //res.render("books/edit",{ book: book });
          res.json(book);
        }else{
          //res.redirect("/books/"+book._id);
          console.log(book);
          res.json({});
        }
      });
    }
  })
});

router.delete('/:id', function(req, res, next){
  Book.findOne({ _id: req.params['id'] }, function(err, book){
    
    if(err) {
      res.redirect('/books');
    } else {
      book.remove(function(err, book){
        if (err) {
          res.redirect('/books');
        } else {
          res.redirect('/books');
        }
      });
    }
  });
});

module.exports = router;

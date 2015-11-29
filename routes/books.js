var express = require('express');
var router = express.Router();
var Book = require("../models/book");

/* GET books listing. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  Book.find({}, function(err,books){
    if(err){
      res.format({
        'text/html': function(){
          res.send(err.message);
        },
        'application/json': function(){
          res.json({ error: err });
        }
      });
      
    }else{
      res.format({
        'text/html': function(){
          res.render("books/index",{
            books: books 
          });
        },
        'json': function(){
          res.json(books);
        },
        'application/json': function(){
          res.json(books);
        }
      });
    }
  });
});

router.get('/new', function(req, res, next){
  var book = new Book();
  res.format({
    'text/html': function(){
      res.render("books/new",{
        book: book 
      });
    },
    'application/json': function(){
      res.json(book);
    }
  });
});

router.get("/:id", function(req, res, next){
  Book.findById(req.params["id"], function(err, book){
    //console.log(book);
    if(err){
      res.format({
        'text/html': function(){
          res.redirect("/books");
        },
        'application/json': function(){
          res.json(err);
        }
      });
    }else{
      res.format({
        'text/html': function(){
          res.render("books/show",{
            book: book
          });    
        },
        'application/json': function(){
          res.json(book);
        }
      });
    }
  });  
});

router.post('/', function(req, res, next){
  var book = new Book(req.body);
  book.save(function(err){
    if(err){
      res.format({
        'text/html': function(){
          res.render("books/new",{
            book: book,
            err: err
          });    
        },
        'application/json': function(){
          res.json(err);
        }
      });
    }else{
      res.format({
        'text/html': function(){
          res.redirect("/books/"+book._id);    
        },
        'application/json': function(){
          res.json(book);
        }
      });
    }
  });
});

router.get('/:id/edit', function(req, res, next){
  Book.findById(req.params["id"], function(err, book){
    if(err) {
      res.format({
        'text/html': function(){
          res.redirect("/books");    
        },
        'application/json': function(){
          res.json(err);
        }
      });
    } else {
      res.format({
        'text/html': function(){
          res.render('books/edit', { 
            book: book 
          });
        },
        'application/json': function(){
          res.json(book);
        }
      });
    }
  });
});

router.put("/:id", function(req, res, next){
  Book.update({ _id: req.params["id"]}, req.body, {multi: true}, function(err, raw){
    if(err){
      res.format({
        'text/html': function(){
          res.render("books/edit",{ book: book });          
        },
        'application/json': function(){
          res.json(book);
        }
      });
      
    }else{
      Book.findById(req.params["id"], function(err, book){
        res.format({
          'text/html': function(){
            res.redirect("/books/"+book._id);
          },
          'application/json': function(){
            res.json(book);
          }
        });
      });    
    }
  });
});

router.delete('/:id', function(req, res, next){
  Book.findOne({ _id: req.params['id'] }, function(err, book){
    if(err) {
      res.format({
        'text/html': function(){
          res.redirect('/books');
        },
        'application/json': function(){
          res.json(err);
        }
      });
    } else {
      book.remove(function(err, book){
        if (err) {
          res.format({
            'text/html': function(){
              res.redirect('/books');
            },
            'application/json': function(){
              res.json(err);
            }
          });
        } else {
          res.format({
            'text/html': function(){
              res.redirect('/books');
            },
            'application/json': function(){
              res.json(book);
            }
          });
        }
      });
    }
  });
});

module.exports = router;

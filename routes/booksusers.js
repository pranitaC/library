var express = require('express');
var router = express.Router();
var BookUser = require("../models/bookuser");
var dateFormat = require('dateformat');

router.get('/', function(req, res, next){
  BookUser.find({}, function(err, booksusers){
    if(err){
      res.send(err.message);
    }else{
      res.render("booksusers/index", { 
        booksusers: booksusers 
      });
    }
  });
});

router.get('/new', function(req, res, next){
  res.render("booksusers/new");
});

router.post('/', function(req,res,next){
  var bookuser = new BookUser(req.body.bookuser);
  bookuser.save(function(err){
    if(err){
      res.render("booksusers/new");
    }else{
      res.redirect("/booksusers/"+bookuser._id);
    }
   });
});

router.get("/:id", function(req, res, next) {
  BookUser.findById(req.params["id"], function(err, bookuser) {
  console.log(bookuser);
    if(err){
      res.redirect("/booksusers");
    }else{
      res.render("booksusers/show", {
        bookuser: bookuser,
        dateFormat: dateFormat
      });    
    }
  });  
});

router.get('/:id/edit', function(req, res, next) {
  BookUser.findById(req.params["id"], function(err, bookuser) {
    if(err) {
      res.redirect('/booksusers');
    } else {
      res.render('booksusers/edit', { 
        bookuser: bookuser 
      });
    }
  });
});


router.put("/:id", function(req, res, next) {
  BookUser.findById(req.params["id"], function(err, bookuser) {
    if(err) {
      res.redirect("/booksusers");
    } else {
      BookUser.update({ _id: req.params["id"]}, req.body.bookuser, {multi: true}, function(err, raw){
        if(err){
          res.render("booksusers/edit",{ bookuser: bookuser });
        }else{
          res.redirect("/booksusers/"+bookuser._id);
        }
      });
    }
  })
});

router.delete('/:id', function(req, res, next) {
  BookUser.findOne({ _id: req.params['id'] }, function(err, bookuser) {
        if(err) {
      res.redirect('/booksusers');
    } else {
      bookuser.remove(function(err, bookuser){
        if (err) {
          res.redirect('/booksusers');
        } else {
          res.redirect('/booksusers');
        }
      });
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err,users){
    if(err){
      res.send(err.message);
    }else{
      res.render("users/index",{
        users: users 
      });
    }
    
  });
  
});

router.get('/new', function(req, res, next) {
  res.render("users/new");
});

router.post('/', function(req, res, next) {
  console.log(req.body.user);
  var user = new User(req.body.user);
  user.save(function(err){
    if(err){
      res.render("users/new");
    }else{
      res.redirect("/users/"+user._id);
    }
  });
});

router.get("/search", function(req, res, next) {
  console.log(req.query);
  req.query.search = req.query.search || {};
  var search_params = {};
  if(req.query.search.name) {
    search_params.name = new RegExp(req.query.search.name,"i");
  }
  if(req.query.search.email) {
    search_params.email = new RegExp(req.query.search.email,"i");
  }
  console.log(search_params);
  User.find(search_params, function(err, users) {
    res.render("users/search", {
      users: users,
      search_params: req.query.search
    });    
  });  
});


router.get("/:id", function(req, res, next) {
  User.findById(req.params["id"], function(err, user) {
  console.log(user);
    if(err){
      res.redirect("/users");
    }else{
      res.render("users/show", {
        user: user
      });    
    }
  });  
});

router.get('/:id/edit', function(req, res, next) {
  User.findById(req.params["id"], function(err, user) {
    if(err) {
      res.redirect('/users');
    } else {
      res.render('users/edit', { 
        user: user 
      });
    }
  });
});


router.put("/:id", function(req, res, next) {
  User.findById(req.params["id"], function(err, user) {
    if(err) {
      console.log("********************* User not found **********************");
      res.redirect("/users");
    } else {
      User.update({ _id: req.params["id"]}, req.body.user, {multi: true}, function(err, raw){
        if(err){
          res.render("users/edit",{ user: user });
        }else{
          res.redirect("/users/"+user._id);
        }
      });
    }
  })
});

router.delete('/:id', function(req, res, next) {
  User.findOne({ _id: req.params['id'] }, function(err, user) {
    
    if(err) {
      res.redirect('/users');
    } else {
      user.remove(function(err, user){
        if (err) {
          res.redirect('/users');
        } else {
          res.redirect('/users');
        }
      });
    }
  });
});

module.exports = router;

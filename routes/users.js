var express = require('express');
var router = express.Router();
var User = require('../model/model');

//Register
router.get('/register', function (req, res) {
  res.render('register');
});

//Login
router.get('/login', function (req, res) {
  res.render('login');
});

//Register User
router.post('/register', function (req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  //Validation
  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('email', 'Email is Required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var error = req.validationErrors();

  if (error) {
    res.render('register', {
      errors: error,
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are successfully registered. You can now login to your account!');

    res.redirect('/users/login');
  }

});

//Module export
module.exports = router;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exhb = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

//Routes configuration
var routes = require('./routes/index');
var users = require('./routes/users');

//Init App
var app = express();

//View Engines
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exhb({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Static file/folder Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  }));

//PassportJS init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value,
          };
      },
  }));

//Connect Flash Middleware
app.use(flash());

//Connect flass Global var set
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

//Routes Middleware
app.use('/', routes);
app.use('/users', users);

//Port Init
app.set('port', (process.env.PORT || 3000));

//Server Init
app.listen(app.get('port'), function () {
    console.log('Server listening and running on ' + app.get('port'));
  });

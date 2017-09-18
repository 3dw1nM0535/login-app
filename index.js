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
var routes = require('./Routes/index');
var users = require('./Routes/users');

//Init App
var app = express();

//View Engines
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exhb({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');
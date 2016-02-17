var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var config = require('./config/config');
var User = require('./models/user');

mongoose.connect(config.dbName, function(err){
  if(err) return err;
  console.log('Connected');
});

var app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res, next){
   res.render('main/home');
});

app.get('/about', function(req, res, next){
   res.render('main/about');
});

app.post('/new', function(req,res,next){
    var user = new User();
    user.profile.name = req.body.name;
    user.pawword = req.body.password;
    user.email = req.body.email;

    user.save(function(err,user){
      if(err) return next(err) ;
      res.send(user);
    });
});

app.listen(3000, function(err){
   if(err) throw err;
   console.log('Hello all');
});

var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res, next){
   res.send('Hello');
});
app.listen(3000, function(err){
   if(err) throw err;
   console.log('Hello all');
});

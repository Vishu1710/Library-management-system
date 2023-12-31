var mongoose = require('mongoose');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

// Attach body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
var book_routes = require('./routes/book_routes');
var user_routes = require('./routes/user_routes');
var issue_routes = require('./routes/issue_routes');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017" , {
    dbName: "sk",
}).then(()=> console.log("database connected")).catch((e) => console.log(e));

app.use(serveStatic('public', {'index': ['index.html']}));

app.use('/book', book_routes);
app.use('/user', user_routes);
app.use('/issue', issue_routes);

app.listen(3002, function () {
    console.log('Running at port 3002...');
});
//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var expSession = require('express-session');
var cookieParser = require('cookie-parser');
var expressLayout = require('express-ejs-layouts');
var ejs = require('ejs');
var user = require('./controllers/user');
var admin = require('./controllers/admin');
var scout = require('./controllers/scout');

var app = express();

//CONFIGURATION
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/admin', admin);
app.use('/user', user);
app.use('/scout', scout);

app.use(express.static('public'));

//ROUTER
app.get('/', function(req, res){
	res.render('index');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 8000...');
});
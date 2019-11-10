//DECLARATION
const express = require('express');
const bodyParser = require('body-parser');
const expSession = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');
const user = require('./controllers/user');
const admin = require('./controllers/admin');
const scout = require('./controllers/scout');
const guser = require('./controllers/guser');

const app = express();

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
app.use('/guser', guser);

app.use(express.static('public'));

//ROUTER
app.get('/', function(req, res){
	res.render('index');
});

//SERVER STARTUP
app.listen(8000, function(){
	console.log('server started at 8000...');
});
var express = require('express');
var userModel = require('../models/user_model');

var router = express.Router();

// Login
router.get('/login', function(req, res){
	res.render("login");
});

router.post('/login', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(!status){
            res.send('invalid username/password');
		}else{
            //console.log(status);
			req.session.un = req.body.username;
			req.session.u_type = status.u_type;
			if(status.u_type == 1)
			{
				res.redirect('/admin/home');
			}else if(status.u_type == 2){
				res.redirect('/employee/home');
			}
				
		}
	});

});

// User List



// Logout
router.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;




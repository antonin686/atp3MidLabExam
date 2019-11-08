var express = require('express');
var userModel = require('../models/users_model');
var router = express.Router();

const {
	check,
	validationResult
} = require('express-validator');

// Login
router.get('/login', (req, res) => {
	res.render("user/login", {
		title: 'Login',
		errors: null
	});
});

router.post('/login', (req, res) => {

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function (status) {

		if (!status) {
			res.render("user/login", {
				title: 'Login',
				errors: 'Username/password is wrong'
			});
		} else {
			//console.log(status);
			req.session.un = req.body.username;
			req.session.u_type = status.u_type;
			req.session.u_id = status.u_id;
			if (status.u_type == 1) {
				res.redirect('/admin/home');
			} else if (status.u_type == 2) {
				res.redirect('/scout/home');
			}

		}
	});

});

// Profile

router.get('/profile', (req, res) => {

	if (req.session.un == null) {
		res.redirect('/user/login');
	}

	var user = req.session.u_id;

	userModel.getById(user, (result) => {
		if (!result) {
			res.send('insert failed');
		} else {
			res.render("user/profile", {
				user: req.session.un,
				userInfo: result
			});
		}
	});

});

// Edit

router.get('/edit/:id', function (req, res) {

	if (req.session.un == null) {
		res.redirect('/user/login');
	}

	var user = req.params.id;
	userModel.getById(user, function (result) {
		if (!result) {
			res.send('insert failed');
		} else {
			res.render("profile_edit", {
				user: req.session.un,
				userInfo: result
			});
		}
	});
});

router.post('/edit/:id', function (req, res) {

	if (req.session.un == null) {
		res.redirect('/user/login');
	}

	var user = {
		u_id: req.params.id,
		name: req.body.name,
		contact: req.body.contact,
		password: req.body.password
	};

	userModel.update(user, function (result) {
		if (!result) {
			res.send('update failed');
		} else {
			if (req.session.u_type == 1) {
				res.redirect('/admin/home');
			} else if (req.session.u_type == 2) {
				res.redirect('/scott/home');
			}

		}
	});
});


// Logout
router.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;

/**

const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.render("user/login", {
			title: 'Login',
			errors: errors.array()
		});
	} else {
	
	}

var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function (status) {
		if (!status) {
			res.send('invalid username/password');
		} else {
			//console.log(status);
			req.session.un = req.body.username;
			req.session.u_type = status.u_type;
			req.session.u_id = status.u_id;
			if (status.u_type == 1) {
				res.redirect('/admin/home');
			} else if (status.u_type == 2) {
				res.redirect('/scott/home');
			}

		}
	});


 */
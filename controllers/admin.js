var express = require('express');
var userModel = require('../models/user_model');
var postModel = require('../models/post_model');

var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.un != null && req.session.u_type == 1)
	{
		next();
	}		
	else
	{
		res.redirect('/');
	}		
});

router.get('/home', function(req, res){

	postModel.getAll(1, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("admin/home", { user : req.session.un, postList: result });
		}
	});
	
});

// post request
router.get('/request', function(req, res){

	postModel.getAll(0, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("admin/request", { user : req.session.un, postList: result });
		}
	});
	
});

// UserList

router.get('/userList', function(req, res){

	userModel.getAll(function(result){
		if(!result){
            res.render("admin/userList", { user : req.session.un, empList: false });
		}else{      	
			res.render("admin/userList", { user : req.session.un, empList: result });	
		}
	});

	
});


// User create

router.get('/user/create', function(req, res){
	res.render("admin/user_create", { user : req.session.un });
});

router.post('/user/create', function(req, res){

	var user = {
		u_name : req.body.name,
		contact : req.body.contact,
		username : req.body.username,
		password : req.body.password,
		u_type : req.body.u_type
	};

	userModel.insert(user, function(status){
		if(!status){
            res.send('insert failed');
		}else{
			res.redirect('/admin/userList');
		}
	});
});

// User delete

router.get('/user/delete/:id', function(req, res){
	
	var user = req.params.id;	
	userModel.delete(user, function(result){
		if(!result){
            res.send('Delete failed');
		}else{
			res.redirect("/admin/userList");
		}
	});

	
});


router.get('/employee/search', function(req, res){
		
	userModel.getById(user, function(result){
		if(!result){
            res.send('insert failed');
		}else{
			res.send(JSON.stringify(result))
		}
	});

	
});


module.exports = router;




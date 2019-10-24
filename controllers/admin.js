var express = require('express');
var userModel = require('../models/user_model');

var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.un != null && req.session.u_type)
	{
		next();
	}		
	else
	{
		res.redirect('/');
	}		
});

router.get('/home', function(req, res){
	res.render("admin/home", { user : req.session.un });
});

router.get('/user/create', function(req, res){
	res.render("admin/user_create", { user : req.session.un });
});

router.get('/employee/edit/:id', function(req, res){
	
	var user = req.params.id;	
	userModel.getById(user, function(result){
		if(!result){
            res.send('insert failed');
		}else{
			res.render("admin/emp_edit", { user : req.session.un, userInfo: result});
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


router.get('/employee/delete/:id', function(req, res){
	
	var user = req.params.id;	
	userModel.delete(user, function(result){
		if(!result){
            res.send('insert failed');
		}else{
			res.redirect("/admin/employee");
		}
	});

	
});


router.post('/employee/edit/:id', function(req, res){
	
	var user = {
		id : req.params.id,
		name : req.body.name,
		contact: req.body.contact
	}	
	userModel.update(user, function(result){
		if(!result){
            res.send('insert failed');
		}else{
			res.redirect("/admin/employee");
		}
	});

	
});



router.post('/employee/create', function(req, res){


	var user = {
		name : req.body.name,
		contact : req.body.contact,
		username : req.body.username,
		password : req.body.password
	};

	userModel.insert(user, function(status){
		if(!status){
            res.send('insert failed');
		}else{
			loginModel.insert(user, function(status){
				if(!status){
					res.send('insert failed');
				}else{
					res.redirect('/admin/employee');
				}
			});
		}
	});

	

	

});

router.get('/userList', function(req, res){

	userModel.getAll(function(result){
		if(!result){
            res.render("admin/empList", { user : req.session.un, empList: false });
		}else{      	
			res.render("admin/empList", { user : req.session.un, empList: result });	
		}
	});

	
});





module.exports = router;




var express = require('express');
var postModel = require('../models/post_model');

var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.un != null && req.session.u_type == 2)
	{
		next();
	}	
	else
	{
		res.redirect('/');
	}		
});

router.get('/home', function(req, res){
	res.render("scott/home", { user : req.session.un });
});



// UserList

router.get('/postList', function(req, res){

    var id = req.session.u_id;
	postModel.getAllbyID(id, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            console.log(result);
			res.render("scott/postList", { user : req.session.un, postList: result });	
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

	postModel.insert(user, function(status){
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
	postModel.delete(user, function(result){
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




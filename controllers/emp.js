/* var express = require('express');
var empModel = require('../models/emp_model');

var router = express.Router();


router.get('/addemp', function(request, response){
	response.render("user/adduser");
});

router.get('/empList', function(request, response){
		
    empModel.getAll(function(results){
			if(request.cookies['username'] != null){
				response.render('user/index', {users: results});		
			}else{
				response.redirect('/logout');
			}
		});	
});

router.get('/edit/:id', function(request, response){

	empModel.getById(request.params.id, function(result){
		response.render('user/edit', result);
	});
	
});

router.post('/edit/:id', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password,
		id: request.params.id
	};

	empModel.update(user, function(status){
		
		if(status){
			response.redirect('/user/userlist');
		}else{
			response.redirect('/user/edit/'+request.params.id);
		}
	});
	
});

router.get('/delete/:id', function(request, response){

	empModel.getById(sql, function(result){
		response.render("user/delete", {user: result[0]});
	})
});

router.post('/delete/:id', function(request, response){

	empModel.delete(sql, function(status){	
		if(status){
			response.redirect("/user/userList");
		}else{
			response.redirect("/user/delete/"+request.params.id);	
		}
	})
});

router.get('/details/:id', function(request, response){

	empModel.getById(request.params.id, function(result){
		response.render("user/details", result);
	})
});

module.exports = router;



*/
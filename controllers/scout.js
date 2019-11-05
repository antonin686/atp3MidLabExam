var express = require('express');
var postModel = require('../models/posts_model');

var router = express.Router();

// express-validator
const { check, validationResult } = require('express-validator');

router.get('*', (req, res, next) => {
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
    postModel.getAll('1', function(result){
		if(!result){
            //res.render("scout/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("scout/home", { title: 'home', user : req.session.un, postList: result });
		}
	});

});

// UserList

router.get('/postList', function(req, res){

    var id = req.session.u_id;
	postModel.getAllbyID(id, function(result){
		if(!result){
            //res.render("scout/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("scout/postList", { user : req.session.un, postList: result });	
		}
	});
		
});


// Post create

router.get('/post/create', function(req, res){
	res.render("scout/post_create", { user : req.session.un });
});

router.post('/post/create', function(req, res){

	var post = {
		p_name : req.body.place_name,
		country : req.body.country,
		p_info : req.body.place_info,
		short : req.body.short_history,
        t_medium : req.body.travel_medium,
        cost : req.body.cost,
        u_id : req.session.u_id
	};

	postModel.insert(post, function(status){
		if(!status){
            res.send('insert failed');
		}else{
			res.redirect('/scout/postList');
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




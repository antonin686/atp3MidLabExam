var express = require('express');
var userModel = require('../models/users_model');
var postModel = require('../models/posts_model');
var commentModel = require('../models/comment_model');

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

router.get('/home', (req,res) => {

	postModel.getAll(1, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("admin/home", { title: 'Admin', layout: 'layout_admin', user : req.session.un, postList: result });
		}
	});
	
});

// post request
router.get('/post/request', (req,res) => {

	postModel.getAll(0, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("admin/post_request", { title: 'Admin', layout: 'layout_admin', user : req.session.un, postList: result });
		}
	});
	
});

router.get('/post/accept/:id', (req,res) => {
	var id = req.params.id;
	postModel.acceptPostRequest(id, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.redirect('/admin/post/request');
		}
	});
	
});

router.get('/post/delete/:id', (req,res) => {
	var id = req.params.id;
	postModel.delete(id, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.redirect('/admin/home');
		}
	});
	
});

router.get('/post/info/:id', (req,res) => {
	var id = req.params.id;
	postModel.getById(id, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("admin/post_info", { title: 'Admin', layout: 'layout_admin', user : req.session.un, postInfo: result });
		}
	});
	
});

router.get('/post/postCommentAjax/:id/:comment', (req,res) => {
	var comment = {
		txt: req.params.comment,
		p_id: req.params.id,
		user: req.session.un
	};
	commentModel.insert(comment, (result) => {
		if(!result){
            res.send(false);
		}else{      	
            //console.log(result);
			res.send(true)
		}
	});	
});

router.get('/post/getCommentAjax/:id', (req,res) => {
	var id = req.params.id;
	commentModel.getAll(id, (result) => {
		if(!result){
            res.send(false);
		}else{      	
            //console.log(result);
			res.send(result);
		}
	});	
});

router.get('/post/commentDeleteAjax/:id', (req,res) => {
	var id = req.params.id;
	commentModel.delete(id, (result) => {
		if(!result){
            res.send(false);
		}else{      	
            //console.log(result);
			res.send(true);
		}
	});	
});

// UserList
router.get('/userList', (req,res) => {

	userModel.getAll(function(result){
		if(!result){
            res.render("admin/userList", { user : req.session.un, empList: false });
		}else{      	
			res.render("admin/userList", { title: 'Admin', layout: 'layout_admin', user : req.session.un, empList: result });	
		}
	});
});

// User create
router.get('/user/create', (req,res) => {
	res.render("admin/user_create", { title: 'Admin', layout: 'layout_admin', user : req.session.un });
});

router.post('/user/create', (req,res) => {

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
router.get('/user/delete/:id', (req,res) => {
	
	var user = req.params.id;	
	userModel.delete(user, function(result){
		if(!result){
            res.send('Delete failed');
		}else{
			res.redirect("/admin/userList");
		}
	});

	
});

module.exports = router;




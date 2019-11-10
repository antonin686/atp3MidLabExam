var express = require('express');
var postModel = require('../models/posts_model');
var commentModel = require('../models/comment_model');
var wishlistModel = require('../models/wishlist_model');
var router = express.Router();

// express-validator
const { check, validationResult } = require('express-validator');

router.get('*', (req, res, next) => {
	if(req.session.un != null && req.session.u_type == 3)
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
			res.render("guser/home", { title: 'home', layout: 'layout_guser', user : req.session.un, postList: result });
		}
	});

});

//post

router.get('/post/info/:id', (req,res) => {
	var id = req.params.id;
	postModel.getById(id, function(result){
		if(!result){
            //res.render("scott/postList", { user : req.session.un, postList: false });
            res.send("no data");
		}else{      	
            //console.log(result);
			res.render("guser/post_info", { title: 'guser', layout: 'layout_guser', user : req.session.un, postInfo: result });
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

router.get('/post/addToWishlist/:id', (req,res) => {
	var ids = {
		p_id : req.params.id,
		u_id : req.session.u_id
	};
	wishlistModel.insert(ids, function(result){
		if(!result){
            res.send("no data");
		}else{      	
            //console.log(result);
			res.redirect('/guser/home');
		}
	});
	
});

router.get('/wishList/delete/:id', function(req, res){
	
	var id = req.params.id;	
	wishlistModel.delete(id, function(result){
		if(!result){
            res.send('Delete failed');
		}else{
			res.redirect("/guser/wishlist");
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

router.get('/wishlist', (req,res) => {

	var id = req.session.u_id;
	wishlistModel.getAll(id,function(result){
		if(!result){
            res.render("guser/wishlist", { title: 'guser', user : req.session.un, layout: 'layout_guser', wishList: false });
		}else{      	
			res.render("guser/wishlist", { title: 'guser', layout: 'layout_guser', user : req.session.un, wishList: result });	
		}
	});
});

module.exports = router;




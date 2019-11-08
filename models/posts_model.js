var db = require('./db')

module.exports = {
	getById: function(id, callback){

			var sql = "select * from users where u_id="+id;
			console.log(sql);
			db.getResults(sql, function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},

	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(false);
			}
		});	
	},

	getAll: function(status,callback){
		var sql = `select * from posts where status = ${status}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

    getAllbyID: function(id, callback){
		var sql = `select * from posts where u_id = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
    },
    
	insert: function(post, callback){
		var sql = `insert into posts values('', '${post.p_name}', '${post.country}', '${post.p_info}', '${post.short}', '${post.t_medium}', '${post.cost}','0', '${post.u_id}') `;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	acceptPostRequest: function(id, callback){
		var sql = `update posts set status = '1' where p_id = ${id}`;	
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	update: function(id, callback){
		var sql = `update users set u_name ='${id.name}', password='${id.password}', contact= '${id.contact}' where u_id = ${id.u_id}`;
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},

	delete: function(id, callback){
		var sql = "delete from users where u_id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}




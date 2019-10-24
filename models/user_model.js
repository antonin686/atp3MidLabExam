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
	getAll: function(callback){
		var sql = "select * from users";
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

	insert: function(user, callback){
		var sql = `insert into users values('', '${user.u_name}', '${user.username}', '${user.password}', '${user.contact}', '${user.u_type}') `;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = `update users set u_name ='${user.name}', password='${user.password}', contact= '${user.contact}' where u_id = ${user.u_id}`;
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from login where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}




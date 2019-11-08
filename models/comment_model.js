var db = require('./db')

module.exports = {
	getById: function(id, callback){

			var sql = "select * from comments where c_id="+id;
			console.log(sql);
			db.getResults(sql, function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},

	getAll: function(id,callback){
		var sql = `select c_id,p_id,username,comment,DATE_FORMAT(date, "%l:%i %p - %D %M") as date from comments where p_id = ${id}`;
		console.log(sql)
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

    getAllbyID: function(id, callback){
		var sql = `select * from comments where u_id = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
    },
    
	insert: function(comment, callback){
		var sql = `insert into comments values('', '${comment.p_id}', '${comment.user}', '${comment.txt}', CURRENT_TIMESTAMP)`;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	acceptPostRequest: function(id, callback){
		var sql = `update comments set status = '1' where p_id = ${id}`;	
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
		var sql = "delete from comments where c_id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}




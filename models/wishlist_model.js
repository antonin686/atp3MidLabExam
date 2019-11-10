var db = require('./db')

module.exports = {
	getById: function(id, callback){

			var sql = "select * from wishlist where w_id="+id;
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
		var sql = `SELECT posts.place_name,posts.cost,posts.country,wishlist.w_id FROM posts,wishlist WHERE posts.p_id = wishlist.p_id and wishlist.u_id = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

    getAllbyID: function(id, callback){
		var sql = `select * from wishlist where u_id = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
    },
    
	insert: function(ids, callback){
        var sql = `insert into wishlist values('', '${ids.p_id}', '${ids.u_id}') `;
        console.log(sql)
		db.execute(sql, function(status){
			callback(status);
		});
	},
	acceptidsRequest: function(id, callback){
		var sql = `update wishlist set status = '1' where w_id = ${id}`;	
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
		var sql = "delete from wishlist where w_id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}




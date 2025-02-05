var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/bb", function(err, database) {
  if(err) throw err;

  db = database;
});

module.exports = {
	insert: function(_collection, _data, _callback){
		var i = db.collection(_collection).insert(_data).then(function(result){
			_callback({status:true});
		});
	},
	select: function(_collection, _condition, _callback){
		var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
			_callback({status: true, data: dataset});
		})
	},
	Zupdate: function(_collection, _condition, _callback){
		var i = db.collection(_collection).update(_condition.origin,_condition.update).then(function(result){
			_callback(result);
		});
	},
	delete: function(_collection, _condition, _callback){
		var i = db.collection(_collection).remove(_condition).then(function(result){
			_callback(result);
		});
	},
	update: function(_collection,_condition,_callback){
		var i = db.collection(_collection).update(_condition.origin,{$set:_condition.refresh}).then(function(result){
			_callback({status:true,data:_condition})
		})
	}
}
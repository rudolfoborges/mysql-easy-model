'user strict';

//change to var User = require('mysql-easy-model').model('user');
var User = require('../../index').model('user');

exports.findAll = function(req, res, next){
	User.find(function(err, users){
		if(!err) res.status(200).json(users);
		else next(err);
	});
};

exports.findOne = function(req, res, next){
	var id = req.params.id;
	User.find({id: id}, function(err, user){
		if(!err) res.status(200).json(user);
		else next(err);
	});
};

exports.create = function(req, res, next){
	var body = req.body;
	var user = new User(body);
	user.create(function(err, result){
		if(!err) res.status(200).json(user);
		else next(err);
	});
};

exports.update = function(req, res, next){
	var body = req.body;

	var user = new User();
	user.id = req.params.id;

	user.read(function(err){
		user.name = body.name;
		user.email = body.email;
			
		user.update(function(err){
			if(!err) res.status(200).json(user);
			else next(err);
		});
		
	});
};

exports.destroy = function(req, res, next){
	var id = req.params.id;

	User.findOne({id: id}, function(err, user){
		if(user) user.destroy(function(err, result){
			if(!err) res.status(200).json(result);
			else next(err);
		});
	});
}

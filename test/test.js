'use strict';

var mysqlEasyModel = require('../index');

mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});

var User = mysqlEasyModel.model({
	name: 'user',
	table: 'user',
	primary: ['id']
});

//Find All
User.find(function(err, users){
	console.log('FIND 1:', users);
	var user = users[0];

	user.name = 'Rudolfo Borges Oliveira';

	user.update(function(err, result){
		console.log('UPDATE:', result);
	});
});

//Find by id
User.find({id: 1}, function(err, users){
	console.log('FIND 2:', users);
});

//Find by query
User.query('select * from user where email = ?', ['contato@rudolfoborges.com.br'], function(err, users){
	console.log('QUERY 1:', users);
});

//Find all by query
User.query('select * from user', [], function(err, users){
	console.log('QUERY 2:', users);
});

//Insert a new user
var user = new User({name: 'John Smith', email: 'js@gmail.com'});
user.create(function(err, result){
	console.log('CREATE:', result);
});

//Find one by email and update
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user){
		user.name = 'John Smith';

		user.update(function(err, result){
			console.log(result);
		})
	}
});

//Find one by email and destroy
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user) user.destroy(function(err, result){
		console.log('DESTROY:', result);
	});
});

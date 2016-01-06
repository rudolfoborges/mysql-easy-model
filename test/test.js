'use strict';

var mysqlEasyModel = require('../index');

mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});

var User = mysqlEasyModel.model('user', {
	table: 'user',
	fields: ['id', 'name', 'email'],
	primary: ['id']
});


//Find
User.find(function(err, users){
	console.log('FIND 1:', users);
	var user = users[0];

	user.name = 'Rudolfo Borges Oliveira';

	user.update(function(err, result){
		console.log('UPDATE:', result);
	});
});

//Find with filter
User.find({id: 1}, function(err, users){
	console.log('FIND 2:', users);
});

//Find with query
User.query('select * from user where email = ?', ['contato@rudolfoborges.com.br'], function(err, users){
	console.log('QUERY 1:', users);
});

//Find all with query
User.query('select * from user', [], function(err, users){
	console.log('QUERY 2:', users);
});

//Insert a new user
var user = new User({name: 'John Smith', email: 'js@gmail.com'});
user.create(function(err, result){
	console.log('CREATE:', result);
});

//Find one and update
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user){
		user.name = 'John Smith';

		user.update(function(err, result){
			console.log('UPDATE', result);
		})
	}
});

//Find one and destroy
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user) user.destroy(function(err, result){
		console.log('DESTROY:', result);
	});
});


//Read model
var user = new User();
user.id = 1;
user.read(function(err){
	if(!err) console.log(user.name);
});

var user = new User({id: 4, name: 'John Smith'});
user.update(function(err, result){
	console.log('ERR', err);
	console.log('RESULT', result);
	console.log('USER', user);
});

var user = new User();
user.id = 4;
user.name = 'John Smith';
user.update(function(err, result){
	console.log('ERR', err);
	console.log('RESULT', result);
	console.log('USER', user);
});


var user = new User({id: 5});
user.destroy(function(err, result){
	console.log(user, result, err);
});

var user = new User();
user.id = 9;
user.destroy(function(err, result){
	console.log(user, result, err);
});




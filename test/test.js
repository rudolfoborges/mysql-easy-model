'use strict';

var mysqlEasyModel = require('../index');

mysqlEasyModel.init({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});

var User = mysqlEasyModel.model('user');

User.find(function(err, users){
	console.log('FIND 1:', users);
	var user = users[0];
	user.update();
});

User.find({id: 1}, function(err, users){
	console.log('FIND 2:', users);
});

User.query('select * from user where email = ?', ['contato@rudolfoborges.com.br'], function(err, users){
	console.log('QUERY 1:', users);
});

User.query('select * from user', [], function(err, users){
	console.log('QUERY 2:', users);
});

var user = new User({name: 'Ana Beatriz Oliveira', email: 'ab@gmail.com'});
user.create(function(err, result){
	console.log('CREATE:', result);
});


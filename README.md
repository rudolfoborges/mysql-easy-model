# mysql-easy-model
MySQL Easy Model

## Install
Install from npm package:
> npm install mysql-easy-model

Or install from git:
> npm install git://github.com/rudolfoborges/mysql-easy-model.git

## Usage

`var mysqlEasyModel = require('mysql-easy-model');`

`mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});`

var User = mysqlEasyModel.model({
	name: 'user',
	table: 'user',
	primary: ['id']
});






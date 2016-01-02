# mysql-easy-model
MySQL Easy Model

## Install
Install from npm package:
> npm install mysql-easy-model

Or install from git:
> npm install git://github.com/rudolfoborges/mysql-easy-model.git

## Usage

### Connecting to MongoDB

First, we need to define a connection.
```js
var mysqlEasyModel = require('mysql-easy-model');

mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});
```

### Defining a Model

Models are defined through the options object.
```js
var User = mysqlEasyModel.model({
	name: 'user',
	table: 'user',
	primary: ['id']
});
```

### Accessing a Model
#### Find all
```js
User.find(function(err, users){
	console.log(users);
}
```

#### Find by id
```js
User.find({id: 1}, function(err, users){
	console.log(users);
}
```

#### Find by dynamic query
```js
User.query('select * from user where email = ?', ['js@gmail.com'], function(err, users){
	console.log(users);
});
```




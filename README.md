# mysql-easy-model
MySQL Easy Model is a MySQL object modeling tool designed to work in an asynchronous environment.

## Installation
Install from npm package:
> npm install mysql-easy-model

Or install from git:
> npm install git://github.com/rudolfoborges/mysql-easy-model.git

## Usage

### Connecting to MySQL

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

Models are defined through the name and options object. `var User = mysqlEasyModel.model(name, options)`
```js
var User = mysqlEasyModel.model('user', {
  table: 'user',
  fields: ['id', 'name', 'email'],
  primary: ['id']
});
```

### Accessing a Model

**After define a model, we can access it through the same function. The argument is the name of the your model.**
```js
var User = mysqlEasyModel.model('user');
```

#### Find

Model.find(selector, callback) Selector and callback are optional.

```js
User.find(function(err, users){
	if(!err) console.log(users);
}
```

#### Find with filter

Model.find(selector, callback) Selector and callback are optional.

```js
User.find({id: 1}, function(err, users){
	if(!err) console.log(users);
}
```

### Read a model

model.load(callback) Callback is optional.

```js
var user = new User();
user.id = 1;
user.read(function(err){
  console.log(err);
  if(!err) console.log(user.name);
});
```

#### Find with dynamic query

Model.query(sql, params, callback)

```js
User.query('select * from user where email = ?', ['js@gmail.com'], function(err, users){
	if(!err) console.log(users);
});
```

#### Create a new Model

```js
var user = new User({name: 'John Smith', email: 'js@gmail.com'});
user.create(function(err, result){
	if(!err) console.log('created');
});
```

#### Find one and update

```js
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user){
		//Update the name
		user.name = 'John Smith';

		user.update(function(err, result){
			if(!err) console.log('updated');
		})
	}
});
```

#### Update without find

You can set the primary key value and update without finding.

```js
var user = new User({id: 1, name: 'John Smith'});
user.update(function(err, result){
	if(!err) console.log('updated');
});
```

or

```js
var user = new User();
user.id = 1;
user.name = 'John Smith';
user.update(function(err, result){
	if(!err) console.log('updated');
});
```


#### Find one and destroy

```js
User.findOne({email: 'js@gmail.com'}, function(err, user){
	if(user) user.destroy(function(err, result){
		if(!err) console.log('removed');
	});
});
```

#### Destroy without find

You can set the primary key value and delete without finding

```js
var user = new User({id: 1});
user.destroy(function(err, result){
	if(!err) console.log('removed');
});
```

or

```js
var user = new User();
user.id = 1;
user.destroy(function(err, result){
	if(!err) console.log('removed');
});
```

### Examples
Contains runnable sample mysql-easy-model programs.

* [Using express](https://github.com/rudolfoborges/mysql-easy-model/tree/master/examples/express)

### Bugs

If you'd like to leave feedback, please [open an issue on GitHub.](https://github.com/rudolfoborges/mysql-easy-model/issues)

### License

mysql-easy-model is released under [MIT license.](http://opensource.org/licenses/mit-license.php)

### Credits                             
mysql-easy-model was created by [Rudolfo Borges.](http://rudolfoborges.com.br)




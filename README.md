# mysql-easy-model
MySQL Easy Model

## Install
Install from npm package:
> npm install mysql-easy-model

Or install from git:
> npm install git://github.com/rudolfoborges/mysql-easy-model.git

## Usage

```js
var mysqlEasyModel = require('mysql-easy-model');
```

```js
mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});
```

```js
var User = mysqlEasyModel.model({
	name: 'user',
	table: 'user',
	primary: ['id']
});
```





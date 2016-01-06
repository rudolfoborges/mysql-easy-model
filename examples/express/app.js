'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

//change to var mysqlEasyModel = require('mysql-easy-model');
var mysqlEasyModel = require('../../index');

mysqlEasyModel.createConnection({
	connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password		: '',
    database        : 'test'
});

// Bootstrap models
fs.readdirSync(path.join(__dirname, '/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', routes.findAll);
app.get('/:id', routes.findOne);
app.post('/', routes.create);
app.put('/:id', routes.update);
app.delete('/:id', routes.destroy);

app.listen(3000, function() {
  console.log('listening on http://localhost:3000');
});

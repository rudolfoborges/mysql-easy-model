'use strict';

var model = require('../../../index').model;

var User = model('user', {
	table: 'user',
	fields: ['id', 'name', 'email'],
	primary: ['id']
});
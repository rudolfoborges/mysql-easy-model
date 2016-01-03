/**
 * Created by rudolfoborges on 12/28/15.
 */
'use strict';

var pool = undefined;
var mysql = require('mysql');
var _ = require('lodash');
var model = require('./lib/model');

var models = {};

exports.createConnection = function(options){
    pool = mysql.createPool(options);
};

exports.pool = function(){
    return pool;
};

exports.model = function(name, options){
    var table, primary, fields;

    if(options && typeof options == 'object'){
        table = options.table;
        primary = options.primary;
        fields = options.fields;
    }

    if(name in models) {
        return models[name];
    }

    function Model(attrs) {
        this._attrs = attrs;
    }

    var baseModel = model(pool, table, fields, primary || []);

    Model.find = baseModel.find;
    Model.findOne = baseModel.findOne;
    Model.query = baseModel.query;

    Model.prototype.create = baseModel.create;
    Model.prototype.update = baseModel.update;
    Model.prototype.destroy = baseModel.destroy;
    Model.prototype.read = baseModel.read;

    models[name] = Model;

    return Model;
};

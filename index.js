/**
 * Created by rudolfoborges on 12/28/15.
 */
'use strict';

var pool = undefined;
var mysql = require('mysql');
var _ = require('lodash');
var model = require('./lib/model');

var models = {};

exports.init = function(options){
    pool = mysql.createPool(options);
};

exports.pool = function(){
    return pool;
};

exports.model = function(table){

    if(table in models) {
        return models[table];
    }

    function Model(attrs) {
        this._attrs = attrs;
    }

    var baseModel = model(pool, table);

    Model.find = baseModel.find;
    Model.query = baseModel.query;

    Model.prototype.create = baseModel.create;
    Model.prototype.update = baseModel.update;
    Model.prototype.destroy = baseModel.destroy;

    models[table] = Model;

    return Model;
};

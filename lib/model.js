/**
 * Created by rudolfoborges on 12/25/15.
 */
'use strict'

var _ = require('lodash');

module.exports = function(db, table){

    function find(attrs, next){
        db.getConnection(function(err, connection){
            if('function' == typeof attrs){
                next = attrs;
                attrs = undefined;
            }

            var sql = 'select * from ' + table;

            if(attrs){
                sql += ' where ?'
            }

            connection.query(sql, attrs || [], function(err, rows, fields){
                connection.release();

                var models = [];

                rows.forEach(function(row){
                    models.push(defineModelMethods(row));
                });

                setTimeout(function(){
                    next(err, models, fields);
                }, 0);
            });
        });
    }

    function findOne(where, next){
      db.getConnection(function(err, connection){

      });
    }

    function query(sql, attrs, next){
        db.getConnection(function(err, connection){
            connection.query(sql, attrs, function(err, result){
                connection.release();

                if(Array.isArray(result) && result.length > 0){
                    var models = [];
                    var rows = result;

                    rows.forEach(function(row){
                        models.push(defineModelMethods(row));
                    });

                    setTimeout(function(){
                        next(err, models);
                    }, 0);    
                } else next(err, result);

            });
        });
    }

    function create(next){
        var attrs = this._attrs;
        var sql = 'insert into ' + table + ' set ?';
        db.getConnection(function(err, connection){
            connection.query(sql, attrs, function(err, result){
                connection.release();
                next(err, result);
            });
        });
    }

    function update(next){
        var attrs = this;
        var sql = 'update ' + table + ' set ? where id = ?';

        db.getConnection(function(err, connection){
            connection.query(sql, [attrs, id], function(err, result){
              connection.release();
            });
        });
    }

    function destroy(id, next){
        db.getConnection(function(err, connection){
          connection.query('delete from ' + table + ' where id = ?', [id], callback);
        });
    }

    function set(attr, value){
      this._attrs[attr] = value;
    }

    function get(attr){
      return this._attrs[attr];
    }

    function defineModelMethods(row){
        row.__proto__.update = model.update;
        row.__proto__.destroy = model.destroy;
        row.__proto__.create = function(attrs, next){
            this._attrs = attrs;
            model.create(next);
        };
        row.__proto__.find = model.find;
        row.__proto__.query = model.query;
        row.__proto__.set = model.set;
        row.__proto__.get = model.get;
        return row;
    }

    var model = {
        find: find,
        query: query,
        create: create,
        update: update,
        destroy: destroy,
        set: set,
        get: get
    };

    return model;

};

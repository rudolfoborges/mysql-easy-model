/**
 * Created by rudolfoborges on 12/25/15.
 */
'use strict'

var _ = require('lodash');

module.exports = function(db, table, fields, primary){

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
                    models.push(modelfyRow(row));
                });

                setTimeout(function(){
                    if(next) next(err, models, fields);
                }, 0);
            });
        });
    }

    function findOne(where, next){
      db.getConnection(function(err, connection){
        connection.query('select * from ' + table + ' where ?', [where], function(err, rows){
            connection.release();
            if(next && rows && rows.length > 0) next(err, modelfyRow(rows[0]));
        });
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
                        models.push(modelfyRow(row));
                    });

                    setTimeout(function(){
                        next(err, models);
                    }, 0);    
                } else if(next) next(err, result);

            });
        });
    }

    function read(next){
        var model = this;
        var where = {};
        db.getConnection(function(err, connection){
            primary.forEach(function(item){
                where[item] = model[item];
            });

            setTimeout(function(){
                connection.query('select * from ' + table + ' where ?', [where], function(err, rows){
                    if(rows && rows.length > 0 && next) {
                        model.__proto__ = modelfyRow(rows[0]);
                        next(err);
                    }
                });    
            }, 0);
            
        });
    }

    function create(next){
        var attrs = this._attrs;
        var sql = 'insert into ' + table + ' set ?';
        db.getConnection(function(err, connection){
            connection.query(sql, attrs, function(err, result){
                connection.release();
                if(next) next(err, result);
            });
        });
    }

    function update(next){
        var attrs = this;
        var sql = 'update ' + table + ' set ? where ?';
        var where = {};

        primary.forEach(function(item){
            where[item] = attrs[item];
        });

        setTimeout(function(){
            db.getConnection(function(err, connection){
                connection.query(sql, [attrs, where], function(err, result){
                  connection.release();
                  if(next) next(err, result);
                });
            }); 
        }, 0);
    }

    function destroy(next){
        var attrs = this;
        var where = {};

        primary.forEach(function(item){
            where[item] = attrs[item];
        });

        setTimeout(function(){
            db.getConnection(function(err, connection){
              connection.query('delete from ' + table + ' where ?', [where], function(err, result){
                connection.release();
                if(next) next(err, result);
              });
            });
        }, 0);
        
    }

    function set(attr, value){
      this._attrs[attr] = value;
    }

    function get(attr){
      return this._attrs[attr];
    }

    function modelfyRow(row){
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
        row.__proto__.read = model.read;
        return row;
    }

    var model = {
        find: find,
        findOne: findOne,
        query: query,
        read: read,
        create: create,
        update: update,
        destroy: destroy,
        set: set,
        get: get
    };

    return model;

};

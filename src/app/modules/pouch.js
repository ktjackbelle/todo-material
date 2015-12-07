'use strict';

var angular = require('angular');
var PouchDB = require('pouchdb');

var pouchdb = angular.module('pouchdb', []);

pouchdb.factory('pouchdb', [
  '$q',
  function($q) {

    function Pouch(dbName, options) {
      if (!(this instanceof Pouch)) { return new Pouch(dbName, options); }
      this._db = new PouchDB(dbName, options);
    }

    Pouch.prototype = {
      destroy: wrap('destroy'),
      post: wrap('post'),
      put: wrap('put'),
      get: wrap('get'),
      remove: wrap('remove'),
      bulkDocs: wrap('bulkDocs'),
      allDocs: wrap('allDocs'),
    };

    function wrap(methodName) {
      return function() {
        var db = this._db;
        var args = Array.prototype.slice.call(arguments);

        return $q.resolve().then(function() {
          return db[methodName].apply(db, args);
        });
      };
    }

    return Pouch;

  },
]);

module.exports = pouchdb.name;

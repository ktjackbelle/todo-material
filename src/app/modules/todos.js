'use strict';

var angular = require('angular');
var pouchdb = require('./pouch');

var todos = angular.module('todos', [
  pouchdb,
]);

todos.factory('todos', [
  'pouchdb',
  function(PouchDb) {
    var db = new PouchDb('todos');

    var todoItems = [];

    return {
      create: function(data) {
        data.checked = false;
        data.created = Date.now();
        return db.post(data);
      },
      read: function() {
        return db.allDocs({ 'include_docs': true })
          .then(function(results) {
            return results.rows.map(function(row) {
              return row.doc;
            });
          })
          .then(function(docs) {
            todoItems = docs;
            return docs;
          });
      },
      readOne: function(id) {
        return db.get(id);
      },
      update: function(data) {
        return db.put(data);
      },
      delete: function(doc) {
        return db.remove(doc);
      },
      getTodos: function() {
        return todoItems;
      },
    };
  },
]);

module.exports = todos.name;

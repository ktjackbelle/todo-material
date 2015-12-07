'use strict';

var angular = require('angular');
var todosService = require('../../modules/todos');
var template = require('./template.html');
var inputDisplay = require('../../directives/input-display');

var todosController = angular.module('TodosController', [
  todosService,
  inputDisplay,
]);

todosController.controller('TodosController', [
  '$scope',
  '$state',
  '$stateParams',
  'todos',
  function($scope, $state, $stateParams, todos) {
    $scope.todos = [];

    switch ($stateParams.status) {
      case '': $scope.statusFilter = {}; break;
      case 'completed': $scope.statusFilter = { checked: true }; break;
      case 'active': $scope.statusFilter = { checked: false }; break;
      default: break;
    }

    function update() {
      todos.read().then(function(todoItems) {
        $scope.todos = todoItems;
      });
    }
    update();

    $scope.addTodo = function(todo) {
      if (!todo || !todo.name) { return; }
      todos.create(todo)
        .then(function() {
          $scope.inputs.newTodo = {};
        })
        .then(update);
    };

    $scope.changeTodoHandler = function(todo) {
      todos.update(todo).then(update);
    };

    $scope.deleteClickHandler = function(todo) {
      todos.delete(todo).then(update);
    };

    $scope.todosRemaining = function() {
      return $scope.todos.filter(function(todo) {
        return !todo.checked;
      }).length;
    };
  },
]);

exports.controllerName = 'TodosController';
exports.moduleName = 'TodosController';
exports.template = template;

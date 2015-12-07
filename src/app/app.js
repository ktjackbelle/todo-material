'use strict';

var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');

require('angular-material/angular-material.min.css');

var TodosController = require('./controllers/todos');

// Declare dependencies
var app = angular.module('TodoApp', [
  ngMaterial,
  uiRouter,
  TodosController.moduleName,
]);

// Configuration
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/:status',
        template: TodosController.template,
        controller: TodosController.controllerName,
      });
  },
]);

module.exports = app.name;

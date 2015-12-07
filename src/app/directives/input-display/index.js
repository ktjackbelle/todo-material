'use strict';

var angular = require('angular');
var template = require('./template.html');

require('./styles.css');

var inputDisplay = angular.module('inputDisplay', []);

inputDisplay.directive('inputDisplay', function() {
  return {
    replace: true,
    restrict: 'AE',
    require: 'ngModel',
    template: template,
    scope: {
      change: '&ngChange',
      strikethrough: '=strikethrough',
    },
    link: function(scope, elem, attrs, ngModel) {
      var input = elem.find('input');

      scope.dblClickHandler = function() {
        scope.showInput = true;
        scope.oldValue = scope.value;
        setTimeout(input.focus.bind(input), 0);
      };

      scope.blurHandler = function() {
        scope.showInput = false;
        ngModel.$setViewValue(scope.value);
        if (scope.value !== scope.oldValue) { scope.change(); }
      };

      ngModel.$render = function() {
        scope.value = ngModel.$modelValue;
      };
    },
  };
});

module.exports = inputDisplay.name;
